<template>
	<div>
		<!-- 引入返回导航 -->
        <nav-bar title="图文分享"></nav-bar>
        <div class="photo-header">
            <ul>
                <li v-for="category in categorys" :key="category.id">
                    <a href="javascript:;" @click="getImgs(category.id)">{{category.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link :to="{name:'picdetail',params:{imgid:img.id} }">
                        <img v-lazy="img.img_url">
                        <p>
                            <span>{{img.title}}</span>
                            <br>
                            <span>{{img.zhaiyao}}</span>
                        </p>
                   	</router-link>
                </li>
            </ul>
        </div>
	</div>
</template>

<script>
export default {
	created(){
		//获取参数
		var cateId =  this.$route.query.cateId
		//发送ajax请求
		this.$axios.all([
				this.$axios.get('getimgcategory'),
				this.$axios.get('getimages/' + cateId)
			]).
		then(this.$axios.spread((categoryRes,imgRes)=>{
                this.categorys = categoryRes.data.message;
                this.categorys.unshift({
                    id:0,title:'全部'
                });
                this.imgs = imgRes.data.message;
            })
        )
	},
	methods:{
		getImgs(id){
			//通过id重新发送ajax请求，更新图片数据
			this.$axios.get('getimages/' + id).
			then(res=>{
				this.imgs = res.data.message
			}).catch(err=>{
				console.log(err)
			})
		}
	},

  data () {
    return {
    	categorys:'',
    	imgs:''
    }
  }
}
</script>

<style lang="css" scoped>
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}

.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}
</style>