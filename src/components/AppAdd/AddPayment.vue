<template>
  <div
    @click="$emit('pay')"
    :class="{ 'add-payment--act': payment, 'add-payment--unact': !payment }"
  >
    <font-awesome-icon :icon="['fas', 'ruble-sign']" />
  </div>
</template>

<script>
export default {
  name: "AddPayment",
  props: ["payment"],
};
</script>

<style lang="scss">
.add-payment--act {
  background: $col-basic;
}
.add-payment--unact {
  background: $col-red;
}
</style>