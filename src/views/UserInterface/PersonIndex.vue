<template>
    <el-container>
        <el-header>
            <user-header :user_name="user_name"></user-header>
            <el-text style="float: left; font-size: 20px">个人空间</el-text>
        </el-header>
        <el-main>
            <el-tabs class="demo-tabs" v-model="activeName">
                <el-tab-pane label="个人信息" name="first">
                    <el-text size="large">个人信息</el-text>
                    <el-form
                            ref="ruleFormRef"
                            label-width="120px"
                            class="demo-ruleForm"
                            status-icon
                            :model="info_form"
                            style="width: 50%; margin: 0 auto"
                    >
                        <el-form-item label="用户编号">
                            <el-input v-model="info_form.user_id" type="text" readonly/>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <el-input v-model="info_form.user_name" type="text" readonly/>
                        </el-form-item>
                        <el-form-item label="用户照片">
                            <img
                                    :src=info_form.user_img
                                    class="image"
                                    alt=""/>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="info_form.mail" readonly/>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <el-input v-model="info_form.age" readonly/>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-input v-model="info_form.sex" readonly/>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <el-input v-model="info_form.telephone" readonly/>
                        </el-form-item>
                        <el-form-item label="是否管理员">
                            <el-input v-model="info_form.is_admin" readonly/>
                        </el-form-item>
                        <el-form-item style="margin: 0 auto">
                            <el-button type="primary" @click="dialogVisible = true; showEditInfo()">
                                修改信息
                            </el-button>
                            <el-button type="danger" @click="pwd_dialogVisible = true">
                                修改密码
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <el-dialog
                            v-model="dialogVisible"
                            title="修改信息"
                            width="30%"
                    >
                        <el-form
                                ref="ruleFormRef"
                                label-width="120px"
                                class="demo-ruleForm"
                                status-icon
                                :model="edit_form"
                        >
                            <el-form-item label="用户姓名">
                                <el-input v-model="info_form.user_name" type="text" readonly/>
                            </el-form-item>
                            <el-form-item label="用户照片">
                                <el-upload
                                        class="avatar-uploader"
                                        action="http://localhost:8088/upload/user-image"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                >
                                    <el-image v-if="imageUrl" :src="imageUrl" class="avatar"/>
                                    <el-icon v-else class="avatar-uploader-icon">
                                        <Plus/>
                                    </el-icon>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="mail" :rules="[{required:true,message:'此项必填'},
                            {pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message:'请输入正确的邮箱'}]">
                                <el-input v-model="edit_form.mail"/>
                            </el-form-item>
                            <el-form-item label="年龄">
                                <el-input v-model="edit_form.age"/>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-radio-group v-model="edit_form.sex" class="ml-4">
                                    <el-radio label="男" size="default">男</el-radio>
                                    <el-radio label="女" size="default">女</el-radio>
                                    <el-radio label="其他" size="default">其他</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="联系电话" prop="telephone">
                                <el-input v-model="edit_form.telephone" :rules="[{required:true,message:'此项必填'},
                            {pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
                            ,message:'请输入正确的手机号'}]"/>
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                              <el-button @click="dialogVisible = false">取消</el-button>
                              <el-button type="primary" @click="dialogVisible = false; onUpdate()">
                                更新
                              </el-button>
                            </span>
                        </template>
                    </el-dialog>
                    <el-dialog
                            v-model="pwd_dialogVisible"
                            title="修改密码"
                            width="30%"
                    >
                        <el-form
                                ref="ruleFormRef"
                                label-width="120px"
                                class="demo-ruleForm"
                                status-icon
                                :model="change_pwd"
                        >
                            <el-form-item label="新密码">
                                <el-input type="password" v-model="change_pwd.old_pwd" show-password/>
                            </el-form-item>
                            <el-form-item label="再次确认新密码">
                                <el-input type="password" v-model="change_pwd.new_pwd" show-password/>
                            </el-form-item>
                        </el-form>
                        <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="pwd_dialogVisible = false">取消</el-button>
                      <el-button type="primary" @click="pwd_dialogVisible = false; onSubmit()">
                        修改
                      </el-button>
                    </span>
                        </template>
                    </el-dialog>
                </el-tab-pane>
                <el-tab-pane label="历史订单" name="second">
                    <el-text size="large">历史订单</el-text>
                    <el-empty v-if="JSON.stringify(orders)==='[]'" description="还没有订单哦，快去下单吧"/>
                    <div class="result">
                        <el-row :gutter="24" style="margin-bottom: 10px" v-for="(item) in orders">
                            <el-col :span="24">
                                <el-card shadow="hover">
                                    <el-text style="font-size: 20px;float: left">订单编号：{{ item.order_id }}<br>
                                    </el-text>
                                    <el-text style="font-size: 20px; float: right" type="success">
                                        状态:{{ item.order_state }}<br></el-text>
                                    <el-text type="info"><br><br>路线名：{{ item.road_name }}<br></el-text>
                                    <el-text type="primary">总价：{{ item.sum_price }}<br></el-text>
                                    <el-text type="primary">随行人信息：{{ item.friend_info }}<br></el-text>
                                    <el-text type="primary">分配的渔船：{{ item.ship }}<br></el-text>
                                    <el-button
                                            @click="onComment(item); comment_dialogVisible = true" size="large"
                                            style="float: left">评论
                                    </el-button>
                                    <!--                                    v-if="item.state === '已完成'"-->
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
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
                            <el-form-item label="评价">
                                <el-input type="textarea" v-model="comment_form.comment_content" show-password/>
                            </el-form-item>
                            <el-form-item label="评分">
                                <el-rate v-model="comment_form.rate"/>
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
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>

</template>

<script>
import {defineComponent, ref} from "vue";
import {ElMessage} from "element-plus";
import {Plus, Search} from "@element-plus/icons-vue";
import userHeader from "@/components/UserHeader.vue";
import axios from "axios";

export default defineComponent({
    name: "PersonIndex",
    components: {Plus, userHeader},
    computed: {
        Search() {
            return Search
        }
    },
    setup() {
        const activeName = ref('first')
        const user_name = localStorage.getItem('user_name')
        const dialogVisible = ref(false)
        const pwd_dialogVisible = ref(false)
        const comment_dialogVisible = ref(false)
        const imageUrl = ref('')
        const orders = ref()
        const info_form = ref({
            user_id: '',
            user_name: '',
            user_img: '',
            sex: '',
            age: '',
            telephone: '',
            mail: '',
            is_admin: ''
        })
        const edit_form = ref({
            sex: '',
            age: '',
            telephone: '',
            mail: ''
        })
        const change_pwd = ref({
            old_pwd: '',
            new_pwd: '',
        })
        const comment_form = ref({
            user_name: '',
            road_name: '',
            comment_content: '',
            rate: ''
        })
        return {
            user_name,
            activeName,
            dialogVisible,
            pwd_dialogVisible,
            info_form,
            edit_form,
            change_pwd,
            orders,
            comment_dialogVisible,
            comment_form,
            imageUrl
        }
    },
    methods: {
        showEditInfo: function () {
            this.edit_form.sex = this.info_form.sex
            this.edit_form.age = this.info_form.age
            this.edit_form.mail = this.info_form.mail
            this.edit_form.telephone = this.info_form.telephone
        },
        onUpdate: function () {
            const that = this
            axios.post('http://localhost:8088/manage-user/update-info', {
                user_id: that.info_form.user_id,
                user_img: that.info_form.user_img,
                sex: that.edit_form.sex,
                telephone: that.edit_form.telephone,
                age: that.edit_form.age,
                mail: that.edit_form.mail
            }).then(function (response) {
                if (response.data === '更新成功') {
                    ElMessage({
                        message: '更新成功',
                        type: 'success',
                    })
                    location.reload()
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
        onSubmit: function () {
            if (this.change_pwd.new_pwd !== this.change_pwd.old_pwd) {
                ElMessage.error('两次密码不统一，不能更新')
            } else {
                const that = this
                axios.post('http://localhost:8088/manage-user/update-pwd', {
                    user_id: that.info_form.user_id,
                    password: that.change_pwd.new_pwd
                }).then(function (response) {
                    if (response.data === '更新成功') {
                        ElMessage({
                            message: '更新成功，即将跳转到登录页面',
                            type: 'success',
                        })
                        localStorage.setItem("user_name", '')
                        window.location.href = ('user-login')
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
            }
        },
        onComment: function (item) {
            this.comment_form.user_name = item.user_name
            this.comment_form.road_name = item.road_name
        },
        toComment: function () {
            const that = this
            axios.post('http://localhost:8088/comment/add-comment', {
                user_name: that.comment_form.user_name,
                road_name: that.comment_form.road_name,
                comment_content: that.comment_form.comment_content,
                rate_score: that.comment_form.rate
            }).then(function (response) {
                if (response.data === '添加成功') {
                    ElMessage({
                        message: '评论成功',
                        type: 'success',
                    })
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
        handleAvatarSuccess: function (res) {
            console.log(res)
            this.imageUrl = res
            this.info_form.user_img = res
        }
    },
    mounted() {
        if (this.user_name === '' || this.user_name === null) {
            ElMessage.error('似乎还没有登录，请先登录')
            window.location.href = '403'
        } else {
            const that = this
            axios.get('http://localhost:8088/manage-user/get-user-info', {
                params: {
                    user_name: that.user_name
                }
            }).then(function (response) {
                console.log(response.data)
                const users = response.data
                that.info_form.user_id = users[0].user_id
                that.info_form.user_name = users[0].user_name
                that.info_form.user_img = users[0].user_img
                that.info_form.sex = users[0].sex
                that.info_form.age = users[0].age
                that.info_form.telephone = users[0].telephone
                that.info_form.mail = users[0].mail
                if (users[0].is_admin === 0) {
                    that.info_form.is_admin = '非管理员'
                } else {
                    that.info_form.is_admin = '管理员'
                }
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
            axios.get('http://localhost:8088/manage-order/get-order-user', {
                params: {
                    user_name: that.user_name
                }
            }).then(function (response) {
                console.log(response.data)
                that.orders = response.data
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
.demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.image {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>