<template>
    <div class="toolbar">
        <el-dropdown>
            <el-icon style="margin-right: 8px; margin-top: 40%"
            >
                <Setting
                />
            </el-icon>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="to_travel_list">线路列表</el-dropdown-item>
                    <el-dropdown-item @click="to_person_index">个人空间</el-dropdown-item>
                    <el-dropdown-item @click="exit">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span>{{ user }}</span>
    </div>
</template>

<script>
import {Setting} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {defineComponent, ref} from "vue";

export default defineComponent({
    name: "UserHeader",
    components: {Setting},
    setup(props) {
        const user = props.user_name
        console.log(props.user_name)
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
            localStorage.setItem("user_name",'')
            window.location.href = "/"
        },
        to_person_index: function () {
            window.location.href = "person-index";
        },
        to_travel_list: function () {
            window.location.href = "travel-list"
        }
    },
    props: [
        'user_name'
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