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
                <el-text size="large">区域点亮图</el-text>
                <div>
                    <div id="map" :style="{ height:'500px', width: '100%' }"/>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import {defineComponent, ref} from "vue";
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import * as echarts from "echarts";
import 'echarts/map/js/china.js';
import {ElMessage} from "element-plus";
import axios from "axios";

export default defineComponent({
    name: "ShowArea",
    components: {Header, Aside},
    setup() {
        const admin_name = localStorage.getItem('admin_name')
        const map_info = ref([])
        return {
            admin_name,
            map_info
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
        }
        else {
            const that = this
            axios.get('http://localhost:8088/manage-area/show-area').then(function (response) {
                console.log(response.data)
                that.map_info = response.data
                that.init()
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        }

    },
    methods: {
        init() {
            // 基于准备好的dom，初始化echarts实例
            let chinaMap = echarts.init(document.getElementById("map"));
            window.onresize = chinaMap.resize; // 窗口或框架被调整大小时执行chinaMap.resize
            chinaMap.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: function (e) {
                        return e.value === "NaN" ? e.name + "：" + '0' : e.name + "：" + e.value + " <br/>" + "66c";
                    }
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                visualMap: {
                    min: 0,
                    max: 10000,
                    left: 10,
                    bottom: 10,
                    showLabel: !0,
                    text: ["高", "低"],
                    textStyle: {
                        color: '#000'
                    },
                    pieces: [{
                        gte: 1,
                        lt: 10,
                        label: "1 - 9",
                        color: "#ff8c71"
                    }, {
                        gt: 0,
                        lt: 1,
                        label: "1",
                        color: "#ffd768"
                    }, {
                        value: 0,
                        color: "#ffffff"
                    }],
                    show: !0
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                geo: {
                    map: "china",
                    roam: !1,
                    scaleLimit: {
                        min: 1,
                        max: 2
                    },
                    zoom: 1.23,
                    // top: 120,
                    label: {
                        normal: {
                            show: !0,
                            fontSize: "14",
                            color: "rgba(0,0,0,0.7)"
                        }
                    },
                    itemStyle: {
                        normal: {
                            //shadowBlur: 50,
                            //shadowColor: 'rgba(0, 0, 0, 0.2)',
                            borderColor: "rgba(0, 0, 0, 0.2)"
                        },
                        emphasis: {
                            areaColor: "#f2d5ad",
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            borderWidth: 0
                        }
                    }
                },
                series: [
                    {
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        geoIndex: 0,
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: this.map_info
                    }
                ]
            });
        }
    }
})
// SELECT SUBSTR(area.area_province, 1, 2 ) AS area_province,COUNT(DISTINCT area_province) AS area_count FROM area GROUP BY area_province
</script>

<style scoped>

</style>