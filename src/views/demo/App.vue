<template>
  <div id="app">
    <img src="./../../assets/logo.png">
    <router-view/>
    <a href="../home/index.html">to index</a><br>
    <a href="../list/list.html">to list</a><br>
    <div class="test"><div class="test-item">test less</div></div>
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
