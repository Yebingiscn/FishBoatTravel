<template>
    <el-header style="text-align: right; font-size: 12px; ">
        <div class="toolbar">
            <el-dropdown>
                <el-icon style="margin-right: 8px; margin-top: 1px"
                >
                    <Setting
                    />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <router-link to="admin-login">
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </router-link>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <span>Admin</span>
        </div>
    </el-header>
    <el-tabs :tab-position="'left'" style="height:100%" class="demo-tabs">
        <template>渔之旅后台管理系统</template>
        <el-tab-pane label="首页">
            <el-row class="row-bg" :gutter="10" width="400px">
                <el-col :xs="24" :sm="12" :lg="8">
                    <el-card class="box-card" style="height: 100%">
                        <el-image
                                class="wechat"
                                style="max-width: 200px"
                                :data-resid="Date.now()"
                        />
                        <div class="personal">
                            <div class="name"></div>
                            <div class="description"></div>
                            <div class="list">
                                <div>用户名：admin</div>
                                <div>类型：管理员</div>
                                <div>状态：正常</div>
                            </div>
                            <el-divider></el-divider>
                            <div style="margin-bottom: 15px"><h5>用户反馈</h5></div>
                            <div>
                                <el-tag style="margin-right: 10px">希望价格有优惠</el-tag>
                                <el-tag style="margin-right: 10px">希望可以举办钓鱼活动</el-tag>
                                <el-tag style="margin-right: 10px">船主十分热心</el-tag>
                                <el-tag style="margin-right: 10px">很愉快的经历</el-tag>
                                <el-tag>希望多人团建有优惠</el-tag>
                            </div>
                            <el-divider></el-divider>
                            <div style="margin-bottom: 15px"><h5>公司座右铭</h5></div>
                            <div>站在游客角度思考问题，一切以游客利益为准</div>
                            <el-divider></el-divider>
                            <div style="margin-bottom: 15px"
                            ><h5>公司联系电话：400-8820-8830</h5><h5>公司联系地址：广东省广州市黄埔区开发大街1号</h5></div
                            >
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="12" :lg="16">
                    <el-row class="custom" :gutter="10">
                        <el-col :xs="24" :sm="12" :lg="8">
                            <el-card style="margin-bottom: 10px">
                                <div class="grid-content">
                                    <div class="left"
                                    >
                                        <el-icon style="font-size: 24px; color: white">
                                            <user/>
                                        </el-icon
                                        >
                                    </div>
                                    <div class="right">
                                        <div
                                                class="h2"
                                                style="color: #2d8cf0"
                                        >
                                            <count-to
                                                    :start-val="0"
                                                    :end-val="5268"
                                                    :duration="2000"
                                                    :autoplay="true"
                                            ></count-to
                                            >
                                        </div>
                                        <div>用户访问量：10</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                            <el-card style="margin-bottom: 10px">
                                <div class="grid-content">
                                    <div class="left" style="background: #64d572">
                                        <el-icon style="font-size: 24px; color: white">
                                            <user/>
                                        </el-icon
                                        >
                                    </div>
                                    <div class="right">
                                        <count-to
                                                :start-val="0"
                                                :end-val="9599"
                                                :duration="2000"
                                                :autoplay="true"
                                        ></count-to
                                        >
                                        <div>系统消息</div>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :xs="24" :sm="12" :lg="8">
                            <el-card style="margin-bottom: 10px">
                                <div class="grid-content">
                                    <div class="left" style="background: #f25e43"
                                    >
                                        <el-icon style="font-size: 24px; color: white">
                                            <user/>
                                        </el-icon
                                        >
                                    </div>
                                    <div class="right">
                                        <div
                                                class="h2"
                                                style="color: #f25e43"
                                        >
                                            <count-to
                                                    :start-val="0"
                                                    :end-val="595453"
                                                    :duration="2000"
                                                    :autoplay="true"
                                            ></count-to
                                            >
                                        </div>
                                        <div>累计订单：10</div>
                                    </div>

                                </div>
                            </el-card>
                        </el-col>

                    </el-row>
                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <span>用户热门路线</span>
                            </div>
                        </template>
                        <div>
                            <p>1. 亚龙湾</p>
                            <p>2. 厦门</p>
                            <p>3. 三亚</p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="管理员列表" :prefix-icon="User">
            <el-text size="large"> 管理员列表<br></el-text>
            <el-button type="success" style="margin: 20px 0" @click="admin_dialogVisible = true">添加</el-button>
            <el-dialog
                    v-model:model-value="admin_dialogVisible"
                    title="添加管理员"
                    width="30%"
            >
                <el-form :model="admin_form" label-width="120px">
                    <el-form-item label="用户列表">
                        <el-select v-model:model-value="admin_form.user_name" placeholder="请选择你要添加的管理员">
                            <el-option label="Zone one" value="shanghai"/>
                            <el-option label="Zone two" value="beijing"/>
                        </el-select>
                    </el-form-item>
                </el-form>
                <template #footer>
      <span class="dialog-footer">
        <el-button @click="admin_dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="admin_dialogVisible = false">
          确定
        </el-button>
      </span>
                </template>
            </el-dialog>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="date" label="Date" width="150"/>
                <el-table-column prop="name" label="Name" width="120"/>
                <el-table-column prop="state" label="State" width="120"/>
                <el-table-column prop="city" label="City" width="120"/>
                <el-table-column prop="address" label="Address" width="600"/>
                <el-table-column prop="zip" label="Zip" width="120"/>
                <el-table-column fixed="right" label="Operations" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick"
                        >详细
                        </el-button
                        >
                        <el-button link type="primary" size="small">编辑</el-button>
                        <el-button link type="primary" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="用户管理">
            <el-text size="large"> 用户管理<br></el-text>
            <el-input
                    v-model="user_search"
                    class="w-50 m-2"
                    placeholder="搜索用户"
                    :prefix-icon="Search"
                    style="width: 20%; margin: 20px"
            />
            <el-button type="primary" style="margin: 20px 0" @click="road_dialogVisible = true">搜索</el-button>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="date" label="Date" width="150"/>
                <el-table-column prop="name" label="Name" width="120"/>
                <el-table-column prop="state" label="State" width="120"/>
                <el-table-column prop="city" label="City" width="120"/>
                <el-table-column prop="address" label="Address" width="600"/>
                <el-table-column prop="zip" label="Zip" width="120"/>
                <el-table-column fixed="right" label="Operations" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick"
                        >详情
                        </el-button
                        >
                        <el-button link type="primary" size="small">编辑</el-button>
                        <el-button link type="primary" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="订单管理">
            <el-text size="large">订单管理<br></el-text>
            <el-input
                    v-model="order_search"
                    class="w-50 m-2"
                    placeholder="搜索订单"
                    :prefix-icon="Search"
                    style="width: 20%; margin: 20px"
            />
            <el-button type="primary" style="margin: 20px 0" @click="road_dialogVisible = true">搜索</el-button>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="date" label="Date" width="150"/>
                <el-table-column prop="name" label="Name" width="120"/>
                <el-table-column prop="state" label="State" width="120"/>
                <el-table-column prop="city" label="City" width="120"/>
                <el-table-column prop="address" label="Address" width="600"/>
                <el-table-column prop="zip" label="Zip" width="120"/>
                <el-table-column fixed="right" label="Operations" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick"
                        >详情
                        </el-button
                        >
                        <el-button link type="primary" size="small">编辑</el-button>
                        <el-button link type="primary" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="路线管理">
            <el-text size="large">路线管理<br></el-text>
            <el-button type="success" style="margin: 20px 0" @click="road_dialogVisible = true">添加</el-button>
            <el-dialog
                    v-model:model-value="road_dialogVisible"
                    title="Tips"
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
                        <el-input v-model="road_form.name"/>
                    </el-form-item>
                    <el-form-item label="路线介绍" prop="name">
                        <el-input v-model="road_form.road_indicate"/>
                    </el-form-item>
                    <el-form-item label="旅游类型" prop="region">
                        <el-select v-model="road_form.road_type" placeholder="渔船类型">
                            <el-option label="渔船观光" value="travel"/>
                            <el-option label="捕鱼旅游" value="fish"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属渔船" prop="region">
                        <el-select v-model="road_form.road_boat" placeholder="所属渔船">
                            <el-option label="粤A-462" value="travel"/>
                            <el-option label="粤A-574" value="fish"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="路线区域">
                        <el-cascader
                                size="large"
                                :options="options"
                                v-model="selectedOptions"
                                @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="坐标1" prop="name">
                        <el-input v-model="road_form.road_location_1X"/>
                        <el-input v-model="road_form.road_location_1Y"/>
                    </el-form-item>
                    <el-form-item label="坐标2" prop="name">
                        <el-input v-model="road_form.road_location_2X"/>
                        <el-input v-model="road_form.road_location_2Y"/>
                    </el-form-item>
                    <el-form-item label="坐标3" prop="name">
                        <el-input v-model="road_form.road_location_3X"/>
                        <el-input v-model="road_form.road_location_3Y"/>
                    </el-form-item>

                </el-form>
                <template #footer>
                  <span class="dialog-footer">
                    <el-button @click="road_dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="road_dialogVisible = false">
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
            <el-button type="primary" style="margin: 20px 0" @click="road_dialogVisible = true">搜索</el-button>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column fixed prop="date" label="Date" width="150"/>
                <el-table-column prop="name" label="Name" width="120"/>
                <el-table-column prop="state" label="State" width="120"/>
                <el-table-column prop="city" label="City" width="120"/>
                <el-table-column prop="address" label="Address" width="600"/>
                <el-table-column prop="zip" label="Zip" width="120"/>
                <el-table-column fixed="right" label="Operations" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick"
                        >详细
                        </el-button
                        >
                        <el-button link type="primary" size="small">编辑</el-button>
                        <el-button link type="primary" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue'
import {Search, Setting, User} from '@element-plus/icons-vue'
import {provinceAndCityData} from 'element-china-area-data'

const tabPosition = ref('left')
export default defineComponent({
    computed: {
        Search() {
            return Search
        },
        User() {
            return User
        }
    },
    components: {Setting, User},
    setup() {
        const admin_dialogVisible = ref(false)
        const road_dialogVisible = ref(false)
        const user_search = ref('')
        const order_search = ref('')
        const road_search = ref('')
        const options = ref(provinceAndCityData)
        const selectedOptions = []
        const admin_form = reactive({
            user_name: '',
        });
        const road_form = reactive({
            road_name: '',
            road_indicate: '',
            road_type: '',
            road_boat: '',
            road_location_1X: '',
            road_location_1Y: '',
            road_location_2X: '',
            road_location_2Y: '',
            road_location_3X: '',
            road_location_3Y: '',
        })
        const tableData = [
            {
                date: '2016-05-03',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Home',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Office',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Home',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                state: 'California',
                city: 'Los Angeles',
                address: 'No. 189, Grove St, Los Angeles',
                zip: 'CA 90036',
                tag: 'Office',
            },
        ]
        return {
            admin_dialogVisible,
            road_dialogVisible,
            order_search,
            tableData,
            admin_form,
            options,
            selectedOptions,
            road_form,
            user_search,
            road_search
        }
    },
    methods: {
        handleClick: function () {
            console.log('click')
        },
        handleChange(value) {
            console.log(value)
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

</style>