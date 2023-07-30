<template>
    <router-link to="manage-index">
        <h1 class="mb-2">渔之旅后台管理系统</h1>
    </router-link>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 10px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">折叠</el-radio-button>
    </el-radio-group>
    <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :default-openeds="['1','2','3','4']"
            style="border-radius: 5px"
    >
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <Menu/>
                </el-icon>
                <span>用户管理</span>
            </template>
            <el-menu-item-group>
                <router-link to="manage-admin">
                    <el-menu-item index="3-1">管理员列表</el-menu-item>
                </router-link>
                <router-link to="manage-user">
                    <el-menu-item index="3-2">用户管理</el-menu-item>
                </router-link>
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <Document/>
                </el-icon>
                <span>订单管理</span>
            </template>
            <el-menu-item-group>
                <router-link to="manage-order">
                    <el-menu-item index="3-3">订单管理</el-menu-item>
                </router-link>
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <Setting/>
                </el-icon>
                <span>渔船管理</span>
            </template>
            <el-menu-item-group>
                <router-link to="manage-boat">
                    <el-menu-item index="3-4-1">渔船管理</el-menu-item>
                </router-link>
                <router-link to="manage-boat-owner">
                    <el-menu-item index="3-4-2">船主管理</el-menu-item>
                </router-link>
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="4">
            <template #title>
                <el-icon>
                    <Location/>
                </el-icon>
                <span>路线管理</span>
            </template>
            <el-menu-item-group>
                <router-link to="manage-road">
                    <el-menu-item index="4-4-1">路线管理</el-menu-item>
                </router-link>
                <router-link to="manage-area">
                    <el-menu-item index="4-4-2">区域管理</el-menu-item>
                </router-link>
                <router-link to="show-area">
                    <el-menu-item index="4-4-3">查看区域</el-menu-item>
                </router-link>
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import {Document, Location, Menu, Setting} from "@element-plus/icons-vue";
import {ref} from "vue";

const isCollapse = ref(false)

</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

::v-deep(.el-submenu.is-active > .el-submenu__title) {
  color: #409EFF !important;
}
</style>