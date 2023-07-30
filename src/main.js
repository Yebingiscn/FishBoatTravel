import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import * as echarts from "echarts";
import axios from 'axios';
import qs from 'qs'
import BaiduMap from 'vue-baidu-map-3x';
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale/lang/zh-cn';

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(ElementPlus,{locale})
app.mount('#app')
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$qs = qs;
app.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'ivhahw4H0zEV4lupUEwIc9HVdNa6Xmll',
    // v:'2.0',  // 默认使用3.0
    // type: 'WebGL' // ||API 默认API  (使用此模式 BMap=BMapGL)
});