<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
::-webkit-scrollbar-track {
  background-color: #dbe4f4;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #dbe4f4;
}

::-webkit-scrollbar-thumb {
  background-color: #a3b0c7;
}
</style>
