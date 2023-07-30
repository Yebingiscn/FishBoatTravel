<template>
    <el-container>
        <el-header>
            <el-steps :space="200" :active="1" finish-status="success" style="margin: 20px 0 20px 30%">
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
                    status-
                    :model="form"
            >
                <el-form-item label="姓名">
                    <el-input v-model="form.name" readonly/>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.mail" readonly/>
                </el-form-item>
                <el-form-item label="路线">
                    <el-input v-model="road_name" readonly/>
                </el-form-item>
                <el-form-item label="游玩时间" required>
                    <div class="demo-datetime-picker">
                        <div class="block">
                            <el-date-picker
                                    v-model="form.date"
                                    type="datetime"
                                    placeholder="Select date and time"
                            />
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="同行人数" prop="count">
                    <el-input-number v-model="form.num" :min="0" :max="15"/>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="form.num !== 0" type="primary" plain @click="dialogFormVisible = true">
                        点击我补充同行人员信息
                    </el-button>
                    <el-button v-if="form.num === 0" type="primary" plain disabled>点击我补充同行人员信息
                    </el-button>
                    <el-button type="primary" @click="cancel()">
                        取消预订
                    </el-button>
                    <el-button v-if="form.num !== 0" disabled type="primary" @click="onSubmit">
                        提交
                    </el-button>
                    <el-button v-if="form.num === 0" type="primary" @click="onSubmit">
                        提交
                    </el-button>
                </el-form-item>
                <el-text size="large">备注<br></el-text>
                <el-text size="default">具体时间视具体天气和渔船安排而定，具体时间会有工作人员联系进行二次确认<br>
                </el-text>
                <el-text size="default">如果由晕船等现象，可以及时联系船主</el-text>
                <el-dialog v-model="dialogFormVisible" title="添加同行人信息">
                    <el-form :model="form">
                        <el-form-item v-for="(index) in form.num" :key="index" :label="'第'+(index)+'个用户信息'"
                                      :label-width="formLabelWidth">
                            <el-input v-if="index===1" v-model.trim="friend_name[index-1]" autocomplete="off"
                                      placeholder="姓名"
                                      style="margin: 10px 0"/>
                            <el-input v-else-if="index === 2" v-model.trim="friend_name[index]" autocomplete="off"
                                      placeholder="姓名"
                                      style="margin: 10px 0"/>
                            <el-input v-else-if="index === 3" v-model.trim="friend_name[index+1]" autocomplete="off"
                                      placeholder="姓名"
                                      style="margin: 10px 0"/>
                            <el-input v-if="index===1" v-model="friend_name[index]" type="number" :min="0" :max="100"
                                      placeholder="年龄"/>
                            <el-input v-if="index===2" v-model="friend_name[index + 1]" type="number" :min="0"
                                      :max="100"
                                      placeholder="年龄"/>
                            <el-input v-if="index===3" v-model="friend_name[index + 2]" type="number" :min="0"
                                      :max="100"
                                      placeholder="年龄"/>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                          <span class="dialog-footer">
                            <el-button @click="dialogFormVisible = false; ">取消</el-button>
                            <el-button type="primary" @click="dialogFormVisible = false;updateWithFriend()">
                              确定
                            </el-button>
                          </span>
                    </template>
                </el-dialog>
            </el-form>
        </el-main>
    </el-container>
</template>


<script>
import {defineComponent, reactive, ref} from 'vue'
import {ElMessage} from "element-plus";
import axios from "axios";

export default defineComponent({
    setup() {
        const dialogFormVisible = ref(false)
        const formSize = ref('default')
        const formLabelWidth = ref('140px')
        const friend_name = ref([])
        const form = reactive({
            name: '',
            mail: '',
            date: '',
            num: 0,
            friend_info: ''
        })
        const sum_price = ref(1)
        const user_name = localStorage.getItem('user_name')
        const price = localStorage.getItem('price')
        const road_name = localStorage.getItem('road_name')
        return {
            dialogFormVisible,
            formSize,
            formLabelWidth,
            form,
            user_name,
            price,
            road_name,
            friend_name,
            sum_price
        }
    },
    methods: {
        onSubmit: function () {
            if (this.form.num !== 0) {
                ElMessage.error('请添加同行人信息')
            } else {
                const that = this
                this.sum_price = this.price
                axios.post('http://localhost:8088/manage-order/add-order', {
                    user_name: that.form.name,
                    mail: that.form.mail,
                    road_name: that.road_name,
                    sum_price: that.sum_price,
                    order_date: that.form.date,
                    friend_info: that.form.friend_info,
                    order_state: '未支付'
                }).then(function (response) {
                    console.log(response.data)
                    if (response.data > 0) {
                        ElMessage({
                            message: '添加成功',
                            type: 'success',
                        })
                        console.log(response.data)
                        localStorage.setItem("order_id", response.data)
                        window.location.href = ('confirm-info')
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
        cancel: function () {
            window.location.href = ('travel-list')
        },
        updateWithFriend: function () {
            this.form.friend_info = ''
            for (let i = 0; i < this.form.num * 2; i++) {
                console.log(this.friend_name[i])
                if (i % 2 !== 0) {
                    this.form.friend_info += this.friend_name[i] + ';'
                } else {
                    this.form.friend_info += this.friend_name[i] + ':'
                }
            }
            console.log(this.form.friend_info)
            const that = this
            this.sum_price = this.form.num * this.price
            console.log(this.sum_price)
            axios.post('http://localhost:8088/manage-order/add-order', {
                user_name: that.form.name,
                mail: that.form.mail,
                road_name: that.road_name,
                sum_price: that.sum_price,
                order_date: that.form.date,
                friend_info: that.form.friend_info,
                order_state: '未支付'
            }).then(function (response) {
                console.log(response.data)
                if (response.data > 0) {
                    ElMessage({
                        message: '添加成功',
                        type: 'success',
                    })
                    localStorage.setItem("order_id", response.data)
                    window.location.href = ('confirm-info')
                } else {
                    ElMessage.error('添加失败')
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
            console.log(this.sum_price)
            this.form.name = this.user_name
            // get and mail
            const that = this
            axios.get('http://localhost:8088/manage-user/get-mail', {
                params: {
                    user_name: that.user_name
                }
            }).then(function (response) {
                that.form.mail = response.data
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
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>