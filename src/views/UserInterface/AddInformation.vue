<template>
    <el-container>
        <el-header>
            <el-steps :space="200" :active="0" finish-status="success" style="margin: 20px 0 20px 30%">
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
                :model="add_form"
                style="width: 50%; margin: 0 auto"
            >
                <el-form-item label="联系电话" prop="telephone" :rules="[{required:true,message:'此项必填'},
                            {pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
                            ,message:'请输入正确的手机号'}]">
                    <el-input v-model="add_form.telephone"/>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="add_form.age" type="number" :min="0" :max="100"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">
                        提交
                    </el-button>
                    <el-button type="primary" @click="back">
                        取消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
import {defineComponent, ref} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";

export default defineComponent({
    name: "AddInformation",
    setup() {
        const add_form = ref({
            telephone: '',
            age: ''
        })
        const user_name = localStorage.getItem('user_name')
        return {
            add_form,
            user_name
        }
    },
    methods: {
        onSubmit: function () {
            const that = this
            axios.post('http://localhost:8088/manage-user/add-info', {
               user_name: that.user_name,
                telephone: that.add_form.telephone,
                age: that.add_form.age
            }).then(function (response) {
                if (response.data === "添加成功") {
                    ElMessage({
                        message: "添加成功",
                        type: 'success',
                    })
                    window.location.href = ('order-page')
                }
            }).catch(function (error) {
                console.log(error)
                ElMessage({
                    message: error,
                    type: 'warning',
                })
            })
            window.location.href = ('order-page')
        },
        back: function () {
            window.location.href = ('travel-list')
        }
    },
    mounted() {
        if (this.user_name === '' || this.user_name === null) {
            ElMessage.error('似乎还没有登录，请先登录')
            window.location.href = '403'
        } else {
            const that = this
            axios.get('http://localhost:8088/manage-user/is-add-info', {
                params: {
                    user_name: that.user_name
                }
            }).then(function (response) {
                if (response.data === "信息已添加") {
                    ElMessage({
                        message: "信息已添加",
                        type: 'success',
                    })
                    window.location.href = ('order-page')
                }
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