<template>
	<div>    
        <nav-bar title="图文详情"></nav-bar>

        <div class="photo-title">
            <p>{{imgInfo.title}}</p>
            <span>发起日期：{{imgInfo.add_time|convert-time}}</span>
            <span>{{imgInfo.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <my-ul>
            <my-li v-for="(img,index) in imgs" :key="index">
                <img class="preview-img" :src="img.src" @click="$preview.open(index, imgs)">

            </my-li>    
        </my-ul>
        <div class="photo-desc">
            <p v-html="imgInfo.content"></p>
        </div>
    </div>
</template>

<script>
export default {
	created(){
		//获取参数
		var imgId = this.$route.params.imgid
		//发送请求
		this.$axios.get('getimageInfo/' + imgId).
		then(res=>{
			this.imgInfo = res.data.message[0]
		}).catch(err=>{
			console.log(err)
		})
		
		this.$axios.get('getthumimages/' + imgId).
		then(res=>{
			this.imgs = res.data.message
			//给缩略图宽高,确定x点
            this.imgs.forEach(ele=>{
                ele.h = 400;
                ele.w = 600;
            })
		})

	},

  data () {
    return {
    	imgInfo:{},
    	imgs:[]
    }
  }
}
</script>

<style lang="css" scoped>
img{
    width: 100%;
}


li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.photo-desc p {
    font-size: 18px;
}
</style>