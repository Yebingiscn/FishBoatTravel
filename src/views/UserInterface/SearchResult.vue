<template>
    <div class="search">
        <el-link href="/">返回主页</el-link>
        <el-input
                size="small"
                v-model="input3"
                placeholder="热门搜索：重庆"
                class="input-with-select"
                style="width: 50%; margin: 10px 20%"
        >
            <template #prepend>
                <el-button :icon="Search" @click="result_search()"/>
            </template>
            <template #append>
                <el-select v-model="select" placeholder="城市" style="width: 115px;">
                    <el-option label="城市" value="1"/>
                    <el-option label="路线" value="2"/>
                </el-select>
            </template>
        </el-input>
    </div>
    <el-text style="font-size: 20px">搜索结果</el-text>
    <el-divider style="margin: 20px 0"></el-divider>
    <el-empty v-if="JSON.stringify(roads)==='[]'" description="无数据" />
    <el-empty v-if="JSON.stringify(areas)==='[]'" description="无数据" />
    <div class="result">
        <el-row :gutter="24" v-if="this.select === '2'" v-for="(item, index) in roads" style="margin-bottom: 10px">
            <el-col :span="24">
                <el-card shadow="hover">
                    <el-text style="font-size: 20px;float: left">{{ item.road_name }}<br></el-text>
                    <el-text style="font-size: 20px; float: right" type="success">状态:{{ item.state }}<br></el-text>
                    <el-text type="info"><br><br>路线介绍:{{ item.road_indicate }}<br></el-text>
                    <el-text type="primary">线路类型:{{ item.type }}<br></el-text>
                    <el-text type="primary">船只类型:{{item.ship_type}}<br></el-text>
                    <el-text type="danger" style="font-size: 20px; float: right;"><br>超值价: {{item.fee}}元/人<br></el-text>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="24" v-if="this.select === '1'" v-for="(item, index) in areas" style="margin-bottom: 10px">
            <el-col :span="24">
                <el-card shadow="hover">
                    <el-text style="font-size: 20px;float: left">{{ item.area_name }}<br></el-text>
                    <el-text type="info"><br><br>区域介绍:{{ item.area_content }}<br></el-text>
                    <el-text type="primary">区域所属省份:{{ item.area_province }}<br></el-text>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>

<script>
import {Search} from "@element-plus/icons-vue";
import {ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
    name: "SearchResult",
    setup() {
        const select = ref('')
        const input3 = ref('')
        const roads = ref()
        const areas = ref()
        return {
            select,
            input3,
            roads,
            areas
        }
    },
    methods: {
        result_search: function () {
            localStorage.setItem("select",this.select)
            localStorage.setItem("search",this.input3)
            location.reload()
        }
    },
    computed: {
        Search() {
            return Search
        }
    },
    mounted() {
        this.select = localStorage.getItem("select")
        this.input3 = localStorage.getItem("search")
        console.log(this.select)
        console.log(this.input3)
        const that = this
        if (this.select === '2') {
            axios.get('http://localhost:8088/manage-road/search-road', {
                params: {
                    road_search: that.input3
                }
            }).then(function (response) {
                console.log(response.data)
                that.roads = response.data
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        } else if (this.select === '1'){
            axios.get('http://localhost:8088/manage-area/search-area', {
                params: {
                    area_name: that.input3
                }
            }).then(function (response) {
                console.log(response.data)
                that.areas = response.data
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
.search {
    margin: 0 auto;
}
</style>