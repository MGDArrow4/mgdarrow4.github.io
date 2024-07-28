<template>
  <div class="allocation__point">
    <div class="js-read-funeral" @click="isOpenEdit = !isOpenEdit">
      <read-point :funeral="this.funeral" />
    </div>
    <allocation-templ
      :open="isOpenEdit"
      :templs="getTemplsSort"
      :funeral="funeral"
    />
  </div>
</template>

<script>
import ReadPoint from "@/components/AppRead/ReadPoint.vue";
import AllocationTempl from "./AllocationTempl.vue";
import { useTemplsStore } from "@/stores/TemplsStore.js";

export default {
  components: { AllocationTempl, ReadPoint },
  name: "AllocationPoint",
  props: ["funeral"],
  data() {
    return {
      isOpenEdit: false,
    };
  },
  computed: {
    getTemplsSort() {
      return useTemplsStore().templs;
    },
  },
};
</script>

<style lang="scss">
.allocation__point {
  margin-bottom: 5px;
  width: 100%;
  & .read-funeral {
    margin-bottom: 0;
  }
}
</style>