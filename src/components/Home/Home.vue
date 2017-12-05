<template>
	<div>
    <!--轮播图-->
		<mt-swipe :auto="4000">
      <mt-swipe-item v-for="(pic,index) in imgs" :key="index">
        <a :href="pic.url">
          <img :src="pic.img">
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格 -->
    <my-ul>
      <my-li v-for="(r,index) in homeRouters" :key="index">
        <router-link :to="r.router">
          <div :class="'back-img ' + r.className">{{r.title}}</div>
        </router-link>
      </my-li>
    </my-ul>
	</div>
</template>

<script>
export default {
  created(){
    this.$axios.get('getlunbo').then(res=>{
      this.imgs = res.data.message
    })
  },
    

  data () {
    return {
    	imgs:'',
      homeRouters:[
        {router:{name:'newslist'},className:'news',title:'新闻列表'},
        {router:{name:'newslist'},className:'pic',title:'图文分享'},
        {router:{name:'newslist'},className:'goods',title:'商品列表'},
        {router:{name:'newslist'},className:'feedback',title:'留言反馈'},
        {router:{name:'newslist'},className:'search',title:'搜索资讯'},
        {router:{name:'newslist'},className:'callme',title:'联系我们'},
      ]
    }
  },
  methods:{ 
  	
  }
}
</script>

<style scoped>
 .mint-swipe-item img {
    width: 100%;
 }
 .mint-swipe {
  height: 30%;
 }

 /*九宫格样式*/
.back-img{
        background-size: 50px;
        background-repeat: no-repeat;
        background-position: 40px 35px;
        font-size: 20px;
        font-family: 'Microsoft YaHei';
}


li a{
    color:black;
}
/*图片*/
.news {
    background-image: url(../../static/img/news.png);
}
.pic {
    background-image: url(../../static/img/picShare.png);
}
.goods{
    background-image: url(../../static/img/goodShow.png)
}
.feedback{
    background-image: url(../../static/img/feedback.png)
}
.search{
    background-image: url(../../static/img/search.png)
}
.callme{
    background-image: url(../../static/img/callme.png)
}
</style>