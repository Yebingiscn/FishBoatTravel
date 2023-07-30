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
                <el-text size="large">订单管理<br></el-text>
                <el-input
                        v-model="order_search"
                        class="w-50 m-2"
                        placeholder="根据用户名搜索订单"
                        :prefix-icon="Search"
                        style="width: 20%; margin: 20px"
                />
                <el-button type="primary" style="margin: 20px 0" @click="search">搜索</el-button>
                <el-table :data="tableData" style="width: 100%; border-radius: 5px"
                          :cell-style="{ textAlign: 'center' }"
                          :header-cell-style="{ 'text-align': 'center' }">
                    <el-table-column fixed prop="order_id" label="订单编号" width="100"/>
                    <el-table-column prop="user_name" label="用户名" width="100"/>
                    <el-table-column prop="road_name" label="路线名" width="100"/>
                    <el-table-column prop="order_date" label="游玩时间" width="220">
                        <template #default="scope">
                            <el-date-picker
                                    v-model="scope.row.order_date"
                                    type="datetime"
                                    disabled
                                    style="width: 90%"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="sum_price" label="总价" width="100"/>
                    <el-table-column prop="friend_info" label="随行人" width="120"/>
                    <el-table-column prop="ship" label="分配的船只" width="100"/>
                    <el-table-column prop="order_state" label="订单状态" width="200">
                        <template #default="scope">
                            <el-alert v-if="scope.row.order_state === '已完成'" title="已完成" type="success" center
                                      show-icon :closable="false"
                                      style="width: 60%"/>
                            <el-alert v-if="scope.row.order_state === '已取消'" title="已取消" type="info" center
                                      show-icon :closable="false"
                                      style="width: 60%"/>
                            <el-alert v-if="scope.row.order_state === '已支付'" title="已支付" type="warning" center
                                      show-icon :closable="false"
                                      style="width: 60%"/>
                            <el-alert v-if="scope.row.order_state === '未支付'" title="未支付" type="error" center
                                      show-icon :closable="false"
                                      style="width: 60%"/>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
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
                        <el-form-item label="订单编号" prop="order_id">
                            <el-input v-model="form.order_id" disabled/>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <el-select v-model:model-value="form.user_name" placeholder="请选择你要添加的管理员">
                                <el-option v-for="(user,index) in user_data"
                                           :key="index" :label="user.user_name"
                                           :value="user.user_name"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="路线名" prop="road_name">
                            <el-select v-model:model-value="form.road_name" placeholder="请选择你要添加的路线">
                                <el-option v-for="(road,index) in road_data"
                                           :key="index" :label="road.road_name"
                                           :value="road.road_name"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="游玩时间" prop="order_date">
                            <div class="demo-datetime-picker">
                                <div class="block">
                                    <el-date-picker
                                            v-model="form.order_date"
                                            type="datetime"
                                            placeholder=""
                                    />
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="总价" prop="sum_price">
                            <el-input type="number" v-model="form.sum_price"/>
                        </el-form-item>
                        <el-form-item label="随行人" prop="friend_info">
                            <el-input type="text" v-model="form.friend_info"/>
                        </el-form-item>
                        <el-form-item label="分配船只" prop="order_date">
                            <el-select v-model:model-value="form.ship" placeholder="请选择你要添加的渔船">
                                <el-option v-for="(ship,index) in ship_data"
                                           :key="index" :label="ship.ship_name"
                                           :value="ship.ship_name"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="订单状态" prop="order_state">
                            <el-select v-model="form.order_state" placeholder="订单类型">
                                <el-option label="未支付" value="未支付"/>
                                <el-option label="已支付" value="已支付"/>
                                <el-option label="已完成" value="已完成"/>
                                <el-option label="已取消" value="已取消"/>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false; updateOrder()">
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
import {defineComponent, ref} from "vue";
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import axios from "axios";

export default defineComponent({
    name: "ManageOrder",
    setup() {
        const order_search = ref('')
        const admin_name = localStorage.getItem('admin_name')
        const tableData = ref([])
        const user_data = ref([])
        const road_data = ref([])
        const ship_data = ref([])
        const pageNum = ref(1)
        const total = ref(10)
        const size = ref(3)
        const dialogVisible = ref(false)
        const form = ref({
            order_id: '',
            user_name: '',
            road_name: '',
            order_date: '',
            sum_price: '',
            friend_info: '',
            order_state: '',
            ship: ''
        })
        return {
            order_search,
            admin_name,
            tableData,
            pageNum,
            total,
            size,
            form,
            dialogVisible,
            user_data,
            road_data,
            ship_data
        }
    },
    methods: {
        search: function () {
            console.log(this.order_search)
            const that = this
            if (this.order_search === '') {
                this.getAllOrder()
            } else {
                axios.get('http://localhost:8088/manage-order/search-by-user', {
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
        },
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum
            this.getAllOrder()
        },
        updateOrder: function () {
            console.log(this.form)
            const that = this
            axios.post('http://localhost:8088/manage-order/update-order', {
                order_id: that.form.order_id,
                user_name: that.form.user_name,
                road_name: that.form.road_name,
                order_date: that.form.order_date,
                sum_price: that.form.sum_price,
                ship: that.form.ship,
                friend_info: that.form.friend_info,
                order_state: that.form.order_state
            }).then(function (response) {
                console.log(response.data)
                if (response.data === '更新成功') {
                    ElMessage({
                        message: '更新成功',
                        type: 'success',
                    })
                    that.getAllOrder()
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
        getAllOrder: function () {
            const that = this
            axios.get('http://localhost:8088/manage-order/get-all-order', {
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
            this.form.order_id = row.order_id
            this.form.user_name = row.user_name
            this.form.road_name = row.road_name
            this.form.order_date = row.order_date
            this.form.friend_info = row.friend_info
            this.form.sum_price = row.sum_price
            this.form.order_state = row.order_state
            const that = this
            axios.get('http://localhost:8088/admin/show-user-pub').then(function (response) {
                console.log(response.data)
                that.user_data = response.data
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
            axios.get('http://localhost:8088/manage-ship/get-ship', {
                params: {
                    road_name: row.road_name
                }
            }).then(function (response) {
                console.log(response.data)
                that.ship_data = response.data
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
    components: {Header, Aside, Search},
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
            axios.get('http://localhost:8088/manage-order/get-all-order', {
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
        }
    }
})
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