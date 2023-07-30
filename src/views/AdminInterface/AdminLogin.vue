<template>
    <div>
        <div class="login"></div>
        <div class="login-form">
            <el-form :model="form" ref="loginForm" label-width="50px" class="demo-ruleForm">
                <div class="text-header">渔之旅后台管理系统登录</div>
                <el-form-item label="账号" prop="account"  :rules="{required:true,message:'此项必填'}">
                    <el-input type="text" v-model="form.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass"  :rules="{required:true,message:'此项必填'}">
                    <el-input type="password" v-model="form.pass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="pass_code"  :rules="{required:true,message:'此项必填'}">
                    <el-input type="text" v-model="form.pass_code" autocomplete="off"
                              placeholder="请输入下方的验证码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="text" autocomplete="off" v-model:model-value="form.check_code" readonly disabled/>
                    <el-button @click="generate_check_code" size="small" style="margin: 10px 0 0 0" type="primary">
                        更换验证码
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" size="default" @click="to_login">提交</el-button>
                    <el-button @click="resetForm()" size="default" type="warning">重置</el-button>
                </el-form-item>
                <!--        <div class="tips">账号：admin 密码：123456</div>-->
            </el-form>
        </div>
    </div>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {ElMessage} from 'element-plus';
import {useRouter} from "vue-router";
import axios from "axios";

export default defineComponent({
    setup() {
        const router = useRouter();
        const loginForm = ref(null);
        const form = reactive({
            account: '',
            pass: '',
            pass_code: '',
            check_code: 'crm009'
        });
        const submitForm = () => {
            console.log(form);
            if (form.account !== "admin" || form.pass !== "123456") {
                ElMessage('账号或密码错误');
                return;
            }
            localStorage.setItem('user', JSON.stringify(form));
            router.push('/');
        };
        const resetForm = () => {
            loginForm.value.resetFields();
        };
        return {
            form,
            submitForm,
            resetForm,
            loginForm
        };
    },
    methods: {
        to_login: function () {
            const admin_name = this.form.account
            if (this.form.check_code !== this.form.pass_code) {
                ElMessage.error('验证码错误，请重新输入')
                this.generate_check_code()
            } else {
                axios.post('http://localhost:8088/admin/to-login', {
                    user_name: this.form.account,
                    password: this.form.pass
                }).then(function (response) {
                    console.log(response.data)
                    if (response.data === '登录成功') {
                        ElMessage({
                            message: '登录成功',
                            type: 'success',
                        })
                        localStorage.setItem('admin_name', admin_name) //取的话就getItem
                        window.location.href = 'manage-index'
                    } else if (response.data === '你不是管理员') {
                        ElMessage.error('你不是管理员，请先开通管理员权限')
                        window.location.href = '403'
                    } else {
                        ElMessage.error(response.data)
                    }
                }).catch(function (error) {
                    console.log(error);
                    ElMessage({
                        message: error,
                        type: 'warning',
                    })
                });
            }
        },
        generate_check_code: function () {
            this.form.check_code = Math.random().toString(36).slice(-6);
        }
    },
    mounted: function () {
        this.generate_check_code()
    }
});
</script>

<style scoped lang="less">
.text-header {
  text-align: center;
  font-size: 20px;
  color: black;
  margin-bottom: 50px;
}

.login {
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/Image/WebUse/admin_login_bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px);
}

.login-form {
  background-color: #fff;
  position: absolute;
  width: 400px;
  height: 400px;
  top: 200px;
  right: 300px;
  border-radius: 10px;
  box-shadow: 1px 1px 5px #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style lang="less">
.login-form {
  .el-form-item__label {
    color: black;
  }
}
</style>
