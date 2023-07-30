<template>
    <el-container>
        <el-aside style="width: 200px">
            <Aside></Aside>
        </el-aside>
        <el-container>
            <el-header>
                <Header :admin_name="admin_name"></Header>
            </el-header>
            <el-main>
                <el-text size="large">路线管理<br></el-text>
                <el-input
                        v-model="search_area"
                        class="w-50 m-2"
                        placeholder="搜索路线"
                        :prefix-icon="Search"
                        style="width: 20%; margin: 20px"
                />
                <el-button type="primary" style="margin: 20px 0" @click="search">搜索</el-button>
                <el-table :data="tableData" style="width: 100%; border-radius: 5px; text-align: center"
                          :cell-style="{ textAlign: 'center' }"
                          :header-cell-style="{ 'text-align': 'center' }">
                    <el-table-column fixed prop="area_id" label="区域编号"/>
                    <el-table-column prop="area_name" label="区域名称"/>
                    <el-table-column prop="area_province" label="区域所属省"/>
                    <el-table-column prop="area_content" label="区域介绍"/>
                    <el-table-column fixed="right" label="操作">
                        <template #default="scope">
                            <el-button type="primary" size="default"
                                       @click="dialogVisible = true;showEditInfo(scope.row)">编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" style="margin-top: 20px"
                               :total=this.total
                               :current-page=this.pageNum
                               :page-size=this.size
                               @current-change="handleCurrentChange"
                />
                <el-dialog
                        v-model:model-value="dialogVisible"
                        title="修改路线"
                        width="30%"
                >
                    <el-form
                            ref="ruleFormRef"
                            :model="form"
                            label-width="120px"
                            class="demo-ruleForm"
                            status-icon
                    >
                        <el-form-item label="区域编号" prop="name">
                            <el-input v-model="form.area_id" disabled/>
                        </el-form-item>
                        <el-form-item label="区域名称" prop="name">
                            <el-input v-model="form.area_name" disabled/>
                        </el-form-item>
                        <el-form-item label="区域所属省" prop="name">
                            <el-input v-model="form.area_province" disabled/>
                        </el-form-item>
                        <el-form-item label="区域介绍" prop="name">
                            <el-input type="textarea" v-model="form.area_content"/>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false;updateArea()">
                      确定
                    </el-button>
                  </span>
                    </template>
                </el-dialog>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import {defineComponent, reactive, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import axios from "axios";

export default defineComponent({
    name: "ManageArea",
    computed: {
        Search() {
            return Search
        }
    },
    setup() {
        const search_area = ref('')
        const admin_name = localStorage.getItem('admin_name')
        const pageNum = ref(1)
        const total = ref(10)
        const size = ref(3)
        const dialogVisible = ref(false)
        const tableData = ref([])
        const form = reactive({
            area_id: '',
            area_name: '',
            area_province: '',
            area_content: '',
            area_img: '',
        })
        return {
            admin_name,
            pageNum,
            total,
            size,
            form,
            dialogVisible,
            tableData,
            search_area
        }
    },
    methods: {
        search: function () {
            const that = this
            if (this.road_search === '') {
                this.getAllArea()
            } else {
                axios.get('http://localhost:8088/manage-area/search', {
                    params: {
                        current_page: that.pageNum,
                        total_page: that.total,
                        area_name: that.search_area
                    }
                }).then(function (response) {
                    console.log(response.data)
                    that.tableData = response.data.records
                    that.total = response.data.total
                    that.size = response.data.size
                }).catch(function (error) {
                    console.log(error)
                    ElMessage({
                        message: error,
                        type: 'warning',
                    })
                })
            }
        },
        showEditInfo: function (row) {
            this.form.area_id = row.area_id,
                this.form.area_name = row.area_name,
                this.form.area_province = row.area_province,
                this.form.area_content = row.area_content
        },
        updateArea: function () {
            const that = this
            axios.post('http://localhost:8088/manage-area/update-area', {
                area_id: this.form.area_id,
                area_content: this.form.area_content,
            }).then(function (response) {
                console.log(response.data)
                if (response.data === '更新成功') {
                    ElMessage({
                        message: '更新成功',
                        type: 'success',
                    })
                    that.getAllArea()
                } else {
                    ElMessage({
                        message: response.data,
                        type: 'warning',
                    })
                }
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'error',
                })
            })
        },
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum
            this.getAllArea()
        },
        getAllArea: function () {
            const that = this
            axios.get('http://localhost:8088/manage-area/get-all-area', {
                params: {
                    current_page: that.pageNum,
                    total_page: that.total
                }
            }).then(function (response) {
                console.log(response.data)
                that.tableData = response.data.records
                that.total = response.data.total
                that.size = response.data.size
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        }
    },
    components: {Aside, Header},
    mounted() {
        if (this.admin_name === null || this.admin_name === '') {
            ElMessage.error('似乎还没有登录，请先登录')
            window.location.href = '403'
        } else {
            const that = this
            axios.get('http://localhost:8088/manage-area/get-all-area', {
                params: {
                    current_page: that.pageNum,
                    total_page: that.total
                }
            }).then(function (response) {
                console.log(response.data)
                that.tableData = response.data.records
                that.total = response.data.total
                that.size = response.data.size
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        }
    }
})
</script>

<style scoped>

</style>