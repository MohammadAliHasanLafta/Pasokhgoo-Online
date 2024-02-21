<template>
    
</template>
<script>
export default {
  data() {
    return {
      query: "",
      result: {},
    };
  },
}
</script>
<style lang="scss" scoped>
$colors: #8cc271,#69beeb,#f5aa39,#e9643b;
.page-loader{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height: 100vh;
    background-color: #333;
    z-index:999;
}
</style>