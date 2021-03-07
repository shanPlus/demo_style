<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" class="input" style="color: red;" id="input"></el-input>
    </el-form-item>
    <el-form-item label="密 码" prop="password" show-password>
      <el-input v-model="form.password" placeholder="请输入密码" class="input" style="color: red;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import elForm from '@/components/elementUi/form/src/form'
import elFormItem from '@/components/elementUi/form-item/src/form-item'
import elInput from '@/components/elementUi/input/src/input'
export default {
  name: 'elementUi',
  components: {
    'el-form': elForm,
    'el-form-item': elFormItem,
    'el-input': elInput,
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if(!valid) return false
      })
    }
  }
}
</script>
