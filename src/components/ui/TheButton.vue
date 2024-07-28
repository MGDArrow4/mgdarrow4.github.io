<template>
  <input type="button" :value="text" />
</template>

<script>
export default {
  name: "TheButton",
  props: ["text"],
};
</script>

<style lang="scss" scoped>
input[type="button"] {
  width: 100%;
  height: 40px;
  margin: 10px auto;
  font-size: 22px;
  background: $col-basic;
  color: $col-text;
  outline: transparent;
  border: transparent;
}
</style>