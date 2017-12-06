<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a >返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea cols='50' v-model="content"></textarea>
                </li>
                <li>
                    <mt-button @click="sendComment" type="primary" size="large">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
               <li v-for="(comment,index) in comments" :key="index">
                   {{comment.user_name}}：{{comment.content}} {{comment.add_time|convert-time}}
               </li>
            </ul>
            <mt-button type="danger" size="large" plain @click="loadmore">点击加载更多</mt-button>   
        </div>
    </div>
</template>
<script>
export default {
    props:['pid'],
    name:'conment',
    data(){
        return {
            comments:[],
            pageIndex:1,
            hasDate:true,
            content:''
        }
    },
    methods:{
        loadByPage(page){
            //接收请求参数
            //发送ajax请求获取数据
            this.$axios.get(`getcomments/${this.pid}?pageindex=${page}`).
            then(res=>{
                this.comments = res.data.message
                this.pageIndex++
            }).catch(err=>{
                console.log(err)
            })
        },
        loadmore(){
            //点击后重新发送ajax请求
            if (!this.hasDate) return
            this.$axios.get(`getcomments/${this.pid}?pageindex=${this.pageIndex}`).
                then(res=>{
                this.comments = this.comments.concat(res.data.message)
                //设置数据检查
                if (res.data.message.length == 0) {
                    //提示没有数据了
                    this.$toast('没有更多数据了')
                    this.hasDate = false
                    return

                }
                this.pageIndex++
                }).catch(err=>{
                console.log(err)
            })
            },
        sendComment(){
            this.$axios.post(`postcomment/${this.pid}`,`content=${this.content}`).
            then(res=>{
                //重新获取数据渲染页面
                this.loadByPage(1)
                this.pageIndex = 1
                this.content = ''

            })
        }
    },
    created(){
        this.pageIndex = this.$route.query.pageindex || 1
        this.loadByPage(this.pageIndex)
    }

}

</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>
