<template>
  <div id="app">
    <img src="./../../assets/logo.png">
    <router-view/>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang = "less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.test {
    width: 100px;
    height: 100px;
    background: #f00;
    .test-item {
        width: 50px;
        height: 50px;
        background: #ff0;
    }
  } 
</style>
