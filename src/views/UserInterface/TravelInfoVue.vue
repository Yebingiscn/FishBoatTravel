<template>
    <el-container>
        <el-header>
            <user-header :user_name="user_name"></user-header>
            <el-text style="font-size: 20px; margin: 40% 40% 0; text-align: center">订单详情页</el-text>
            <el-link href="/travel-list" style="float: left; margin: 5px 0">⬅返回主页</el-link>
        </el-header>
        <el-main>
            <el-text style="font-size: 20px">{{ road_name }}</el-text>
            <el-row :gutter="24" style="margin: 3% 0" v-model="roads" v-for="(item) in roads">
                <el-col :span="24">
                    <el-card shadow="hover">
                        <img
                                :src=item.road_image
                                class="image"
                                alt=""/>
                        <el-text style="font-size: 20px;float: left">{{ item.road_name }}<br></el-text>
                        <el-text style="font-size: 20px; float: right" type="success">状态:{{ item.state }}<br>
                        </el-text>
                        <el-text type="info"><br><br>路线介绍:{{ item.road_indicate }}<br></el-text>
                        <el-text type="primary">线路类型:{{ item.type }}<br></el-text>
                        <el-text type="primary">船只类型:{{ item.ship_type }}<br></el-text>
                        <el-text type="danger" style="font-size: 20px; float: right;"><br>超值价: {{ item.fee }}
                            元/人<br></el-text>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-text size="large" style="font-size: 20px;float: left">出游情况</el-text>
                </el-col>
            </el-row>
            <!--            https://wis.qq.com/weather/common?province=%E5%B9%BF%E4%B8%9C%E7%9C%81&city=%E6%B9%9B%E6%B1%9F%E5%B8%82&source=pc&weather_type=forecast_24h-->
            <el-row :gutter="24" style="margin: 3% 0">
                <el-col :span="8">
                    <el-card shadow="hover">
                        <el-tag type="success" style="font-size: 15px;float: left">正常出游<br></el-tag>
                        <el-text style="float: right;margin-left: 3%">{{ today }}</el-text>
                        <el-text type="info"><br><br>可以接受预订<br></el-text>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        <el-tag type="success" style="font-size: 15px;float: left">正常出游<br></el-tag>
                        <el-text style="float: right;margin-left: 3%">{{ today_d1 }}</el-text>
                        <el-text type="info"><br><br>可以接受预订<br></el-text>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        <el-tag type="success" style="font-size: 15px;float: left">正常出游<br></el-tag>
                        <el-text style="float: right;margin-left: 3%">{{ today_d2 }}</el-text>
                        <el-text type="info"><br><br>可以接受预订<br></el-text>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="24" style="margin: 3% 0">
                <el-col :span="24">
                    <el-text size="large" style="font-size: 20px;float: left">线路地图</el-text>
                </el-col>
            </el-row>
            <baidu-map class="map"
                       :center="map.center"
                       :zoom="map.zoom"
                       :scroll-wheel-zoom="map.scroll">
                <bm-polyline v-for="(item,key) of towerLines" :key="key" :path="item" stroke-color="red"
                             :stroke-opacity="1" :stroke-weight="3">
                </bm-polyline>
            </baidu-map>
            <el-text class="title" style="font-size: 20px">说明<br></el-text>
            <el-col :span="24">
                <el-card shadow="hover">
                    <el-row :gutter="12">
                        <el-col :span="12">
                            <el-text style="margin: 3% 40%; font-size: 15px">费用说明</el-text>
                        </el-col>
                        <el-col :span="12">
                            <el-text style="margin: 3% 40%; font-size: 15px">其他说明</el-text>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-card shadow="always" style="text-align: left;height: 100%">
                                此为包一艘渔船出海的价格，游玩2个小时
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card shadow="always" style="text-align: left; height: 100%">
                                费用不含<br>
                                1.到达景区的交通费，餐费，包船外的其他自费；
                                2.一切个人消费及费用包含中未提及的任何费用。
                            </el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card shadow="always" style="text-align: left; height: 100%">
                                出海游玩的时间为2小时，如乘客晕船，可提前返程，但费用不退哦
                                包船出海建议提前1天以上预定。<br>
                                3岁以下70岁以上、孕妇，以及高血压、心脏病等疾病患者不建议游玩
                                如遇恶劣天气或船舶故障等导致无法出海游玩的，全额退款。<br></el-card>
                        </el-col>
                        <el-col :span="6">
                            <el-card shadow="always" style="text-align: left; height: 100%">
                                预定后我方工作人员会电话联系，约定游玩时间及登船地点。
                            </el-card>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-row :gutter="24" style="margin: 3% 0">
                <el-col :span="24">
                    <el-text size="large" style="font-size: 20px;float: left">评论区</el-text>
                </el-col>
            </el-row>
            <el-empty v-if="JSON.stringify(comments)==='[]'" description="暂时还没有评论哦"/>
            <el-row :gutter="24" style="margin: 3% 0" v-for="(item) in comments">
                <el-col :span="24">
                    <el-card>
                        <el-tag style="font-size: 15px;float: left">{{ item.comment_id }}<br></el-tag>
                        <el-text style="font-size: 20px;float: left">{{ item.user_name }}<br></el-text>
                        <el-text style="float: right;margin-left: 3%">{{ item.rate_time }}</el-text>
                        <el-text type="info"><br><br>评论内容: {{ item.comment_content }}<br></el-text>
                        <el-rate
                                v-model="item.rate_score"
                                disabled
                                show-score
                        />
                        <el-button style="float: right" type="success"
                                   @click="comment_dialogVisible = true; showComment(item)"
                                   size="large">评论TA
                        </el-button>
                        <el-button style="float: right; margin-right: 1%" type="danger"
                                   @click="show_comment_dialogVisible = true; getComment(item)" size="large">
                            查看关于TA的评论
                        </el-button>
                    </el-card>
                </el-col>
            </el-row>
            <el-dialog
                    v-model="show_comment_dialogVisible"
                    title="评价"
                    width="30%"
            >
                <el-empty v-if="JSON.stringify(s_comments)==='[]'" description="暂时还没有评论哦"/>
                <el-row :gutter="24" style="margin-bottom: 2%" v-for="(item) in s_comments">
                    <el-col :span="24">
                        <el-card>
                            <el-text style="font-size: 15px;float: left">{{ item.user_name }}<br></el-text>
                            <el-text style="float: right;margin-left: 3%">{{ item.comment_time }}</el-text>
                            <el-text type="info"><br>评论内容: {{ item.scomment_content }}<br></el-text>
                        </el-card>
                    </el-col>
                </el-row>
                <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="show_comment_dialogVisible = false">取消</el-button>
                    </span>
                </template>
            </el-dialog>
            <el-dialog
                    v-model="comment_dialogVisible"
                    title="评价"
                    width="30%"
            >
                <el-form
                        ref="ruleFormRef"
                        label-width="120px"
                        class="demo-ruleForm"
                        status-icon
                        :model="comment_form"
                >
                    <el-form-item label="原评论">
                        <el-text type="info">{{comment_form.user_name}}：</el-text>
                        <el-text type="info">{{comment_form.comment_original}}</el-text>
                    </el-form-item>
                    <el-form-item label="评价">
                        <el-input type="textarea" v-model="comment_form.comment_content"/>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="comment_dialogVisible = false">取消</el-button>
                      <el-button type="primary" @click="comment_dialogVisible = false; toComment()">
                        提交
                      </el-button>
                    </span>
                </template>
            </el-dialog>
        </el-main>
        <el-footer>
            <el-button type="success" style="margin: 0 auto; width: 100%" @click="toOrder">订购</el-button>
        </el-footer>
    </el-container>
</template>

<script>
import {BaiduMap, BmMarker, BmPolyline} from "vue-baidu-map-3x";
import {defineComponent, ref} from "vue";
import {ElMessage} from "element-plus";
import UserHeader from "@/components/UserHeader.vue";
import axios from "axios";

export default defineComponent({
    name: "TravelInfoVue",
    components: {UserHeader, BmMarker, BmPolyline, BaiduMap},
    setup() {
        const user_name = localStorage.getItem('user_name')
        const road_name = localStorage.getItem('road_name')
        const roads = ref()
        const comments = ref()
        const s_comments = ref()
        const comment_dialogVisible = ref(false)
        const show_comment_dialogVisible = ref(false)
        const today = new Date().getFullYear()+ '-' + (new Date().getMonth()+1)+'-'+new Date().getDate()
        const today_d1 = new Date().getFullYear()+ '-' + (new Date().getMonth()+1)+'-'+(new Date().getDate()+1)
        const today_d2 = new Date().getFullYear()+ '-' + (new Date().getMonth()+1)+'-'+(new Date().getDate()+2)
        const comment_form = ref({
            comment_id: '',
            user_name: '',
            comment_time: '',
            comment_content: '',
            comment_original: '',
        })
        const towerLines = ref([[
            {lng: '', lat: ''},
            {lng: '', lat: ''},
            {lng: '', lat: ''}
        ]])
        return {
            roads,
            towerLines,
            user_name,
            road_name,
            comment_dialogVisible,
            show_comment_dialogVisible,
            comment_form,
            comments,
            s_comments,
            today,
            today_d1,
            today_d2
        }
    },
    methods: {
        toOrder: function () {
            console.log(this.roads[0].fee)
            localStorage.setItem("price", this.roads[0].fee)
            window.location.href = ('add-info')
        },
        toComment: function () {
            const that = this
            axios.post('http://localhost:8088/sec-comment/add-comment', {
                comment_id: this.comment_form.comment_id,
                user_name: this.user_name,
                SComment_content: this.comment_form.comment_content
            }).then(function (response) {
                console.log(response.data)
                if (response.data === '添加成功') {
                    ElMessage({
                        message: '评论成功',
                        type: 'success',
                    })
                    that.s_comments = response.data
                } else {
                    ElMessage({
                        message: response.data,
                        type: 'success',
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
        showComment(item) {
            this.comment_form.comment_id = item.comment_id
            this.comment_form.user_name = item.user_name
            this.comment_form.comment_original = item.comment_content
        },
        getComment(item) {
            const that = this
            console.log(item.comment_id)
            axios.get('http://localhost:8088/sec-comment/get-comment', {
                params: {
                    comment_id: item.comment_id
                }
            }).then(function (response) {
                console.log(response.data)
                that.s_comments = response.data
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        }
    },
    mounted() {
        if (this.user_name === '' || this.user_name === null) {
            ElMessage.error('似乎还没有登录，请先登录')
            window.location.href = '403'
        } else {
            const that = this
            axios.get('http://localhost:8088/manage-road/search-road', {
                params: {
                    road_search: that.road_name
                }
            }).then(function (response) {
                    console.log(response.data)
                    that.roads = response.data
                    that.towerLines[0][0].lat = that.roads[0].location_1x
                    that.towerLines[0][0].lng = that.roads[0].location_1y
                    that.towerLines[0][1].lat = that.roads[0].location_2x
                    that.towerLines[0][1].lng = that.roads[0].location_2y
                    that.towerLines[0][2].lat = that.roads[0].location_3x
                    that.towerLines[0][2].lng = that.roads[0].location_3y
                    console.log(that.towerLines)
                    that.map.center.lng = that.roads[0].location_1y
                    that.map.center.lat = that.roads[0].location_1x
                    console.log(that.map)
                }
            ).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
            axios.get('http://localhost:8088/comment/get-comment', {
                params: {
                    road_name: that.road_name
                }
            }).then(function (response) {
                console.log(response.data)
                that.comments = response.data
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        }
    },
    data() {
        return {
            map: {
                center: {lng: 112.127671, lat: 32.015287},//'襄阳市',地图的中心点坐标
                zoom: 15,//1-18，数值越大离地面越近，地图实际面积越小
                scroll: false //支持滚动鼠标缩放
            },
            towerLines: [],
            towers: []
        }
    },
    props: ['deviceInfo', 'towerlineInfo'],
})
</script>

<style scoped>
.map {
    margin: 0 auto;
    width: 80%;
    height: 50%;
}

.image {
    height: 50%;
    width: 100%;
    display: flex;
}
</style>