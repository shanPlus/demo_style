<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
    <el-submenu
      v-for="item in menuList"
      :index="item.id"
      :key="item.id"
    >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.name}}</span>
      </template>
      <el-menu-item-group>
        <template v-for="childItem in item.children">
          <router-link :to="childItem.path" :key="childItem.id">
            <el-menu-item :index="childItem.id">
              {{childItem.name}}
            </el-menu-item>
          </router-link>
        </template>

      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "NavMenu",
  data() {
    return {
      menuList: [
        {
          id: '1',
          name: '组件传值',
          children: [
            {
              id: '1-1',
              name: '父主件向子组件传值',
              path: '/props'
            },
            {
              id: '1-2',
              name: 'element-ui 表单',
              path: '/form'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>

</style>
