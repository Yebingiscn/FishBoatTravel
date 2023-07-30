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
                <template>渔之旅后台管理系统</template>
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
                                    <div>用户名：{{ admin_name }}</div>
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
                                ><h5>公司联系电话：400-8820-8830</h5><h5>
                                    公司联系地址：广东省广州市黄埔区开发大街1号</h5>
                                </div
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
                                                <User/>
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
                                            <div>累计用户：{{ count_user }}</div>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :xs="24" :sm="12" :lg="8">
                                <el-card style="margin-bottom: 10px">
                                    <div class="grid-content">
                                        <div class="left" style="background: #64d572">
                                            <el-icon style="font-size: 24px; color: white">
                                                <User/>
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
                                            <div>累计路线：{{ count_road }}</div>
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
                                                <User/>
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
                                            <div>累计订单：{{ count_order }}</div>
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
                                <p style="color:indianred;">1. 惠州双月湾之旅</p>
                                <el-divider style="margin: 20px 0"/>
                                <p style="color:sandybrown;">2. 厦门渔船观光</p>
                                <el-divider style="margin: 20px 0"/>
                                <p>3. 琼海渔船之旅</p>
                            </div>
                        </el-card>
                        <el-card>
                            <div id="myChart" :style="{width: '600px', height: '300px'}"></div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import {defineComponent, ref} from "vue";
import Header from "../../components/Header.vue";
import Aside from "@/components/Aside.vue";
import {User} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import axios from "axios";

export default defineComponent({
    name: "AdminWindow",
    components: {Header, Aside, User},
    setup() {
        const admin_name = localStorage.getItem('admin_name')
        const count_user = ref(6)
        const count_road = ref(6)
        const count_order = ref(6)
        const count_ship = ref(6)
        const count_owner = ref(6)
        const count_area = ref(6)
        return {
            admin_name,
            count_user,
            count_road,
            count_order,
            count_ship,
            count_owner,
            count_area
        }
    },
    data() {
        return {
            admin_name: this.admin_name
        }
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: {text: '图表展示'},
                tooltip: {},
                xAxis: {
                    data: ["累计用户数", "累计订单数", "累计渔船数", "累计船主数", "累计路线数", "累计区域数"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [
                        this.count_user, this.count_order, this.count_ship, this.count_owner,
                        this.count_road, this.count_area]
                }]
            });
        }
    },
    mounted() {
        if (this.admin_name === null || this.admin_name === '') {
            ElMessage.error('似乎还没有登录，请先登录')
            window.location.href = '403'
        } else {
            const that = this
            axios.get('http://localhost:8088/admin/get-data').then(function (response) {
                console.log(response.data)
                that.count_user = response.data.count_user
                that.count_order = response.data.count_order
                that.count_ship = response.data.count_ship
                that.count_owner = response.data.count_owner
                that.count_road = response.data.count_road
                that.count_area = response.data.count_area
                that.drawLine()
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
}

</style>