import Vue from 'vue'

//引入全局组件
import MyUl from './components/Commons/MyUl.vue'
import MyLi from './components/Commons/MyLi.vue'

//注册全局组件
Vue.component(MyUl.name, MyUl)
Vue.component(MyLi.name, MyLi)

//注册全局过滤器
import Moment from 'moment'
Vue.filter('convert-time',(value)=>{
 return Moment(value).format('YYYY-MM-DD')
})

Vue.filter('convert-title',(value, limit)=>{
 if (!value) {return}
 if (value.length > limit) {
 	return value.substr(0,limit) + '...'
 }
 return value
})

//引入路由组件
import App from './components/App.vue'
import Home from './components/Home/Home.vue'
import Member from './components/Member/Member.vue'
import Search from './components/Search/Search.vue'
import Shopcart from './components/Shopcart/Shopcart.vue'
import NewsList from './components/News/NewsList.vue'
import NewsDetail from './components/News/NewsDetail.vue'

//路由开始
import VueRouter from 'vue-router'
Vue.use(VueRouter)
var router = new VueRouter()
router.addRoutes([
		{path:'/',redirect:{name:'home'} },
		{name:'home',path:'/home',component:Home},
		{name:'member',path:'/member',component:Member},
		{name:'search',path:'/search',component:Search},
		{name:'shopcart',path:'/shopcart',component:Shopcart},
		{name:'newslist',path:'/news/list',component:NewsList},
		{name:'newsdetail',path:'/news/detail',component:NewsDetail},
	])
//路由结束

//MintUi开始
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUi)
//MintUi结束


//引入全局样式css
import './static/css/global.css'


//axios开始
import Axios from 'axios'
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'http://vue.studyit.io/api/'
//axios结束

new Vue({
	el:'#app',
	render:c=>c(App),
	router
})