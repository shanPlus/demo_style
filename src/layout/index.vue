<template>
  <el-container>
    <el-aside width="200px">
      <NavMenu></NavMenu>
    </el-aside>
    <el-main>
      <router-view></router-view>
      <router-view name="valueTransfer2"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import NavMenu from './components/NavMenu'
export default {
  components: {
    NavMenu,
  },
  data () {
    return {}
  }
}
</script>
