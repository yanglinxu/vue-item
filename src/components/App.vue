<template>
<div>
	<mt-header title="漂亮的顶部"></mt-header>


	<router-view></router-view>


	<mt-tabbar v-model="selected">
  <mt-tab-item id="home">
    <img slot="icon" src="../static/img/index.png">
    首页
  </mt-tab-item>
  <mt-tab-item id="member">
    <img slot="icon" src="../static/img/vip.png">
    会员
  </mt-tab-item>
  <mt-tab-item id="shopcart">
    <img slot="icon" src="../static/img/shopcart.png">
    购物车
  </mt-tab-item>
  <mt-tab-item id="search">
    <img slot="icon" src="../static/img/find.png">
    查找
  </mt-tab-item>
</mt-tabbar>
</div>
</template>

<script>
export default {
	watch:{
		selected(newV){
			// console.log(newV)=>id
			this.$router.push({
				name:newV
			})
		}
	},
  
  data () {
    return {
    	selected:''
    }
  }
}
</script>

<style lang="css" scoped>
</style>