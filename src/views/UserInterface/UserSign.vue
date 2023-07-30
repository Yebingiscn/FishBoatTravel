<template>
    <div class="login-container">
        <div class="login-card">
            <div class="title">
                <h1>欢迎加入渔之旅</h1>
            </div>
            <div class="content">
                <el-form ref="loginFormRef" :model="form">
                    <el-form-item prop="username">
                        <el-input
                                placeholder="用户名"
                                type="text"
                                tabindex="1"
                                :prefix-icon="User"
                                size="large"
                                v-model="form.account"
                        />
                    </el-form-item>
                    <el-form-item prop="mail"
                                  :rules="[{required:true,message:'此项必填'},
                                  {pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,message:'请输入正确的邮箱'}]"
                    >
                    <el-input
                            placeholder="邮箱"
                            type="email"
                            tabindex="1"
                            :prefix-icon="Message"
                            size="large"
                            v-model="form.mail"
                    />
                    <el-input
                            placeholder="验证码"
                            type="number"
                            tabindex="3"
                            maxlength="7"
                            size="large"
                            :prefix-icon="Key"
                            v-model="form.mail_pass_code"
                            style="margin: 10px 20px 0 0; width: 50%"
                    />
                    <el-button :loading="loading" type="primary" size="default" @click.prevent="getMailCode"
                               style="width: 40%;">
                        获取邮箱验证码
                    </el-button>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                placeholder="密码"
                                type="password"
                                tabindex="2"
                                :prefix-icon="Key"
                                size="large"
                                show-password
                                v-model="form.pass"
                        />
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input
                                placeholder="请输入下方验证码"
                                type="text"
                                tabindex="3"
                                maxlength="7"
                                size="large"
                                :prefix-icon="Key"
                                v-model="form.pass_code"
                        />
                        <el-input
                                class="check-code"
                                placeholder="4829"
                                v-model:model-value="form.check_code"
                                type="text"
                                tabindex="3"
                                readonly
                                size="large"
                                disabled
                                style="margin: 5px 0 0 0; width: 50%"
                        />
                        <el-button :loading="loading" type="primary" size="default" @click.prevent="generate_check_code"
                                   style="width: 40%; margin: 0 0 0 20px">
                            切换验证码
                        </el-button>
                    </el-form-item>
                    <el-button :loading="loading" type="success" size="default" @click.prevent="to_sign"
                               style="width: 40%; margin: 0 20px 0 20px"> 注册
                    </el-button>
                    <el-button type="warning" size="default" native-type="reset" class="rest-bt"
                               style="width: 40%; margin: 0 0 0 20px"> 重置
                    </el-button>
                    <el-link type="primary" href="/user-login">已经有账号了？去登陆</el-link>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import {defineComponent, reactive, ref} from "vue";
import {User, Message, Key} from "@element-plus/icons-vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default defineComponent({
    computed: {
        Key() {
            return Key
        },
        Message() {
            return Message
        },
        User() {
            return User
        }
    },
    setup() {
        const form = reactive({
            account: '',
            pass: '',
            pass_code: '',
            mail: '',
            mail_pass_code: '',
            check_code: 'crm009'
        });
        const loading = ref(false)
        return {
            form,
            loading
        };
    },
    methods: {
        generate_check_code: function () {
            this.form.check_code = Math.random().toString(36).slice(-6);
        },
        getMailCode: function () {
            this.loading = true
            const that = this
            console.log(this.form.mail)
            axios.get('http://localhost:8088/user/get-mail-code', {
                params: {
                    mail: that.form.mail
                }
            }).then(function (response) {
                console.log(response.data)
                that.loading = false
                if (response.data === '验证码已发送') {
                    ElMessage({
                        message: '验证码已发送，请查看邮箱.',
                        type: 'success',
                    })
                } else {
                    ElMessage({
                        message: response.data,
                        type: 'error',
                    })
                }
            }).catch(function (error) {
                that.loading = false
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'error',
                })
            });
        },
        to_sign: function () {
            if (this.form.check_code !== this.form.pass_code) {
                ElMessage.error('验证码错误，请重新输入')
                this.generate_check_code()
            } else {
                axios.post('http://localhost:8088/user/to-sign', {
                    user_name: this.form.account,
                    password: this.form.pass,
                    mail: this.form.mail,
                    mail_code: this.form.mail_pass_code
                }).then(function (response) {
                    console.log(response.data)
                    if (response.data === '注册成功') {
                        ElMessage({
                            message: '注册成功',
                            type: 'success',
                        })
                        window.location.href = 'user-login'
                    } else {
                        ElMessage({
                            message: response.data,
                            type: 'error',
                        })
                    }
                }).catch(function (error) {
                    console.log(error);
                    ElMessage({
                        message: error,
                        type: 'warning',
                    })
                });
            }
        }
    },
    mounted: function () {
        this.generate_check_code()
    }
})

</script>

<style lang="scss" scoped>
.login-container {
  background: url('../../assets/Image/WebUse/true.png') no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background-size: cover;

  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }

  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;

      img {
        height: 100%;
      }

      color: #181818;
    }

    .content {
      padding: 20px 50px 50px 50px;

      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;

        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }

      .el-button {
        width: 100%;
        margin-top: 10px;
      }

      .rest-bt {
        width: 100%;
        margin-top: 10px;
        margin-left: auto;
      }

      .check-code {
        width: 100px;
        height: 40px;
        border-left: 0;
        user-select: none;
        cursor: pointer;
        text-align: center;
      }
    }
  }
}
</style>
