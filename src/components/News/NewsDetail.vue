<template>
	<div class="tmpl">
        <div class="news-title">
            <p>{{newsMsg.title|convert-title(15)}}</p>
            <div>
                <span>{{newsMsg.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{newsMsg.add_time|convert-time}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsMsg.content"></div>
    </div>
</template>

<script>
export default {
	created(){
		//获取参数
		var newsId = this.$route.query.newsId
		//发送ajax请求
		this.$axios.get('getnew/' + newsId).
		then(res=>{
			this.newsMsg = res.data.message[0]
		}).
		catch(err=>{
			console.log(err)
		})
	},

  data () {
    return {
    	newsMsg:''
    }
  }
}
</script>

<style lang="css" scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
}
</style>