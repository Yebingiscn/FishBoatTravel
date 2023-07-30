<template>
    <el-header style="text-align: right; font-size: 12px; ">
        <div class="toolbar">
            <el-dropdown>
                <el-icon style="margin-right: 8px; margin-top: 1px; color: #1890ff"
                >
                    <Setting
                    />
                </el-icon>
                <template #dropdown>
                    <el-dropdown-menu>
                        <router-link to="admin-login" tag = "a">
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </router-link>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <span>Admin</span>
        </div>
    </el-header>
    <div class="home-container">
        <el-aside class="row-bg">
            <el-scrollbar>
                <el-menu :default-openeds="['1-3']">
                    <el-tabs :tab-position="'left'" style="height:100%" class="demo-tabs">
                        <el-sub-menu index="1">
                            <template #title>渔之旅后台管理系统</template>

                            <el-menu-item index="1-3">
                                <el-icon>
                                    <icon-menu/>
                                </el-icon>
                                首页
                            </el-menu-item>
                            <el-sub-menu index="3">
                                <template #title>
                                    <el-icon>
                                        <setting/>
                                    </el-icon>
                                    系统管理
                                </template>
                                <el-menu-item-group>
                                    <template #title>用户管理</template>
                                    <el-menu-item index="3-1">管理员列表</el-menu-item>
                                    <el-menu-item index="3-2">用户管理</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group title="订单管理">
                                    <el-menu-item index="3-3">订单管理</el-menu-item>
                                </el-menu-item-group>
                                <el-sub-menu index="3-4">
                                    <template #title>路线管理</template>
                                    <el-menu-item index="3-4-1">路线管理</el-menu-item>
                                    <el-menu-item index="3-4-1">区域管理</el-menu-item>
                                </el-sub-menu>
                            </el-sub-menu>
                        </el-sub-menu>
                    </el-tabs>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-row class="row-bg" :gutter="10" width="400px">
            <el-col :xs="24" :sm="12" :lg="8">
                <el-card class="box-card" style="height: 100%">
                    <el-image
                            class="wechat"
                            style="max-width: 200px"
                            :data-resid="Date.now()"
                    />
                    <div class="personal">
                        <div class="name"></div>
                        <div class="description"></div>
                        <div class="list">
                            <div>用户名：admin</div>
                            <div>类型：管理员</div>
                            <div>状态：正常</div>
                        </div>
                        <el-divider></el-divider>
                        <div style="margin-bottom: 15px"><h5>用户反馈</h5></div>
                        <div>
                            <el-tag style="margin-right: 10px">希望价格有优惠</el-tag>
                            <el-tag style="margin-right: 10px">希望可以举办钓鱼活动</el-tag>
                            <el-tag style="margin-right: 10px">船主十分热心</el-tag>
                            <el-tag style="margin-right: 10px">很愉快的经历</el-tag>
                            <el-tag>希望多人团建有优惠</el-tag>
                        </div>
                        <el-divider></el-divider>
                        <div style="margin-bottom: 15px"><h5>公司座右铭</h5></div>
                        <div>站在游客角度思考问题，一切以游客利益为准</div>
                        <el-divider></el-divider>
                        <div style="margin-bottom: 15px"
                        ><h5>公司联系电话：400-8820-8830</h5><h5>公司联系地址：广东省广州市黄埔区开发大街1号</h5></div
                        >
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="16">
                <el-row class="custom" :gutter="10">
                    <el-col :xs="24" :sm="12" :lg="8">
                        <el-card style="margin-bottom: 10px">
                            <div class="grid-content">
                                <div class="left"
                                >
                                    <el-icon style="font-size: 24px; color: white">
                                        <user/>
                                    </el-icon
                                    >
                                </div>
                                <div class="right">
                                    <div
                                            class="h2"
                                            style="color: #2d8cf0"
                                    >
                                        <count-to
                                                :start-val="0"
                                                :end-val="5268"
                                                :duration="2000"
                                                :autoplay="true"
                                        ></count-to
                                        >
                                    </div>
                                    <div>用户访问量：10</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                        <el-card style="margin-bottom: 10px">
                            <div class="grid-content">
                                <div class="left" style="background: #64d572">
                                    <el-icon style="font-size: 24px; color: white">
                                        <user/>
                                    </el-icon
                                    >
                                </div>
                                <div class="right">
                                    <count-to
                                            :start-val="0"
                                            :end-val="9599"
                                            :duration="2000"
                                            :autoplay="true"
                                    ></count-to
                                    >
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                        <el-card style="margin-bottom: 10px">
                            <div class="grid-content">
                                <div class="left" style="background: #f25e43"
                                >
                                    <el-icon style="font-size: 24px; color: white">
                                        <user/>
                                    </el-icon
                                    >
                                </div>
                                <div class="right">
                                    <div
                                            class="h2"
                                            style="color: #f25e43"
                                    >
                                        <count-to
                                                :start-val="0"
                                                :end-val="595453"
                                                :duration="2000"
                                                :autoplay="true"
                                        ></count-to
                                        >
                                    </div>
                                    <div>新订单：1</div>
                                </div>

                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="24" :sm="12" :lg="8">
                        <el-card style="margin-bottom: 10px">
                            <div class="grid-content">
                                <div class="left" style="background: #f25e43"
                                >
                                    <el-icon style="font-size: 24px; color: white">
                                        <user/>
                                    </el-icon
                                    >
                                </div>
                                <div class="right">
                                    <div
                                            class="h2"
                                            style="color: #f25e43"
                                    >
                                        <count-to
                                                :start-val="0"
                                                :end-val="595453"
                                                :duration="2000"
                                                :autoplay="true"
                                        ></count-to
                                        >
                                    </div>
                                    <div>累计订单：10</div>
                                </div>

                            </div>
                        </el-card>
                    </el-col>

                </el-row>
                <el-card class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>用户热门路线</span>
                        </div>
                    </template>
                    <div>
                        <p>1. 亚龙湾</p>
                        <p>2. 厦门</p>
                        <p>3. 三亚</p>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
        >
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3" disabled>Info</el-menu-item>
            <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
        <div class="h-6"/>
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect"
        >
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="3" disabled>Info</el-menu-item>
            <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
    </div>
    <template>
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
                @select="handleSelect"
        >
            <el-menu-item index="0">LOGO</el-menu-item>
            <div class="flex-grow"/>
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
        </el-menu>
    </template>


</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {Setting, User} from "@element-plus/icons-vue";

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

</script>

<style scoped lang="scss">
@import "../../assets/Style/AdminIndex";

.flex-grow {
  flex-grow: 1;
}
</style>