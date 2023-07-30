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
                <el-text size="large">船只管理<br></el-text>
                <el-button type="success" style="margin: 20px 0"
                           @click="road_dialogVisible = true;getOwnerAndRoadData()">添加
                </el-button>
                <el-dialog
                        v-model:model-value="road_dialogVisible"
                        title="添加船只"
                        width="30%"
                >
                    <el-form
                            ref="ruleFormRef"
                            :model="ship_form"
                            label-width="120px"
                            class="demo-ruleForm"
                            status-icon
                    >
                        <el-form-item label="船只名" prop="name">
                            <el-input v-model="ship_form.ship_name"/>
                        </el-form-item>
                        <el-form-item label="注册号" prop="name">
                            <el-input v-model="ship_form.ship_login_id"/>
                        </el-form-item>
                        <el-form-item label="船主" prop="name">
                            <el-select v-model:model-value="ship_form.ship_owner" placeholder="请选择船主">
                                <el-option v-for="(owner,index) in owner_data"
                                           :key="index" :label="owner.ship_owner"
                                           :value="owner.ship_owner"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="路线区域">
                            <el-select v-model:model-value="ship_form.area_name" placeholder="请选择你要添加的区域">
                                <el-option v-for="(road,index) in road_data"
                                           :key="index" :label="road.area_name"
                                           :value="road.area_name"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="路线名" prop="name">
                            <el-select v-model:model-value="ship_form.road_name" placeholder="请选择你要添加的路线">
                                <el-option v-for="(road,index) in road_data"
                                           :key="index" :label="road.road_name"
                                           :value="road.road_name"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="船型" prop="name">
                            <el-select v-model="ship_form.ship_type" placeholder="请选择船型">
                                <el-option label="小船" value="小船"/>
                                <el-option label="大船" value="大船"/>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="road_dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="road_dialogVisible = false; addShip()">
                      确定
                    </el-button>
                  </span>
                    </template>
                </el-dialog>
                <el-input
                        v-model="ship_search"
                        class="w-50 m-2"
                        placeholder="根据船主名搜索船只"
                        :prefix-icon="Search"
                        style="width: 20%; margin: 20px"
                />
                <el-button type="primary" style="margin: 20px 0" @click="search">搜索</el-button>
                <el-table :data="tableData" style="width: 100%; border-radius: 5px"
                          :cell-style="{ textAlign: 'center' }"
                          :header-cell-style="{ 'text-align': 'center' }">
                    <el-table-column fixed prop="ship_id" label="船只编号" width="80"/>
                    <el-table-column prop="ship_name" label="船只名" width="120"/>
                    <el-table-column prop="ship_login_id" label="注册号" width="120"/>
                    <el-table-column prop="ship_owner" label="船主" width="120"/>
                    <el-table-column prop="road_name" label="路线" width="120"/>
                    <el-table-column prop="area_name" label="地区" width="120"/>
                    <el-table-column prop="ship_type" label="船型" width="120">
                        <template #default="scope">
                            <el-alert v-if="scope.row.ship_type === '大船'" title="大船" type="success" center
                                      :closable="false"
                                      style="width: 80%"/>
                            <el-alert v-if="scope.row.ship_type === '小船'" title="小船" type="warning" center
                                      :closable="false"
                                      style="width: 80%"/>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" prop="ship_state" label="船只状态" width="140">
                        <template #default="scope">
                            <el-alert v-if="scope.row.ship_state === '正常'" title="正常" type="success" center
                                      show-icon :closable="false"
                                      style="width: 80%"/>
                            <el-alert v-if="scope.row.ship_state === '注销'" title="注销" type="info" center
                                      show-icon :closable="false"
                                      style="width: 80%"/>
                            <el-alert v-if="scope.row.ship_state === '暂停'" title="暂停" type="warning" center
                                      show-icon :closable="false"
                                      style="width: 80%"/>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="180">
                        <template #default="scope">
                            <el-button type="primary" size="default"
                                       @click="dialogVisible = true;showEditInfo(scope.row)">编辑
                            </el-button>
                            <el-button type="danger" size="default" @click="delShip(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog
                        v-model:model-value="dialogVisible"
                        title="更新船只信息"
                        width="30%"
                >
                    <el-form
                            ref="ruleFormRef"
                            :model="form"
                            label-width="120px"
                            class="demo-ruleForm"
                            status-icon
                    >
                        <el-form-item label="船只编号" prop="name">
                            <el-input v-model="form.ship_id" disabled/>
                        </el-form-item>
                        <el-form-item label="船只名" prop="name">
                            <el-input v-model="form.ship_name"/>
                        </el-form-item>
                        <el-form-item label="注册号" prop="name">
                            <el-input v-model="form.ship_login_id"/>
                        </el-form-item>
                        <el-form-item label="船主" prop="name">
                            <el-select v-model:model-value="form.ship_owner" placeholder="请选择船主">
                                <el-option v-for="(owner,index) in owner_data"
                                           :key="index" :label="owner.ship_owner"
                                           :value="owner.ship_owner"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="路线区域">
                            <el-select v-model:model-value="form.area_name" placeholder="请选择你要添加的区域">
                                <el-option v-for="(road,index) in road_data"
                                           :key="index" :label="road.area_name"
                                           :value="road.area_name"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="路线名" prop="name">
                            <el-select v-model:model-value="form.road_name" placeholder="请选择你要添加的路线">
                                <el-option v-for="(road,index) in road_data"
                                           :key="index" :label="road.road_name"
                                           :value="road.road_name"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="船型" prop="name">
                            <el-select v-model="form.ship_type" placeholder="请选择船型">
                                <el-option label="小船" value="小船"/>
                                <el-option label="大船" value="大船"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="船只状态" prop="name">
                            <el-select v-model="form.ship_state" placeholder="请选择状态">
                                <el-option label="正常" value="正常"/>
                                <el-option label="暂停" value="暂停"/>
                                <el-option label="注销" value="注销"/>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false;updateShip()">
                      确定
                    </el-button>
                  </span>
                    </template>
                </el-dialog>
                <el-pagination background layout="prev, pager, next" style="margin-top: 20px"
                               :total=this.total
                               :current-page=this.pageNum
                               :page-size=this.size
                               @current-change="handleCurrentChange"
                />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import {Search} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {provinceAndCityData} from "element-china-area-data";
import {ElMessage} from "element-plus";
import axios from "axios";

export default {
    name: "ManageBoat",
    setup() {
        const road_dialogVisible = ref(false)
        const ship_search = ref('')
        const options = ref(provinceAndCityData)
        const selectedOptions = []
        const owner_data = ref([])
        const road_data = ref([])
        const pageNum = ref(1)
        const total = ref(10)
        const size = ref(3)
        const dialogVisible = ref(false)
        const tableData = ref([])
        const ship_form = reactive({
            ship_name: '',
            ship_login_id: '',
            ship_owner: '',
            road_name: '',
            area_name: '',
            ship_type: '',
            ship_state: ''
        })
        const form = reactive({
            ship_id: '',
            ship_name: '',
            ship_login_id: '',
            ship_owner: '',
            road_name: '',
            area_name: '',
            ship_type: '',
            ship_state: ''
        })
        const admin_name = localStorage.getItem('admin_name')
        return {
            road_dialogVisible,
            ship_form,
            ship_search,
            selectedOptions,
            options,
            admin_name,
            owner_data,
            road_data,
            pageNum,
            total,
            size,
            form,
            dialogVisible,
            tableData
        }
    },
    methods: {
        search: function () {
            console.log(this.ship_search)
            const that = this
            if (this.road_search === '') {
                this.getAllShip()
            } else {
                axios.get('http://localhost:8088/manage-ship/search', {
                    params: {
                        current_page: that.pageNum,
                        total_page: that.total,
                        ship_owner: that.ship_search
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
            this.getAllShip()
        },
        getOwnerAndRoadData: function () {
            const that = this
            axios.get('http://localhost:8088/manage-owner/get-owner-name').then(function (response) {
                console.log(response.data)
                that.owner_data = response.data
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
            axios.get('http://localhost:8088/manage-road/get-road-name').then(function (response) {
                console.log(response.data)
                that.road_data = response.data
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        },
        addShip: function () {
            const that = this
            console.log(this.road_form)
            axios.post('http://localhost:8088/manage-ship/add-ship', {
                ship_name: that.ship_form.ship_name,
                ship_login_id: that.ship_form.ship_login_id,
                ship_owner: that.ship_form.ship_owner,
                road_name: that.ship_form.road_name,
                area_name: that.ship_form.area_name,
                ship_type: that.ship_form.ship_type,
                ship_state: '正常'
            }).then(function (response) {
                console.log(response.data)
                if (response.data === '添加成功') {
                    ElMessage({
                        message: '添加成功',
                        type: 'success',
                    })
                    that.getAllShip()
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
        showEditInfo: function (row) {
            const that = this
            axios.get('http://localhost:8088/manage-owner/get-owner-name').then(function (response) {
                console.log(response.data)
                that.owner_data = response.data
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
            axios.get('http://localhost:8088/manage-road/get-road-name').then(function (response) {
                console.log(response.data)
                that.road_data = response.data
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
            this.form.ship_id = row.ship_id,
                this.form.ship_name = row.ship_name,
                this.form.ship_login_id = row.ship_login_id,
                this.form.ship_owner = row.ship_owner,
                this.form.road_name = row.road_name,
                this.form.area_name = row.area_name,
                this.form.ship_type = row.ship_type,
                this.form.ship_state = row.ship_state
        },
        updateShip: function () {
            const that = this
            axios.post('http://localhost:8088/manage-ship/update-ship', {
                ship_id: that.form.ship_id,
                ship_name: that.form.ship_name,
                ship_login_id: that.form.ship_login_id,
                ship_owner: that.form.ship_owner,
                road_name: that.form.road_name,
                area_name: that.form.area_name,
                ship_type: that.form.ship_type,
                ship_state: that.form.ship_state
            }).then(function (response) {
                console.log(response.data)
                if (response.data === '更新成功') {
                    ElMessage({
                        message: '更新成功',
                        type: 'success',
                    })
                    that.getAllShip()
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
        delShip: function (row) {
            const that = this
            axios.get('http://localhost:8088/manage-ship/del-ship', {
                params: {
                    ship_id: row.ship_id
                }
            }).then(function (response) {
                if (response.data === '删除成功') {
                    ElMessage({
                        message: '删除成功',
                        type: 'success',
                    })
                    that.getAllShip()
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
        getAllShip: function () {
            const that = this
            axios.get('http://localhost:8088/manage-ship/get-all-ship', {
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
    computed: {
        Search() {
            return Search
        }
    },
    components: {Aside, Header},
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
            axios.get('http://localhost:8088/manage-ship/get-all-ship', {
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
}
</script>

<style scoped>

</style>