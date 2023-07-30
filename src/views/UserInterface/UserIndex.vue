<template>
    <div class="common-layout">
        <el-container>
            <el-header style="text-align: center; font-size: 12px">
                <div class="toolbar">
                    <el-text class="mx-1" style="font-size: 30px; text-align: center;margin: 0 auto ">
                        渔之旅，一个专注于休闲渔船旅游的网站
                    </el-text>
                </div>
            </el-header>
            <el-main style="background: #f5f5f5">
                <div class="search">
                    <el-input
                            size="small"
                            v-model="input3"
                            placeholder="热门搜索：广州"
                            class="input-with-select"
                            style="width: 50%; margin: 10px 20%"
                    >
                        <template #prepend>
                            <el-button :icon="Search" @click="result_search()"/>
                        </template>
                        <template #append>
                            <el-select v-model="select" placeholder="城市" style="width: 115px;">
                                <el-option label="城市" style="text-align: center" value="1"/>
                                <el-divider style="margin: 5px 0"></el-divider>
                                <el-option label="路线" style="text-align: center" value="2"/>
                            </el-select>
                        </template>
                    </el-input>
                </div>
                <el-affix :offset="160" style="float: right">
                    <el-badge is-dot class="item" style="position: fixed; right: 20px;top: 150px;">
                        <el-button style="position: fixed;right: 30px;top: 160px;" @click="isLogin()" :icon="Share"
                                   type="primary">
                            进入渔之旅的世界
                        </el-button>
                    </el-badge>
                </el-affix>
                <el-tabs
                        v-model="activeName"
                        type="card"
                        class="demo-tabs"
                >
                    <el-tab-pane label="主页" name="first" style="text-align: center">
                        <el-carousel indicator-position="outside" height="400px">
                            <el-carousel-item v-for="(photo,index) in photo_list" :key="index">
                                <el-image :src="photo.src" alt="1" fit="contain" style="width: 100%; height: 80%"/>
                                <el-text style="font-size: 20px; height: 10%"><br>{{ photo.label }}</el-text>
                            </el-carousel-item>
                        </el-carousel>
                        <el-col :span="30">
                            <el-row>
                                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                    <el-card shadow="hover" style="text-align: center;width: 95%;background:#fab6b6">
                                        <el-text size="large">挪威渔猎协会休闲渔船旅游系列行为准则<br></el-text>
                                        <el-divider style="margin: 20px 0"/>
                                        <el-text size="default">
                                            不论在水上还是水边，请牢记以下经验法则：<br>
                                            1.要考虑安全问题，并记住规划可以降低风险，让您享受乐趣时没有后顾之忧。<br>
                                            2.携带必需的装备。这些装备应状况良好、便于拿取。<br>
                                            3.充分重视海况和天气。仅在安全时乘船外出。<br>
                                            4.遵守出海的规矩，且必须理解每条规矩的含义。<br>
                                            5.穿上救生衣或其他漂浮物。<br>
                                            6.保证体力充沛、头脑清醒。切勿在酒精或药物影响下开船。<br>
                                            7.考虑周全，并记住：安全、环境和全体人员的安康是大家共同的责任。<br>
                                        </el-text>
                                    </el-card>
                                </el-col>
                                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                    <el-card shadow="hover"
                                             style="text-align: center; width: 95%; height: 100%; background:#fab6b6">
                                        <el-text size="large">渔之旅提示<br></el-text>
                                        <el-divider style="margin: 20px 0"/>
                                        <el-text size="default">
                                            谨防野路子渔船，请选择正规休闲渔船：<br>
                                            1.野路子渔船无防护，用具不足<br>
                                            2.渔之旅工作人员不会和你索要金钱等财务<br>
                                            3.渔之旅系统保护你的隐私安全<br>
                                            4.如果要退款，请电话联系渔之旅<br>
                                        </el-text>
                                    </el-card>
                                </el-col>
                            </el-row>

                        </el-col>
                        <el-text size="large" class="title" style="margin: 3% 40%">他们的休闲渔船真香体验<br></el-text>
                        <el-row :gutter="12" style="margin: 10px 0">
                            <el-col :span="8">
                                <el-card shadow="hover">
                                    <el-text size="default" style="font-weight: bold;">会飞的鱼：<br></el-text>
                                    <el-text size="small" style="font-weight: bold;">一次很棒的出游体验<br></el-text>
                                    <el-rate
                                            v-model="value"
                                            disabled
                                            show-score
                                            text-color="#ff9900"
                                            score-template="{value} 分"
                                    />
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card shadow="hover">
                                    <el-text size="default" style="font-weight: bold;">布鲁：<br></el-text>
                                    <el-text size="small" style="font-weight: bold;">捞到了很多鱼和虾<br></el-text>
                                    <el-rate
                                            v-model="value"
                                            disabled
                                            show-score
                                            text-color="#ff9900"
                                            score-template="5 分"
                                    />
                                </el-card>
                            </el-col>
                            <el-col :span="8">
                                <el-card shadow="hover">
                                    <el-text size="default" style="font-weight: bold;">黑海一般兵：<br></el-text>
                                    <el-text size="small" style="font-weight: bold;">船主很友善也很认真<br></el-text>
                                    <el-rate
                                            v-model="value"
                                            disabled
                                            show-score
                                            text-color="#ff9900"
                                            score-template="5 分"
                                    />
                                </el-card>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                <el-text class="title" style="margin: 3% 40%">热门线路<br></el-text>
                                <el-card class="box-card" style="width: 95%;">
                                    <p style="color:indianred;">1. 惠州双月湾之旅</p>
                                    <el-divider style="margin: 20px 0"/>
                                    <p style="color:sandybrown;">2. 厦门渔船观光</p>
                                    <el-divider style="margin: 20px 0"/>
                                    <p>3. 琼海渔船之旅</p>
                                </el-card>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                <div class="new-road">
                                    <el-text class="title" style="margin: 3% 40%">新线路<br></el-text>
                                    <el-card class="box-card" style="width: 95%;">
                                        <div class="text item">1. 浙江苍南渔船之旅</div>
                                        <el-divider style="margin: 20px 0"></el-divider>
                                        <div class="text item">2. 广州南沙渔船之旅</div>
                                        <el-divider style="margin: 20px 0"></el-divider>
                                        <div class="text item">3. 广东湛江渔船之旅</div>
                                    </el-card>
                                </div>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="关于休闲渔船旅游" name="second">
                        <el-text class="title" style="text-align: center;margin: 3% 45%">什么是休闲渔船旅游<br>
                        </el-text>
                        <el-row>
                            <el-col :span="24">
                                <el-card shadow="hover"> 休闲渔船是指以休闲娱乐为目的，供游客在海上从事垂钓、
                                    捕捞、水产品采集等非生产性捕捞活动且具有安全保障的经营性渔业船舶。
                                    <br>休闲渔船旅游是新兴特色海洋旅游，是休闲渔业的重要组成部分
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-divider style="margin: 20px 0"/>
                        <el-text class="title" style="margin: 3% 45%">网站的休闲旅游有哪些种类？<br></el-text>
                        <el-row :gutter="12">
                            <el-col :span="12">
                                <el-card shadow="hover">
                                    <el-text class="title" style="margin: 3% 40%">捕鱼旅游<br></el-text>
                                    <el-card shadow="always">
                                        <el-text style="text-align: left">
                                            乘坐渔船体验渔民生活，参与捕鱼活动，捕到的海鲜都可以自己带走
                                        </el-text>
                                    </el-card>
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card shadow="hover">
                                    <el-text class="title" style="margin: 3% 40%">渔船观光<br></el-text>
                                    <el-card shadow="always">
                                        <el-text style="text-align: left">
                                            乘坐渔船进行观光活动，换个角度浏览城市景点
                                        </el-text>
                                    </el-card>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-divider style="margin: 20px 0"/>
                        <el-text class="title" style="margin: 3% 45%">为什么选择渔之旅<br></el-text>
                        <el-row :gutter="12">
                            <el-col :span="6">
                                <el-card shadow="hover" style="text-align: center">渔船和船主全部经过验证，安全有保障
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" style="text-align: center">人性化服务，满足你的需求</el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" style="text-align: center">渔船均配备足量救生圈</el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card shadow="hover" style="text-align: center">免费购买保险</el-card>
                            </el-col>
                        </el-row>
                        <el-divider style="margin: 20px 0"/>
                        <el-text class="title" style="margin: 3% 47%">取消规则<br></el-text>
                        <el-row :gutter="12">
                            <el-col :span="12">
                                <el-card shadow="hover" style="height: 100%">用户违约规则<br>
                                    <el-divider style="margin: 20px 0"></el-divider>
                                    预订成功后，因用户原因取消订单的，费用扣除标准如下：<br>
                                    使用日期前3天17:00之前（含）取消，扣除用户订单金额0%作为商家损失费<br>
                                    使用日期前1天17:00之前（含）取消，扣除用户订单金额10%作为商家损失费<br>
                                    使用日期前1天17:00之后取消，扣除用户订单金额50%作为商家损失费<br>
                                    如按上述约定比例扣除的必要的费用低于实际发生的费用，用户按照实际发生的费用支付，但不可超出订单总金额。<br>
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card shadow="hover">商家违约规则<br>
                                    <el-divider style="margin: 20px 0"></el-divider>
                                    预订成功后，因商家原因取消订单的，除全额退款外，还应向用户支付违约金（不可抗力除外），标准如下：<br>
                                    使用日期前3天17:00之前（含）取消，除全额退款外，还应向用户支付订单金额的0%作为用户损失费<br>
                                    使用日期前1天17:00之前（含）取消，除全额退款外，还应向用户支付订单金额的10%作为用户损失费<br>
                                    使用日期前1天17:00之后取消，除全额退款外，还应向用户支付订单金额的50%作为用户损失费<br>
                                    如按上述约定比例支付的违约金不足以赔偿用户的实际损失，商家应当按实际损失对用户予以赔偿。<br>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-divider style="margin: 20px 0"/>
                        <el-text class="title" style="margin: 3% 47%">Q&A<br></el-text>
                        <el-row>
                            <el-col :span="24">
                                <el-card shadow="hover">
                                    <el-text size="large">1. 碰到不适合的天气怎么办<br></el-text>
                                    <el-text size="default"> 答：我们会提前与你联系，确认出发时间与天气<br></el-text>
                                    <el-text size="large">2. 怎么退款<br></el-text>
                                    <el-text size="default">答：请电话联系我们，工作人员确认后即可退款，</el-text>
                                    <el-text size="default" type="info">注：仅开船前允许退款<br></el-text>
                                    <el-text size="large">3. 晕船怎么办<br></el-text>
                                    <el-text size="default">
                                        答：我们会尽量选择风浪小的时间开展旅游，船上也配有抗晕船药物<br></el-text>
                                    <el-text size="large">4. 怎么注册为船主<br></el-text>
                                    <el-text size="default"> 答：电话联系渔之旅<br></el-text>
                                    <el-text size="large">5. 我是地方政府，想合作，如何联系<br></el-text>
                                    <el-text size="default"> 答：电话联系渔之旅<br></el-text>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-divider style="margin: 20px 0"/>
                        <el-text class="title" style="margin: 3% 40%">休闲旅游相关政策<br></el-text>
                        <el-row :gutter="24">
                            <el-col :span="6" style="padding: 20px 20px">
                                <a href="http://www.moa.gov.cn/xw/bmdt/202007/t20200701_6347610.htm" target="_blank">
                                    <el-card shadow="hover" style="text-align: center;height: 100%">
                                        <el-text size="default" style="font-weight: bold;">
                                            农村农业部关于征求《休闲渔船管理办法（征求意见稿）》意见的函<br>
                                        </el-text>
                                    </el-card>
                                </a>
                            </el-col>
                            <el-col :span="6" style="padding: 20px 20px">
                                <a href="https://www.xm.gov.cn/zwgk/flfg/sfwj/201805/t20180523_1880709.htm"
                                   target="_blank">
                                    <el-card shadow="hover" style="text-align: center;height: 100%">
                                        <el-text size="default" style="font-weight: bold;">
                                            厦门市人民政府关于加强涉海旅游管理的意见<br>
                                        </el-text>
                                    </el-card>
                                </a>
                            </el-col>
                            <el-col :span="6" style="padding: 20px 20px">
                                <a href="https://baijiahao.baidu.com/s?id=1740920358523013661&wfr=spider&for=pc"
                                   target="_blank">
                                    <el-card shadow="hover" style="text-align: center;height: 100%">
                                        <el-text size="default" style="font-weight: bold;">
                                            海南省海洋休闲渔业捕捞许可管理规定公开征求意见<br>
                                        </el-text>
                                    </el-card>
                                </a>
                            </el-col>
                            <el-col :span="6" style="padding: 20px 20px">
                                <a href="http://zsoaf.zhoushan.gov.cn/art/2023/2/7/art_1229339245_1650477.html"
                                   target="_blank">
                                    <el-card shadow="hover" style="text-align: center;height: 100%">
                                        <el-text size="default" style="font-weight: bold;">
                                            舟山市休闲渔业船舶管理暂行规定<br>
                                        </el-text>
                                    </el-card>
                                </a>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="关于我们" name="fourth">
                        <el-row :gutter="12">
                            <el-col :span="12">
                                <el-text class="title" style="margin: 3% 40%">公司座右铭</el-text>
                            </el-col>
                            <el-col :span="12">
                                <el-text class="title" style="margin: 3% 40%">公司LOGO<br></el-text>
                            </el-col>
                        </el-row>
                        <el-row :gutter="12">
                            <el-col :span="12">
                                <el-card shadow="hover">
                                    <el-text style="text-align: center;margin: 0 30%">站在游客角度思考问题，一切以游客利益为准。<br>
                                    </el-text>
                                    <el-divider style="margin: 5px 0"></el-divider>
                                    <el-text class="title" style="margin: 3% 40%">公司实力<br></el-text>
                                    <el-row :gutter="12">
                                        <el-col :span="12">
                                            <el-card shadow="always" style="text-align: center"> 公司员工：500+</el-card>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-card shadow="always" style="text-align: center"> 与地方政府合作：10+
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="12" style="margin-top: 6%">
                                        <el-col :span="12">
                                            <el-card shadow="always" style="text-align: center"> 累计路线：20+</el-card>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-card shadow="always" style="text-align: center"> 累计加入船主：30+
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="12" style="margin-top: 5%">
                                        <el-col :span="12">
                                            <el-card shadow="always" style="text-align: center"> 累计订单：20+</el-card>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-card shadow="always" style="text-align: center"> 累计服务游客：100+
                                            </el-card>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-col>
                            <el-col :span="12">
                                <el-card shadow="hover" style="height: 100%">
                                    <el-row>
                                        <el-col :span="12">
                                            <el-image src="Image/ship.png" alt="1" fit="contain"
                                                      style="width: 100%; height: 100%"/>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-text>公司LOGO采用卡通动漫设计，左上角有一只海鸟，象征着渔之旅的事业蓬勃向上<br>
                                            </el-text>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-divider style="margin: 20px 0"/>
                        <el-text class="title" style="margin: 3% 40%">希望添加线路？或者是注册为船主？<br></el-text>
                        <el-col :span="24">
                            <el-card shadow="hover">
                                <el-text style="margin: 3% 40%">联系我们，加入渔之旅有以下福利</el-text>
                                <el-row :gutter="12">
                                    <el-col :span="6">
                                        <el-card shadow="always" style="text-align: center">免费加入</el-card>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-card shadow="always" style="text-align: center"> 免费购买保险</el-card>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-card shadow="always" style="text-align: center"> 渔之旅的资源分享</el-card>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-card shadow="always" style="text-align: center"> 船主高收益率</el-card>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                        <el-divider style="margin: 20px 0"/>
                        <el-text class="title" style="margin: 3% 45%">联系我们<br></el-text>
                        <el-row>
                            <el-col :span="24">
                                <el-card shadow="hover">
                                    <el-row :gutter="12">
                                        <el-col :span="12">
                                            <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
                                            </baidu-map>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-text size="default">公司联系电话：400-8820-8830<br></el-text>
                                            <el-text size="default">公司联系地址：广东省广州市黄埔区开发大街1号<br>
                                            </el-text>
                                            <el-text size="default">
                                                公司业务：休闲渔船租赁及观光服务；海钓服务；会务接待及策划。
                                            </el-text>
                                        </el-col>
                                    </el-row>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-divider style="margin: 20px 0"/>
                        <el-text class="title" style="margin: 10% 45%">关于我们<br></el-text>
                        <el-card shadow="hover">
                            <el-text size="default">
                                渔之旅于2023-07-07在广州市工商局注册成立，注册资金1000000（万元）
                                （依法须经批准的项目，经相关部门批准后方可开展经营），业务联系电话为400-8820-8830，
                                欢迎您前来参观指导<br>
                            </el-text>
                        </el-card>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
            <el-footer style="text-align: center">
                <div class="footer-div">
                    <span> 渔之旅所有2020-2036<br>京IC备2232333号<br>京公网安备234243432343</span>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {Search, Share} from "@element-plus/icons-vue"
import {BaiduMap} from "vue-baidu-map-3x";

const input3 = ref('')
const select = ref('')
const value = ref(5)
const activeName = ref('first')
const items = ref([{message: 'Foo'}, {message: 'Bar'}])
const photo_list = ref([{src: '/Image/Road/苍南线路.jpg', label: '一起来打卡，渔之旅新线路'},
    {src: '/Image/Road/重庆线路.jpg', label: '热门内河游'},
    {src: '/Image/Road/琼海潭门线路.jpg', label: '琼海潭门线路'},
    {src: '/Image/WebUse/banner1.png', label: '满怀热爱，奔赴山海'},
    {src: '/Image/WebUse/banner2.png', label: '春暖花开，出游正当时'}])
const center = ref({lng: 0, lat: 0});
const zoom = ref(3);

const handler = ({BMap, map}) => {
    console.log(BMap, map);
    center.value.lng = 113.442;
    center.value.lat = 23.108;
    zoom.value = 15;
}

function isLogin() {
    window.location.href = "user-login"
}

function result_search() {
    const inputValue = input3.value
    if (this.select === '') {
        localStorage.setItem("select", '1')
    } else {
        localStorage.setItem("select", this.select)
    }
    localStorage.setItem("search", inputValue)
    window.location.href = "search-result"
}

const activeIndex = ref('1')

</script>
<style scoped>
.mx-1 {
    float: left;
    font-weight: bold;
}

.title {
    font-size: 20px;
    margin: 20px 0;
}

.el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}

* {
    margin: 0;
    padding: 0;
}

.comment_area el-card {
    margin: 20px;
    display: flex;
    flex-direction: row;
}

.search {
    margin: 0 auto;
}

.el-footer {
    display: flex;
    height: 4vh;
    width: 100%;
    align-items: center;
    margin: 30px 40%;
}

.flex-grow {
    flex-grow: 1;
}

.item {
    margin-top: 10px;
    margin-right: 40px;
}

.map {
    width: 100%;
    height: 300px;
    border-radius: 5px;
}
</style>