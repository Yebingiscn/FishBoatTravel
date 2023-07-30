<template>
    <el-container>
        <el-header>
            <el-steps :space="200" :active="2" finish-status="success" style="margin: 20px 0 20px 30%">
                <el-step title="补充信息"/>
                <el-step title="填写订单信息"/>
                <el-step title="确认订单"/>
            </el-steps>
        </el-header>
        <el-main>
            <el-form
                    ref="ruleFormRef"
                    label-width="120px"
                    class="demo-ruleForm"
                    status-icon
                    :model="confirm_form"
                    style="width: 50%; margin: 0 auto"
            >
                <el-form-item label="用户名">
                    <el-input v-model="confirm_form.user_name" type="text" readonly/>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="confirm_form.mail" readonly/>
                </el-form-item>
                <el-form-item label="路线名">
                    <el-input v-model="confirm_form.road_name" readonly/>
                </el-form-item>
                <el-form-item label="出发日期">
                    <div class="demo-datetime-picker">
                        <div class="block">
                            <el-date-picker
                                    v-model="confirm_form.order_date"
                                    type="datetime"
                                    placeholder="Select date and time"
                                    readonly
                            />
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="总价">
                    <el-input v-model="confirm_form.sum_price" readonly/>
                </el-form-item>
                <el-form-item label="随行人">
                    <el-input v-model="confirm_form.friend_info" type="textarea" readonly/>
                </el-form-item>
                <el-form-item style="margin: 0 auto">
                    <el-button type="primary" @click="pay_dialogVisible = true">
                        去支付
                    </el-button>
                    <el-button type="danger" @click="dialogVisible = true">
                        取消
                    </el-button>
                </el-form-item>
            </el-form>
            <el-dialog
                    v-model="dialogVisible"
                    title="确定取消吗"
                    width="30%"
            >
                <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="dialogVisible = false">再想想</el-button>
                      <el-button type="primary" @click="dialogVisible = false; onCancel()">
                        确定取消
                      </el-button>
                    </span>
                </template>
            </el-dialog>
            <el-dialog
                    v-model="pay_dialogVisible"
                    title="请扫码支付"
                    width="30%"
            >
                <div class="my-4 flex items-center text-sm">
                    <el-radio-group v-model="radio3" class="ml-4">
                        <el-radio label="1" size="default">微信</el-radio>
                        <el-radio label="2" size="default">支付宝</el-radio>
                    </el-radio-group>
                    <el-image src="/Image/WebUse/微信二维码.png" v-if="radio3 === '1'"></el-image>
                    <el-image src="/Image/WebUse/支付宝二维码.png" v-if="radio3 === '2'"></el-image>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="pay_dialogVisible = false">取消</el-button>
                      <el-button :loading="loading" type="primary" @click="pay_dialogVisible = false; onSubmit()">
                        已支付
                      </el-button>
                    </span>
                </template>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>
import {defineComponent, ref} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";

export default defineComponent({
    name: "ConfirmOrder",
    setup() {
        const confirm_form = ref({
            mail: '',
            user_name: '',
            road_name: '',
            order_date: '',
            sum_price: '',
            friend_info: ''
        })
        const user_name = localStorage.getItem('user_name')
        const order_id = localStorage.getItem('order_id')
        const dialogVisible = ref(false)
        const pay_dialogVisible = ref(false)
        const loading = ref(false)
        const radio3 = ref('1')
        return {
            confirm_form,
            user_name,
            order_id,
            dialogVisible,
            pay_dialogVisible,
            radio3,
            loading
        }
    },
    methods: {
        onSubmit: function () {
            const that = this
            that.loading = true
            axios.get('http://localhost:8088/manage-order/pay-update', {
                params: {
                    order_id: that.order_id
                }
            }).then(function (response) {
                that.loading = false
                if (response.data === '更新成功') {
                    ElMessage({
                        message: '支付成功',
                        type: 'success',
                    })
                    localStorage.setItem("order_id", '')
                    window.location.href = ('person-index')
                }
            }).catch(function (error) {
                that.loading = false
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
        },
        onCancel: function () {
            const that = this
            axios.get('http://localhost:8088/manage-order/pay-cancel', {
                params: {
                    order_id: that.order_id
                }
            }).then(function (response) {
                if (response.data === '取消成功') {
                    ElMessage({
                        message: '取消成功',
                        type: 'success',
                    })
                    localStorage.setItem("order_id", '')
                    window.location.href = ('travel-list')
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
    mounted() {
        if (this.user_name === '' || this.user_name === null) {
            ElMessage.error('似乎还没有登录，请先登录')
            window.location.href = '403'
        } else {
            this.confirm_form.user_name = this.user_name
            console.log(this.confirm_form.user_name)
            const that = this
            axios.get('http://localhost:8088/manage-user/get-mail', {
                params: {
                    user_name: that.user_name
                }
            }).then(function (response) {
                that.confirm_form.mail = response.data
                axios.get('http://localhost:8088/manage-order/get-order', {
                    params: {
                        order_id: that.order_id
                    }
                }).then(function (response) {
                    const orders = response.data
                    that.confirm_form.road_name = orders[0].road_name,
                        that.confirm_form.order_date = orders[0].order_date,
                        that.confirm_form.sum_price = orders[0].sum_price,
                        that.confirm_form.friend_info = orders[0].friend_info
                    console.log(response.data.user_name)
                }).catch(function (error) {
                    console.log(error)
                    ElMessage({
                        message: error,
                        type: 'warning',
                    })
                })
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

</style>