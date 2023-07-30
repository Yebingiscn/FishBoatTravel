<template>
    <div class="login-container">
        <div class="login-card">
            <div class="title">
                <h1>欢迎来到渔之旅</h1>
            </div>
            <div class="content">
                <el-form ref="loginFormRef" :model="form">
                    <el-form-item prop="account" :rules="{required:true,message:'此项必填'}">
                        <el-input
                                placeholder="用户名"
                                type="text"
                                tabindex="1"
                                :prefix-icon="User"
                                size="large"
                                v-model="form.account"

                        />
                    </el-form-item>
                    <el-form-item prop="pass" :rules="{required:true,message:'此项必填'}">
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
                    <el-form-item prop="pass_code" :rules="{required:true,message:'此项必填'}">
                        <el-input
                                placeholder="验证码"
                                type="text"
                                tabindex="3"
                                maxlength="7"
                                size="large"
                                :prefix-icon="Key"
                                v-model="form.pass_code"
                        />
                        <el-input
                                class="check-code"
                                v-model:model-value="form.check_code"
                                type="text"
                                tabindex="3"
                                readonly
                                size="large"
                                disabled
                                style="margin: 5px 0 0 0"
                        />
                        <el-button :loading="loading" type="primary" size="default" @click.prevent="generate_check_code"
                                   style="width: 40%; margin: 0 0 0 20px">
                            切换验证码
                        </el-button>
                    </el-form-item>
                    <el-button :loading="loading" type="success" size="default" @click.prevent="to_login"
                               style="width: 40%; margin: 0 20px 0 20px"> 登 录
                    </el-button>
                    <el-button type="warning" size="default" native-type="reset" class="rest-bt"
                               style="width: 40%; margin: 0 0 0 20px"> 重置
                    </el-button>
                    <el-link type="primary" href="/user-sign">没账号？去注册</el-link>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import {defineComponent, reactive} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";
import {Key, User} from "@element-plus/icons-vue";

export default defineComponent({
    computed: {
        Key() {
            return Key
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
            check_code: 'crm009'
        });
        return {
            form,
        };
    },
    methods: {
        to_login: function () {
            const that = this
            if (this.form.check_code !== this.form.pass_code) {
                ElMessage.error('验证码错误，请重新输入')
                this.generate_check_code()
            } else {
                axios.post('http://localhost:8088/user/to-login', {
                    user_name: this.form.account,
                    password: this.form.pass
                }).then(function (response) {
                    console.log(response.data)
                    if (response.data === '登录成功') {
                        ElMessage({
                            message: '登录成功',
                            type: 'success',
                        })
                        localStorage.setItem('user_name', that.form.account) //取的话就getItem
                        window.location.href = 'travel-list'
                    } else if (response.data === '账户不存在，请先登录') {
                        ElMessage.error('账户不存在，请先登录')
                        window.location.href = 'user-sign'
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
