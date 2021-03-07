<template>
<!--  $emit .sync, v-model用法-->
  <div class="valueTransfer2">
    组件通信知识点2:
    <ul>
      <li>$emit, .sync修饰符, 组件v-model</li>
    </ul>
    <div>当前子组件的值为: {{count}}</div>
    <my-button @buttonClick="buttonOnClick"></my-button>
    <hr>
    组件小技巧:
    <ul>
      <li>.sync, v-model用法</li>
    </ul>
    <div>子组件输入的value值: {{value}}</div>
    <my-input :value="value" @input="(e)=>value=e"></my-input>
    <!-- 简化版-->
    <my-input v-model="value"></my-input>
  </div>
</template>

<script>
import myButton from "./components/myButton";
import myInput from "./components/myInput";
export default {
  components: {
    myButton, myInput,
  },
  data() {
    return {
      count: 0,
      value: '',
    }
  },
  methods: {
    buttonOnClick(val) {
      this.count = val
    },
    InputHandle(e) {
      console.log(e)
    }
  }
}
</script>
