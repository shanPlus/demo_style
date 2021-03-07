<template>
  <input type="text" v-model="num"/>
</template>

<script>
export default {
  name: "myInput",
  data() {
    return {
      num: ''
    }
  },
  watch: {
    num(newVal) {
      // 发送数据
      this.$bus.$emit('num', newVal)
    }
  }
}
</script>
