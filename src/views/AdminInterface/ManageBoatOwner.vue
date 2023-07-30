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
                <el-text size="large">船主管理<br></el-text>
                <el-button type="success" style="margin: 20px 0" @click="road_dialogVisible = true">添加船主</el-button>
                <el-dialog
                        v-model:model-value="road_dialogVisible"
                        title="添加船主"
                        width="30%"
                >
                    <el-form
                            ref="ruleFormRef"
                            :model="owner_form"
                            label-width="120px"
                            class="demo-ruleForm"
                            status-icon
                    >
                        <el-form-item label="姓名" prop="ship_owner">
                            <el-input v-model="owner_form.ship_owner"/>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="telephone">
                            <el-input v-model="owner_form.telephone"/>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="road_dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="road_dialogVisible = false;addShipOwner()">
                      确定
                    </el-button>
                  </span>
                    </template>
                </el-dialog>
                <el-input
                        v-model="owner_search"
                        class="w-50 m-2"
                        placeholder="搜索船主"
                        :prefix-icon="Search"
                        style="width: 20%; margin: 20px"
                />
                <el-button type="primary" style="margin: 20px 0" @click="search">搜索</el-button>
                <el-table :data="tableData" style="width: 100%;border-radius: 5px" :cell-style="{ textAlign: 'center' }"
                          :header-cell-style="{ 'text-align': 'center' }">
                    <el-table-column prop="owner_id" label="船主编号"/>
                    <el-table-column prop="ship_owner" label="船主"/>
                    <el-table-column prop="telephone" label="电话"/>
                    <el-table-column fixed="right" label="操作">
                        <template #default="scope">
                            <el-button type="primary" size="large"
                                       @click="dialogVisible = true;showEditInfo(scope.row)">编辑
                            </el-button>
                            <el-button type="danger" size="large" @click="delShipOwner(scope.row)">删除</el-button>
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
                        title="编辑订单"
                        width="30%"
                >
                    <el-form
                            ref="ruleFormRef"
                            :model="form"
                            label-width="120px"
                            class="demo-ruleForm"
                            status-icon
                    >
                        <el-form-item label="船主编号" prop="owner_id">
                            <el-input v-model="form.owner_id" disabled/>
                        </el-form-item>
                        <el-form-item label="船主姓名" prop="ship_owner">
                            <el-input v-model="form.ship_owner"/>
                        </el-form-item>
                        <el-form-item label="手机号" prop="telephone">
                            <el-input v-model="form.telephone"/>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                      <span class="dialog-footer">
                          <el-button @click="dialogVisible = false">取消</el-button>
                          <el-button type="primary" @click="dialogVisible = false;updateInfo()">
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
import {Search} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";

export default {
    name: "ManageBoatOwner",
    computed: {
        Search() {
            return Search
        }
    },
    setup() {
        const owner_search = ref('')
        const road_dialogVisible = ref(false)
        const tableData = ref([])
        const dialogVisible = ref(false)
        const pageNum = ref(1)
        const total = ref(10)
        const size = ref(3)
        const owner_form = reactive({
            ship_owner: '',
            telephone: ''
        })
        const form = ref({
            owner_id: '',
            ship_owner: '',
            telephone: ''
        })
        const admin_name = localStorage.getItem('admin_name')

        return {
            road_dialogVisible,
            owner_form,
            owner_search,
            admin_name,
            tableData,
            dialogVisible,
            pageNum,
            total,
            size,
            form
        }
    },
    methods: {
        search: function () {
            const that = this
            if (this.owner_search === '') {
                this.getAllOwner()
            } else {
                axios.get('http://localhost:8088/manage-owner/search', {
                    params: {
                        current_page: that.pageNum,
                        total_page: that.total,
                        ship_owner: this.owner_search
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
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum
            this.getAllOwner()
        },
        getAllOwner: function () {
            const that = this
            axios.get('http://localhost:8088/manage-owner/get-all-owner', {
                params: {
                    current_page: that.pageNum,
                    total_page: that.total
                }
            }).then(function (response) {
                console.log(response.data)
                that.tableData = response.data.records
                that.total = response.data.total
                that.size = response.data.size
                console.log(that.total)
                console.log(that.pageNum)
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        },
        showEditInfo: function (row) {
            this.form.owner_id = row.owner_id
            this.form.ship_owner = row.ship_owner
            this.form.telephone = row.telephone
        },
        addShipOwner: function () {
            const that = this
            axios.post('http://localhost:8088/manage-owner/add-owner', {
                ship_owner: that.owner_form.ship_owner,
                telephone: that.owner_form.telephone
            }).then(function (response) {
                console.log(response.data)
                if (response.data === '添加成功') {
                    ElMessage({
                        message: '添加成功',
                        type: 'success',
                    })
                    that.getAllOwner()
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
        delShipOwner: function (row) {
            const that = this
            axios.get('http://localhost:8088/manage-owner/del-owner', {
                params: {
                    owner_id: row.owner_id
                }
            }).then(function (response) {
                if (response.data === '删除成功') {
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                    })
                    that.getAllOwner()
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
        updateInfo: function () {
            const that = this
            axios.post('http://localhost:8088/manage-owner/update-info', {
                owner_id: that.form.owner_id,
                ship_owner: that.form.ship_owner,
                telephone: that.form.telephone
            }).then(function (response) {
                console.log(response.data)
                if (response.data === '更新成功') {
                    ElMessage({
                        message: '更新成功',
                        type: 'success',
                    })
                    that.getAllOwner()
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
        }
    },
    data() {
        return {
            admin_name: this.admin_name
        }
    },
    mounted() {
        if (this.admin_name === null || this.admin_name === '') {
            ElMessage.error('似乎还没有登录，请先登录')
            window.location.href = '403'
        } else {
            const that = this
            axios.get('http://localhost:8088/manage-owner/get-all-owner', {
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
    components: {Aside, Header}
}
</script>

<style scoped lang="scss">
@import "../../assets/Style/AdminIndex.scss";

.dialog-footer button:first-child {
  margin-right: 10px;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
  margin: 0;
}
</style>