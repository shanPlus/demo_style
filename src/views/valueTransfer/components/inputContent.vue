<template>
  <div class="inputContent">{{num}}</div>
</template>

<script>
export default {
  name: "content",
  data() {
    return {
      num: ''
    }
  },
  mounted () {
    this.$bus.$on('num', (num) => {
      this.num = num
    })
  }
}
</script>

<style scoped>

</style>
