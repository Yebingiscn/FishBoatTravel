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
                <el-button type="success" style="margin: 20px 0" @click="road_dialogVisible = true">添加</el-button>
                <el-dialog
                        v-model:model-value="road_dialogVisible"
                        title="添加路线"
                        width="30%"
                >
                    <el-form
                            ref="ruleFormRef"
                            :model="road_form"
                            label-width="120px"
                            class="demo-ruleForm"
                            status-icon
                    >
                        <el-form-item label="路线名" prop="name">
                            <el-input v-model="road_form.road_name"/>
                        </el-form-item>
                        <el-form-item label="路线介绍" prop="name">
                            <el-input type="textarea" v-model="road_form.road_indicate"/>
                        </el-form-item>
                        <el-form-item label="路线照片">
                            <el-upload
                                    class="avatar-uploader"
                                    action="http://localhost:8088/upload/road-image"
                                    :show-file-list="false"
                                    :on-success="AddHandleAvatarSuccess"
                            >
                                <el-image v-if="imageAddUrl" :src="imageAddUrl" class="avatar"/>
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus/>
                                </el-icon>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="路线区域">
                            <el-cascader
                                    size="large"
                                    :options="options"
                                    v-model="road_form.area_name"
                                    @change="handleChange"
                            >
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="旅游类型" prop="region">
                            <el-select v-model="road_form.type" placeholder="渔船类型">
                                <el-option label="渔船观光" value="渔船观光"/>
                                <el-option label="捕鱼旅游" value="捕鱼旅游"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="船只类型" prop="region">
                            <el-select v-model="road_form.ship_type" placeholder="渔船类型">
                                <el-option label="小船" value="小船"/>
                                <el-option label="大船" value="大船"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人费用" prop="name">
                            <el-input type="number" v-model="road_form.fee"/>
                        </el-form-item>
                        <el-form-item label="坐标1" prop="name">
                            <el-input type="number" v-model="road_form.location_1x" placeholder="1x"/>
                            <el-input type="number" v-model="road_form.location_1y" placeholder="1y"/>
                        </el-form-item>
                        <el-form-item label="坐标2" prop="name">
                            <el-input type="number" v-model="road_form.location_2x" placeholder="2x"/>
                            <el-input type="number" v-model="road_form.location_2y" placeholder="2y"/>
                        </el-form-item>
                        <el-form-item label="坐标3" prop="name">
                            <el-input type="number" v-model="road_form.location_3x" placeholder="3x"/>
                            <el-input type="number" v-model="road_form.location_3y" placeholder="3y"/>
                        </el-form-item>
                        <el-link href="http://api.map.baidu.com/lbsapi/getpoint/index.html" type="primary"
                                 target="_blank">百度地图坐标拾取系统
                        </el-link>
                    </el-form>
                    <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="road_dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="road_dialogVisible = false;addRoad()">
                      确定
                    </el-button>
                  </span>
                    </template>
                </el-dialog>

                <el-input
                        v-model="road_search"
                        class="w-50 m-2"
                        placeholder="搜索路线"
                        :prefix-icon="Search"
                        style="width: 20%; margin: 20px"
                />
                <el-button type="primary" style="margin: 20px 0" @click="search">搜索</el-button>
                <el-table :data="tableData" style="width: 100%;border-radius: 5px" :cell-style="{ textAlign: 'center' }"
                          :header-cell-style="{ 'text-align': 'center' }">
                    <el-table-column fixed prop="road_id" label="路线编号" width="80"/>
                    <el-table-column prop="road_name" label="路线名称" width="120"/>
                    <el-table-column prop="road_indicate" label="路线介绍" width="200"/>
                    <el-table-column prop="road_image" label="路线照片" width="120">
                        <template #default="scope">
                            <img
                                    :src=scope.row.road_image
                                    class="image"
                                    alt=""/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="area_name" label="区域名" width="120"/>
                    <el-table-column prop="type" label="类型" width="160">
                        <template #default="scope">
                            <el-alert v-if="scope.row.type === '渔船观光'" title="渔船观光" type="success" center
                                      :closable="false"
                                      style="width: 80%"/>
                            <el-alert v-if="scope.row.type === '捕鱼旅游'" title="捕鱼旅游" type="warning" center
                                      :closable="false"
                                      style="width: 80%"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ship_type" label="船只类型" width="160">
                        <template #default="scope">
                            <el-alert v-if="scope.row.ship_type === '大船'" title="大船" type="success" center
                                      :closable="false"
                                      style="width: 80%"/>
                            <el-alert v-if="scope.row.ship_type === '小船'" title="小船" type="warning" center
                                      :closable="false"
                                      style="width: 80%"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fee" label="费用" width="120"/>
                    <el-table-column prop="location_1x" label="坐标点1（X）" width="120"/>
                    <el-table-column prop="location_1y" label="坐标点1（Y）" width="120"/>
                    <el-table-column prop="location_2x" label="坐标点2（X）" width="120"/>
                    <el-table-column prop="location_2y" label="坐标点2（Y）" width="120"/>
                    <el-table-column prop="location_3x" label="坐标点3（X）" width="120"/>
                    <el-table-column prop="location_3y" label="坐标点3（Y）" width="120"/>
                    <el-table-column fixed="right" prop="state" label="状态" width="160">
                        <template #default="scope">
                            <el-alert v-if="scope.row.state === '正常'" title="运营中" type="success" center
                                      show-icon :closable="false"
                                      style="width: 80%"/>
                            <el-alert v-if="scope.row.state === '已下线'" title="已下线" type="info" center
                                      show-icon :closable="false"
                                      style="width: 80%"/>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="180">
                        <template #default="scope">
                            <el-button type="primary" size="default"
                                       @click="dialogVisible = true;showEditInfo(scope.row)">编辑
                            </el-button>
                            <el-button type="danger" size="default" @click="deleteRoad(scope.row)">删除</el-button>
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
                            :model="edit_road"
                            label-width="120px"
                            class="demo-ruleForm"
                            status-icon
                    >
                        <el-form-item label="路线编号" prop="name">
                            <el-input v-model="edit_road.road_id" disabled/>
                        </el-form-item>
                        <el-form-item label="路线名" prop="name">
                            <el-input v-model="edit_road.road_name"/>
                        </el-form-item>
                        <el-form-item label="路线介绍" prop="name">
                            <el-input type="textarea" v-model="edit_road.road_indicate"/>
                        </el-form-item>
                        <el-form-item label="路线照片">
                            <el-image :src="edit_road.road_image"/>
                        </el-form-item>
                        <el-form-item label="路线区域">
                            <el-cascader
                                    size="large"
                                    :options="options"
                                    v-model="edit_road.area_name"
                                    @change="handleChange"
                            >
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="旅游类型" prop="region">
                            <el-select v-model="edit_road.type" placeholder="渔船类型">
                                <el-option label="渔船观光" value="渔船观光"/>
                                <el-option label="捕鱼旅游" value="捕鱼旅游"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="船只类型" prop="region">
                            <el-select v-model="edit_road.ship_type" placeholder="渔船类型">
                                <el-option label="小船" value="小船"/>
                                <el-option label="大船" value="大船"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="个人费用" prop="name">
                            <el-input type="number" v-model="edit_road.fee"/>
                        </el-form-item>
                        <el-form-item label="坐标1" prop="name">
                            <el-input type="number" v-model="edit_road.location_1x" placeholder="1x"/>
                            <el-input type="number" v-model="edit_road.location_1y" placeholder="1y"/>
                        </el-form-item>
                        <el-form-item label="坐标2" prop="name">
                            <el-input type="number" v-model="edit_road.location_2x" placeholder="2x"/>
                            <el-input type="number" v-model="edit_road.location_2y" placeholder="2y"/>
                        </el-form-item>
                        <el-form-item label="坐标3" prop="name">
                            <el-input type="number" v-model="edit_road.location_3x" placeholder="3x"/>
                            <el-input type="number" v-model="edit_road.location_3y" placeholder="3y"/>
                        </el-form-item>
                        <el-form-item label="状态" prop="state">
                            <el-select v-model="edit_road.state" placeholder="">
                                <el-option label="运营中" value="正常"/>
                                <el-option label="已下线" value="已下线"/>
                            </el-select>
                        </el-form-item>
                        <el-link href="http://api.map.baidu.com/lbsapi/getpoint/index.html" type="primary"
                                 target="_blank">百度地图坐标拾取系统
                        </el-link>
                    </el-form>
                    <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false;updateRoad()">
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
import {defineComponent, reactive, ref} from "vue";
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import {provinceAndCityData} from "element-china-area-data";
import {Plus, Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import axios from "axios";
import {CodeToText} from "element-china-area-data/dist/app";

export default defineComponent({
    name: "ManageRoad",
    computed: {
        Search() {
            return Search
        }
    },
    components: {Plus, Header, Aside},
    setup() {
        const road_dialogVisible = ref(false)
        const dialogVisible = ref(false)
        const road_search = ref('')
        const options = ref(provinceAndCityData)
        const selectedOptions = []
        const pageNum = ref(1)
        const total = ref(10)
        const size = ref(3)
        const imageUrl = ref('')
        const imageAddUrl = ref('')
        const area_province = ref('')
        const area_name = ref('')
        const tableData = ref([])
        const road_form = reactive({
            road_name: '',
            road_indicate: '',
            road_image: '',
            type: '',
            area_name: '',
            ship_type: '',
            fee: '',
            location_1x: '',
            location_1y: '',
            location_2x: '',
            location_2y: '',
            location_3x: '',
            location_3y: ''
        })
        const edit_road = reactive({
            road_id: '',
            road_name: '',
            road_indicate: '',
            type: '',
            area_name: '',
            ship_type: '',
            fee: '',
            state: '',
            road_image: '',
            location_1x: '',
            location_1y: '',
            location_2x: '',
            location_2y: '',
            location_3x: '',
            location_3y: ''
        })
        const admin_name = localStorage.getItem('admin_name')
        return {
            road_dialogVisible,
            dialogVisible,
            road_form,
            road_search,
            options,
            selectedOptions,
            admin_name,
            area_name,
            area_province,
            pageNum,
            total,
            size,
            tableData,
            edit_road,
            imageUrl,
            imageAddUrl
        }
    },
    methods: {
        search: function () {
            console.log(this.road_search);
            const that = this
            if (this.admin_name === null || this.admin_name === '') {
                this.getAllRoad()
            } else {
                axios.get('http://localhost:8088/manage-road/search', {
                    params: {
                        current_page: that.pageNum,
                        total_page: that.total,
                        road_search: that.road_search
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
        handleChange: function (value) {
            this.selectedOptions = value
            console.log(this.selectedOptions)
            let name = ''
            this.selectedOptions.map(item => name += CodeToText[item] + '') //将省市区三个拼接一起
            this.road_form.area_name = name
            this.edit_road.area_name = name
            this.area_province = CodeToText[this.selectedOptions[0]]
            this.area_name = CodeToText[this.selectedOptions[1]]
            // console.log(this.addForm)
        },
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum
            this.getAllRoad()
        },
        addRoad: function () {
            const that = this
            console.log(this.road_form)
            axios.get('http://localhost:8088/manage-area/add-area', {
                params: {
                    area_name: that.area_name,
                    area_province: that.area_province,
                }
            }).then(function (response) {
                console.log(response.data)
                if (response.data === '添加成功') {
                    axios.post('http://localhost:8088/manage-road/add-road', {
                        road_name: that.road_form.road_name,
                        road_indicate: that.road_form.road_indicate,
                        road_image: that.road_form.road_image,
                        type: that.road_form.type,
                        area_name: that.road_form.area_name,
                        ship_type: that.road_form.ship_type,
                        fee: that.road_form.fee,
                        state: '正常',
                        location_1x: that.road_form.location_1x,
                        location_1y: that.road_form.location_1y,
                        location_2x: that.road_form.location_2x,
                        location_2y: that.road_form.location_2y,
                        location_3x: that.road_form.location_3x,
                        location_3y: that.road_form.location_3y
                    }).then(function (response) {
                        console.log(response.data)
                        if (response.data === '添加成功') {
                            ElMessage({
                                message: '添加成功',
                                type: 'success',
                            })
                            that.road_form.road_image = ''
                            that.getAllRoad()
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
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        },
        showEditInfo: function (row) {
            this.edit_road.road_id = row.road_id,
                this.edit_road.road_name = row.road_name,
                this.edit_road.road_indicate = row.road_indicate,
                this.edit_road.type = row.type,
                this.edit_road.area_name = row.area_name,
                this.edit_road.ship_type = row.ship_type,
                this.edit_road.fee = row.fee,
                this.edit_road.road_image = row.road_image
            this.edit_road.state = row.state,
                this.edit_road.location_1x = row.location_1x,
                this.edit_road.location_1y = row.location_1y,
                this.edit_road.location_2x = row.location_2x,
                this.edit_road.location_2y = row.location_2y,
                this.edit_road.location_3x = row.location_3x,
                this.edit_road.location_3y = row.location_3y
        },
        updateRoad: function () {
            const that = this
            console.log(this.edit_road)
            axios.post('http://localhost:8088/manage-road/update-road', {
                road_id: this.edit_road.road_id,
                road_name: this.edit_road.road_name,
                road_indicate: this.edit_road.road_indicate,
                type: this.edit_road.type,
                area_name: this.edit_road.area_name,
                ship_type: this.edit_road.ship_type,
                fee: this.edit_road.fee,
                state: this.edit_road.state,
                road_image: this.edit_road.road_image,
                location_1x: this.edit_road.location_1x,
                location_1y: this.edit_road.location_1y,
                location_2x: this.edit_road.location_2x,
                location_2y: this.edit_road.location_2y,
                location_3x: this.edit_road.location_3x,
                location_3y: this.edit_road.location_3y
            }).then(function (response) {
                console.log(response.data)
                if (response.data === '更新成功') {
                    ElMessage({
                        message: '更新成功',
                        type: 'success',
                    })
                    that.getAllRoad()
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
        deleteRoad: function (row) {
            const that = this
            axios.get('http://localhost:8088/manage-road/del-road', {
                params: {
                    road_id: row.road_id
                }
            }).then(function (response) {
                if (response.data === '删除成功') {
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                    })
                    that.getAllRoad()
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
                    type: 'warning',
                })
            })
        },
        getAllRoad: function () {
            const that = this
            axios.get('http://localhost:8088/manage-road/get-all-road', {
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
        AddHandleAvatarSuccess: function (res) {
            console.log(res)
            this.imageAddUrl = res
            this.road_form.road_image = res
        }
    },
    data() {
        return {
            admin_name: this.admin_name
        }
    },
    mounted() {
        console.log(this.admin_name)
        if (this.admin_name === '') {
            ElMessage.error('似乎还没有登录，请先登录')
            window.location.href = '403'
        } else {
            const that = this
            axios.get('http://localhost:8088/manage-road/get-all-road', {
                params: {
                    current_page: that.pageNum,
                    total_page: that.total,
                    user_name: that.order_search
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
        }
    }
})
</script>

<style scoped>
.image {
    width: 178px;
    height: 178px;
    display: block;
}
</style>