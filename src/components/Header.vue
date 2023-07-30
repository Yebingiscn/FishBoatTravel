<template>
    <div class="toolbar">
        <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 30%"
            >
                <Setting
                />
            </el-icon>
            <template #dropdown>
                <el-dropdown-menu>
                    <router-link to="admin-login">
                        <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
                    </router-link>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span>{{ user }}</span>
    </div>
</template>

<script>
import {Setting} from '@element-plus/icons-vue'
import {defineComponent} from "vue";
import {ElMessage} from "element-plus";

export default defineComponent({
    name: "Header",
    components: {Setting},
    setup(props) {
        const user = props.admin_name
        console.log(props.admin_name)
        return {
            user
        }
    },
    methods: {
        exit: function () {
            ElMessage({
                message: '成功退出',
                type: 'success',
            })
            window.location.href = 'admin-login'
            localStorage.setItem('admin_name','')
        }
    },
    props:[
        'admin_name'
    ],
})
</script>

<style scoped>
.toolbar {
    float: right;
}
.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>