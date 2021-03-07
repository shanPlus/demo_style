<template>
  <el-dialog
    title="提示" width="30%"
    :visible="dialogVisible"
    @close="closeHandle"
  >
    {{$attrs}}
    <span>新建</span>
    <el-input
      v-model="num"
      @input="num = num.replace(/[^0-9]/g,'')"
      v-on="inputListeners"
    ></el-input>
    <div class="myinput">
      <myInput @focus.native="focusHandle"/>
      <myContent></myContent>
    </div>


    <span slot="footer" class="dialog-footer">
    <el-button @click="$emit('returnHandle', false)">返回</el-button>
    <el-button v-on="$listeners">取 消</el-button>
    <el-button
      :disabled="$attrs.disabled"
      type="primary"
      @click="$emit('update:dialogVisible', false)"
    >
      确 定
    </el-button>
  </span>
  </el-dialog>
</template>

<script>
import myInput from './myInput'
import inputContent from './inputContent'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    myInput,
    myContent: inputContent,
  },
  data() {
    return {
      num: '',
    }
  },
  computed: {
    inputListeners() {
      let vm = this
      // 自定义监听器: 获取焦点
      return Object.assign({}, this.$listeners, {
        focus: function() {
          vm.$emit('focus')
        }
      })
    }
  },
  methods: {
    focusHandle(e) {
      console.log(e);
    },
    closeHandle() {
      this.$emit('update:dialogVisible', false)
    }
  },

}
</script>

<style>
.myinput {
  display: flex;
}
</style>
