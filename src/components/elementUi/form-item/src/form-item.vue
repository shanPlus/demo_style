<template>
  <div class="el-form-item">
    <label :for="labelFor" v-if="label">
      {{label}}
    </label>
    <slot></slot>
    <div class="el-form-item__error" v-if="error"></div>
  </div>
</template>

<script>
export default {
  name: 'ElFormItem',
  inject: ['form'],
  data() {
    return {
      error: false,
    }
  },
  props: {
    for: String, // label身上的for属性与input id属性关联
    label: String,
  },
  computed: {
    labelFor() {
      return this.for || this.prop;
    }
  }
}
</script>
