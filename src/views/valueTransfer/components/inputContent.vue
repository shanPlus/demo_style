<template>
  <div class="inputContent">{{num}}</div>
</template>

<script>
export default {
  name: "inputContent",
  data() {
    return {
      num: ''
    }
  },
  mounted () {
    // 数据操作
    this.$bus.$on('num', (num) => {
      this.num = num
    })
  },
  destroyed (){
    // 使用$bus的时候在使用bus的组件中, 需要在beforDestroy函数中销毁bus, 不销毁的话会一直叠加的调用方法
    this.$bus.$off('num')
  }
}
</script>
