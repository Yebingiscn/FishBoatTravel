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
                <el-text size="large"> 用户管理<br></el-text>
                <el-input
                        v-model="user_search"
                        class="w-50 m-2"
                        placeholder="搜索用户"
                        :prefix-icon="Search"
                        style="width: 20%; margin: 20px"
                />
                <el-button type="primary" style="margin: 20px 0" @click="search">搜索</el-button>
                <el-table :data="tableData" style="width: 100%; border-radius: 5px"
                          :cell-style="{ textAlign: 'center' }"
                          :header-cell-style="{ 'text-align': 'center' }">
                    <el-table-column fixed prop="user_id" label="用户编号" width="100"/>
                    <el-table-column prop="user_name" label="用户名" width="120"/>
                    <el-table-column prop="user_img" label="用户头像" width="200">
                        <template #default="scope">
                            <img
                                    :src=scope.row.user_img
                                    class="image"
                                    alt=""/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sex" label="性别" width="120"/>
                    <el-table-column prop="age" label="年龄" width="120"/>
                    <el-table-column prop="telephone" label="电话" width="120"/>
                    <el-table-column prop="mail" label="邮箱" width="120"/>
                    <el-table-column prop="is_admin" label="是否管理员" width="120">
                        <template #default="scope">
                            <el-tag type="info" v-if="scope.row.is_admin === 0">普通用户</el-tag>
                            <el-tag type="success" v-else-if="scope.row.is_admin === 1">管理员</el-tag>
                            <el-tag type="danger" v-else-if="scope.row.is_admin === -1">已封禁</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template #default="scope">
                            <el-button v-if="scope.row.is_admin === 0" type="danger" size="default"
                                       @click="block_user(scope.row)">封禁
                            </el-button>
                            <el-button v-else-if="scope.row.is_admin === -1" type="warning" size="default"
                                       @click="unblock_user(scope.row)">解禁
                            </el-button>
                            <span v-if="scope.row.is_admin === 1">管理员请前往管理员页面操作</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination style="margin-top: 20px" background layout="prev, pager, next"
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
import {defineComponent, ref} from "vue";
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import {Search} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import axios from "axios";

export default defineComponent({
    name: "ManageUser",
    computed: {
        Search() {
            return Search
        }
    },
    setup() {
        const road_dialogVisible = ref(false)
        const user_search = ref('')
        const admin_name = localStorage.getItem('admin_name')
        const tableData = ref([])
        const pageNum = ref(1)
        const total = ref(10)
        const size = ref(3)
        return {
            user_search,
            road_dialogVisible,
            admin_name,
            tableData,
            pageNum,
            total,
            size
        }
    },
    methods: {
        search: function () {
            console.log(this.user_search)
            console.log(this.pageNum)
            console.log(this.total)
            const that = this
            axios.get('http://localhost:8088/manage-user/search-user', {
                params: {
                    user_name: that.user_search,
                    current_page: that.pageNum,
                    total_page: that.total
                }
            }).then(function (response) {
                console.log(response)
                that.total = response.data.total
                that.size = response.data.size
                that.tableData = response.data.records
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })

        },
        handleCurrentChange(pageNum) {
            this.pageNum = pageNum;
            this.get_all_user();
        },
        get_all_user() {
            const that = this
            console.log(that.pageNum)
            axios.get('http://localhost:8088/manage-user/get-all-user', {
                params: {
                    current_page: that.pageNum,
                    total_page: that.total
                }
            }).then(function (response) {
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
        },
        block_user: function (row) {
            const that = this
            console.log(row)
            axios.get('http://localhost:8088/manage-user/block-user', {
                params: {
                    user_name: row.user_name
                }
            }).then(function (response) {
                if (response.data === "操作成功") {
                    ElMessage({
                        message: "操作成功",
                        type: 'success',
                    })
                    that.get_all_user()
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
        unblock_user: function (row) {
            const that = this
            console.log(row)
            axios.get('http://localhost:8088/manage-user/unblock-user', {
                params: {
                    user_name: row.user_name
                }
            }).then(function (response) {
                if (response.data === "操作成功") {
                    ElMessage({
                        message: "操作成功",
                        type: 'success',
                    })
                    that.get_all_user()
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
        }
    },
    components: {Header, Aside},
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
            axios.get('http://localhost:8088/manage-user/get-all-user', {
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

<style scoped>
.image {
    width: 178px;
    height: 178px;
    display: block;
}
</style>