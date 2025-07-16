//定义路由结构，页面的地图
import Home from "@/components/content/Home.vue";
import {createRouter,createWebHashHistory} from "vue-router";

import InfoOne from "../components/content/InfoOne.vue";
import InfoTwo from "../components/content/InfoTwo.vue";
import InfoThree from "../components/content/InfoThree.vue";
import Order from "../components/content/order/Order.vue";
import AxiosTest from "../components/test/AxiosTest.vue";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                title: '首页',
                searchPlaceholder: '首页全局搜索...'
            }
        },
        {
            path: '/shop',
            component: InfoOne,
            meta: {
                title: '店铺列表',
                searchPlaceholder: '查店铺...'
            }
        },
        {
            path: '/user',
            component: InfoTwo,
            meta: {
                title: '用户管理',
                searchPlaceholder: '查用户...'
            }
        },
        {
            path: '/product',
            component: InfoThree,
            meta: {
                title: '商品管理',
                searchPlaceholder: '查商品...'
            }
        },
        {
            path: '/order',
            component: Order,
            meta: {
                title: '订单管理',
                searchPlaceholder: '查订单...'
            }
        },
        {
            path: '/axios-test',
            component: AxiosTest,
            meta: {
                title: '测试页面',
                searchPlaceholder: '测试...'
            }
        },
        {
            path: '/order/:orderNo',
            name: 'OrderDetail',
            component: () => import('@/components/content/order/OrderDetail.vue'),
            meta: {
                title: '订单详情',
                searchPlaceholder: '查订单详情...'
            }
        }
    ]
})
export default router;