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
                <el-text size="large"> 管理员列表<br></el-text>
                <el-button type="success" style="margin: 20px 0" @click="admin_dialogVisible = true;get_user_pub()">添加
                </el-button>
                <el-dialog
                        v-model:model-value="admin_dialogVisible"
                        title="添加管理员"
                        width="30%"
                >
                    <el-form :model="admin_form" label-width="120px">
                        <el-form-item label="用户列表">
                            <el-select v-model:model-value="admin_form.user_name" placeholder="请选择你要添加的管理员">
                                <el-option v-for="(user,index) in user_data"
                                           :key="index" :label="user.user_name"
                                           :value="user.user_name"
                                />
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                    <span class="dialog-footer">
                    <el-button @click="admin_dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="admin_dialogVisible = false;add_admin()">
                      确定
                    </el-button>
                    </span>
                    </template>
                </el-dialog>
                <el-table :data="table_data" style="width: 100%;border-radius: 5px"
                          :cell-style="{ textAlign: 'center' }"
                          :header-cell-style="{ 'text-align': 'center' }">
                    <el-table-column fixed prop="user_id" label="用户编号"/>
                    <el-table-column prop="user_name" label="管理员姓名"/>
                    <el-table-column prop="telephone" label="电话"/>
                    <el-table-column prop="mail" label="邮箱"/>
                    <el-table-column fixed="right" label="操作">
                        <template #default="scope">
                            <el-button type="danger" size="large" @click="del_admin(scope.row)">取消管理员身份
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
import {defineComponent, reactive, ref} from "vue"
import {provinceAndCityData} from 'element-china-area-data'
import Header from "@/components/Header.vue"
import Aside from "@/components/Aside.vue"
import {ElMessage} from "element-plus";
import axios from "axios";

export default defineComponent({
    name: "ManageAdmin",
    setup() {
        const admin_form = reactive({
            user_name: '',
        });
        const admin_name = localStorage.getItem('admin_name')
        const table_data = ref([])
        const user_data = ref([])
        const options = ref(provinceAndCityData)
        const admin_dialogVisible = ref(false)
        return {
            options,
            admin_dialogVisible,
            admin_form,
            admin_name,
            user_data,
            table_data
        }
    },
    data() {
        return {
            admin_name: this.admin_name
        }
    },
    components: {Header, Aside},
    methods: {
        handleChange(value) {
            console.log(value)
        },
        get_user_pub: function () {
            const that = this
            axios.get('http://localhost:8088/admin/show-user-pub').then(function (response) {
                console.log(response.data)
                that.user_data = response.data
                console.log(that.user_data)
                console.log(that.user_data.length)
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        },
        add_admin: function () {
            console.log(this.admin_form.user_name)
            const that = this
            axios.post('http://localhost:8088/admin/add-admin', {
                user_name: that.admin_form.user_name
            }).then(function (response) {
                console.log(response.data)
                if (response.data === '添加成功') {
                    ElMessage({
                        message: '添加成功',
                        type: 'success',
                    })
                    that.show_admin()
                } else {
                    ElMessage({
                        message: response.data,
                        type: 'warning',
                    })
                }
            }).catch(function (error) {
                console.log(error);
                ElMessage({
                    message: error,
                    type: 'error',
                })
            });
        },
        del_admin: function (row) {
            console.log(row.user_name)
            const that = this
            axios.post('http://localhost:8088/admin/del-admin', {
                user_name: row.user_name
            }).then(function (response) {
                console.log(response.data)
                if (response.data === '删除成功') {
                    ElMessage({
                        message: '取消管理员身份成功',
                        type: 'success',
                    })
                    that.show_admin()
                }
            }).catch(function (error) {
                console.log(error);
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            });
        },
        show_admin: function () {
            const that = this
            axios.get('http://localhost:8088/admin/show-admin').then(function (response) {
                console.log(response.data)
                that.table_data = response.data
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        },
    },
    mounted() {
        if (this.admin_name === null || this.admin_name === '') {
            ElMessage.error('似乎还没有登录，请先登录')
            window.location.href = '403'
        } else {
            const that = this
            axios.get('http://localhost:8088/admin/show-admin').then(function (response) {
                console.log(response.data)
                that.table_data = response.data
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