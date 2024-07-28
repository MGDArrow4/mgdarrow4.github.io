<template>
  <ul class="log-reg__errors">
    <li v-for="(error, i) in $props.errors" :key="i">
      {{ error }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ["errors"],
  name: "LoginRegErrors",
};
</script>

<style lang="scss">
.log-reg__errors {
  font-style: italic;
  font-weight: 300;
  color: $col-red;
  list-style: inside !important;
  margin-left: 10px !important;
}
</style>