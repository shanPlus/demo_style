<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'elForm',
  provide() {
    return {
      form: this
    }
  },
  data() {
    return {
      form: this,
    }
  },
  props: {
    model: Object,
    rules: Object
  }
}
</script>
