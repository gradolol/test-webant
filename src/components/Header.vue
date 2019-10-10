<template>
  <div class="nav">
    <div class="image">
      <router-link to="/"><img id="image" src="../assets/logo.png" height="41" width="40" alt="logo"/></router-link>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" border>
      <el-menu-item index="/new" class="el-menu-item"><router-link exact to="/new">Новые</router-link></el-menu-item>
      <el-menu-item index="/popular" class="el-menu-item"><router-link exact to="/popular">Популярные</router-link></el-menu-item>
      <el-menu-item index="/upload" class="el-menu-item" v-if="authorized"><router-link exact to="/upload">Загрузить</router-link></el-menu-item>
    </el-menu>
    <el-button class="signOut" @click="signOut()">
      Выйти
    </el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
    authorized() {
      return this.$store.getters['isAuthenticated'];
    },
    activeIndex() {
      return this.$route.path;
    }
  },
    methods:{
      signOut(){
          this.$store.dispatch('SIGNOUT')
          this.$router.push('/login')
        }
    }
  }
</script>

<style lang="scss" scoped>
  .nav {
    padding: 30px 24px 0px 24px;
    margin: auto;
    display: flex;
    max-width: 90vw;
    justify-content: space-between;
  }
  .el-menu {
    width: 65%;
    border: 2px solid transparent;
    border-bottom-color: #E4E7ED;
    padding-left: 2%;
    .el-menu-item {
      display: flex;
      .el-menu-item:not(:first-child) {
        margin-left: 50px
      }
      a{
        color: #8C8C8C;
        text-decoration: none;
        font-size: 20px;
        position: relative;
      }
    }
  }
</style>