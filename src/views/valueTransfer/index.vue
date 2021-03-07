<template>
<!--  传值, 组件通信:
          $parent, $children, $root,
          $bus, $on, $emit
          .native, $listeners, $attrs
 -->
  <div class="valueTransfer">
    组件通信知识点1:
    <ul>
      <li>$parent, $children, $root,</li>
      <li>$bus, $on, $emit</li>
      <li>.native修饰符, $listeners, $attrs</li>
    </ul>
    <el-button type="primary" @click="dialogVisible = true">
      新建
    </el-button>
    <!--会被扩展为
    <Dialog
      :dialogVisible="dialogVisible"
      @update:dialogVisible="val => val=dialogVisible"
      @click="dialogClickHandle"
    />-->
    <Dialog
      :dialogVisible.sync="dialogVisible"
      :disabled="disabled"
      id="dialogId"
      class="dialogClass"
      data-id="1-1"
      style="color: #ff0000"
      @click="dialogClickHandle"
      @focus="dialogFocusHandle"
      @returnHandle="returnHandle"
    ></Dialog>
    <hr/>
  </div>
</template>

<script>
import Dialog from './components/Dialog'
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      dialogVisible: false, // 控制Dialog组件的显示与隐藏,
      disabled: true
    }
  },
  methods: {
    dialogClickHandle() {
      this.dialogVisible = !this.dialogVisible;
      console.log('监听子组件取消按钮被点击');
    },
    dialogFocusHandle() {
      console.log('表单获取焦点');
    },
    returnHandle(flag) {
      this.dialogVisible = flag
    }
  }
}
</script>
