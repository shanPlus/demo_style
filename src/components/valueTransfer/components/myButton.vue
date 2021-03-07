<template>
  <div class="myButton">
    <button
      class="el-button el-button--primary"
      @click="$emit('buttonClick', ++count)"
    >我是子组件, 我被点击了</button>
  </div>
</template>

<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
