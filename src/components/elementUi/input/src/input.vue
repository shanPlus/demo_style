<template>
  <div>
    <input
      class="el-input__inner"
      :type="showPassword ? 'password' : 'text'"
      v-bind="$attrs"
      @input="handleInput"
      ref="input"
    >
  </div>
</template>

<script>
export default {
  name: 'elInput',
  inheritAttrs: false, // 设置false, 避免设置到根元素上
  props: {
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>
