<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <user-header :user_name="user_name"></user-header>
                <el-text style="font-size: 20px">旅游列表</el-text>
            </el-header>
            <el-main>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-card style="text-align: center; " class="banner" :shadow="'hover'">
                            <el-text style="color: white; font-size: 20px">
                                旅游路线
                            </el-text>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="24" style="margin-top: 5%">
                    <el-col :span="12">
                        <el-card :shadow="'hover'" :model="road_form">
                            <el-form label-width="120px" style="float: left">
                                <el-form-item label="线路列表" style="float: left;height: 80px">
                                    <el-select v-model:model-value="road_form.area_name" placeholder="请选择城市"
                                               @change="getAreaInfo" style="float:left; margin: 6% 5%">
                                        <el-option v-for="(city,index) in cityData"
                                                   :key="index" :label="city.area_name"
                                                   :value="city.area_name"
                                        />
                                    </el-select>
                                </el-form-item>
                                <el-button type="primary" @click="showCityRoad" style="float: left">确定
                                </el-button>
                                <el-button type="primary" @click="showAllRoad" style="float: right; margin-left: 10px">
                                    查看全部路线
                                </el-button>
                            </el-form>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card :shadow="'hover'">
                            <el-text style="font-size: 15px; float: left">搜索</el-text>
                            <el-input
                                    v-model="road_search"
                                    class="w-50 m-2"
                                    placeholder="搜索路线"
                                    :prefix-icon="Search"
                                    style="width: 50%; float: left; margin: 6% 5%"
                            />
                            <el-button type="primary" style="float: right" @click="search">搜索<br></el-button>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="24" style="margin: 2% 0 0 0">
                    <el-col :span="24">
                        <el-card v-if="road_form.area_name!== ''" v-model="areaInfo">
                            <el-text style="font-size: 20px;float: left">城市名：{{ areaInfo.area_name }}<br></el-text>
                            <el-tag style="font-size: 20px; float: right" type="success">{{areaInfo.area_province }}<br></el-tag>
                            <el-text type="info"><br><br>区域介绍:{{ areaInfo.area_content }}<br></el-text>
                        </el-card>
                    </el-col>
                </el-row>
                <el-empty v-if="JSON.stringify(roads)==='[]'" description="没有找到符合条件的线路哦"/>
                <el-row :gutter="24" style="margin-bottom: 10px; margin-top: 10px">
                    <el-col :span="8" v-for="(item) in roads">
                        <el-card :shadow="'hover'" style="margin: 10px 0">
                            <img
                                    :src=item.road_image
                                    class="image"
                                    alt=""/>
                            <div style="padding: 14px">
                                <el-text size="large">{{ item.road_name }}<br></el-text>
                                <el-tag size="default" type="success" v-if="item.type === '捕鱼旅游'">
                                    {{ item.type }}
                                </el-tag>
                                <el-tag size="default" type="danger" v-if="item.type === '渔船观光'">
                                    {{ item.type }}
                                </el-tag>
                                <el-tag size="default" type="warning" style="margin-left: 3%"
                                        v-if="item.ship_type === '小船'">&nbsp;
                                    {{ item.ship_type }}
                                </el-tag>
                                <el-tag size="default" type="danger" style="margin-left: 3%"
                                        v-if="item.ship_type === '大船'">&nbsp;
                                    {{ item.ship_type }}
                                </el-tag>
                                <div class="bottom">
                                    <el-text size="default" type="danger">超值价：{{ item.fee }}元/人</el-text>
                                    <el-button v-if="item.state === '正常'" type="danger" style="width: 30%;"
                                               class="button" @click="toOrder(item)">订购
                                    </el-button>
                                    <el-button v-if="item.state === '已下线'" type="info" style="width: 30%;"
                                               class="button" disabled>已下线
                                    </el-button>

                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-pagination background layout="prev, pager, next" style="margin: 0 auto"
                               :total=this.total
                               :current-page=this.pageNum
                               :page-size=this.size
                               @current-change="handleCurrentChange"
                />
            </el-main>
        </el-container>
    </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import UserHeader from "@/components/UserHeader.vue";
import {ElMessage} from "element-plus";
import {Search} from "@element-plus/icons-vue";
import axios from "axios";

export default defineComponent({
    name: "TravelList",
    computed: {
        Search() {
            return Search
        }
    },
    setup() {
        const user_name = localStorage.getItem('user_name')
        const road_search = ref('')
        const pageNum = ref(1)
        const total = ref(10)
        const size = ref(3)
        const cityData = ref([])
        const roads = ref()
        const areaInfo = ref()
        const road_form = ref({
            area_name: '',
            area_province: ''
        })
        return {
            user_name,
            pageNum,
            total,
            size,
            road_search,
            road_form,
            cityData,
            roads,
            areaInfo
        }
    },
    data() {
        return {
            user_name: this.user_name
        }
    },
    methods: {
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum
            const that = this
            axios.get('http://localhost:8088/manage-road/get-all-road', {
                params: {
                    current_page: that.pageNum,
                    total_page: that.total
                }
            }).then(function (response) {
                console.log(response.data)
                that.roads = response.data.records
                that.total = response.data.total
                that.size = response.data.size
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        },
        showAllRoad: function () {
            this.road_form.area_province = ''
            this.road_form.area_name = ''
            this.road_search = ''
            const that = this
            axios.get('http://localhost:8088/manage-road/get-all-road', {
                params: {
                    current_page: that.pageNum,
                    total_page: that.total
                }
            }).then(function (response) {
                console.log(response.data)
                that.roads = response.data.records
                that.total = response.data.total
                that.size = response.data.size
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        },
        showCityRoad: function () {
            const that = this
            axios.get('http://localhost:8088/manage-road/get-road-area', {
                params: {
                    current_page: that.pageNum,
                    total_page: that.total,
                    road_search: that.road_form.area_name
                }
            }).then(function (response) {
                console.log(response.data)
                that.roads = response.data.records
                that.total = response.data.total
                that.size = response.data.size
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
            axios.get('http://localhost:8088/manage-area/search-area', {
                params: {
                    area_name: that.road_form.area_name
                }
            }).then(function (response) {
                console.log(response.data)
                const areas = response.data
                that.areaInfo = areas[0]
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        },
        search: function () {
            const that = this
            axios.get('http://localhost:8088/manage-road/search', {
                params: {
                    current_page: that.pageNum,
                    total_page: that.total,
                    road_search: that.road_search
                }
            }).then(function (response) {
                console.log(response.data)
                that.roads = response.data.records
                that.total = response.data.total
                that.size = response.data.size
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        },
        toOrder: function (item) {
            localStorage.setItem("road_name", item.road_name)
            window.location.href = ('travel-info')
        }
    },
    components: {UserHeader},
    mounted() {
        if (this.user_name === '' || this.user_name === null) {
            ElMessage.error('似乎还没有登录，请先登录')
            window.location.href = '403'
        } else {
            const that = this
            axios.get('http://localhost:8088/manage-area/get-area-province').then(function (response) {
                console.log(response.data)
                that.cityData = response.data
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
            axios.get('http://localhost:8088/manage-road/get-all-road', {
                params: {
                    current_page: that.pageNum,
                    total_page: that.total
                }
            }).then(function (response) {
                console.log(response.data)
                that.roads = response.data.records
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
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    height: 300px;
    width: 100%;
    display: flex;
}

.banner {
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    background-image: url('../../assets/Image/Road/苍南线路.jpg');
}
</style>