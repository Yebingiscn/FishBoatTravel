import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../views/UserInterface/UserIndex.vue')
        },
        {
            path: '/admin-login',
            component: () => import('../views/AdminInterface/AdminLogin.vue')
        },
        {
            path: '/no-found',
            component: () => import('../views/ErrorHandel/NotFound.vue')
        },
        {
            path: '/user-login',
            component: () => import('../views/UserInterface/UserLogin.vue')
        },
        {
            path: '/user-sign',
            component: () => import('../views/UserInterface/UserSign.vue')
        },
        {
            path: '/404',
            component: () => import('../views/ErrorHandel/404.vue')
        },
        {
            path: '/403',
            component: () => import('../views/ErrorHandel/403.vue')
        },
        {
            path: '/admin-index',
            component: () => import('../views/AdminInterface/AdminIndex.vue')
        },
        {
            path: '/order-page',
            component: () => import('../views/UserInterface/OrderPage.vue')
        },
        {
            //使用正则的方式，匹配任意的
            path: "/:path(.*)", component: () => import("../views/ErrorHandel/404.vue")
        },
        {
            path: "/admin-page",
            component: () => import('../views/AdminInterface/AdminPage.vue')
        }, {
            path: "/manage-admin",
            component: () => import('../views/AdminInterface/ManageAdmin.vue')
        }, {
            path: "/manage-index",
            component: () => import('../views/AdminInterface/ManageIndex.vue')
        }, {
            path: "/manage-order",
            component: () => import('../views/AdminInterface/ManageOrder.vue')
        }, {
            path: "/manage-road",
            component: () => import('../views/AdminInterface/ManageRoad.vue')
        }, {
            path: "/manage-user",
            component: () => import('../views/AdminInterface/ManageUser.vue')
        }, {
            path: "/show-area",
            component: () => import('../views/AdminInterface/ShowArea.vue')
        }, {
            path: "/add-info",
            component: () => import('../views/UserInterface/AddInformation.vue')
        }, {
            path: "/confirm-info",
            component: () => import('../views/UserInterface/ConfirmOrder.vue')
        },{
            path: "/travel-list",
            component: () => import('../views/UserInterface/TravelList.vue')
        }, {
            path: "/person-index",
            component: () => import('../views/UserInterface/PersonIndex.vue')
        }, {
            path: "/manage-boat",
            component: () => import('../views/AdminInterface/ManageBoat.vue')
        },{
            path: "/manage-boat-owner",
            component: () => import('../views/AdminInterface/ManageBoatOwner.vue')
        },{
            path: "/search-result",
            component: () => import('../views/UserInterface/SearchResult.vue')
        },{
            path: "/travel-info",
            component: () => import('../views/UserInterface/TravelInfoVue.vue')
        },{
            path: "/manage-area",
            component: () => import('../views/AdminInterface/ManageArea.vue')
        }
    ]
})

export default router
