<template>
  <div class="add-templ">
    <div
      class="add-templ__quick"
      :class="{ 'add-templ__quick--unactive': !!inputNow }"
    >
      <div @click="inputNow = 'Свято-Пантелеимоновский храм (ГБ №2)'">2-б</div>
      <div @click="inputNow = 'Богоявленский кафедральный собор'">Собор</div>
      <div @click="inputNow = 'Свято-Николаевский архиерейский собор'">
        Кочегарка
      </div>
      <div @click="inputNow = 'Храм Рождества Пресвятой Богородицы'">
        5-й квартал
      </div>
      <div
        class="quick--cemetery"
        @click="inputNow = 'Центрально-Городское кладбище'"
      >
        ЦГР
      </div>
      <div class="quick--cemetery" @click="inputNow = 'Октябрьское кладбище'">
        Октябрь
      </div>
    </div>
    <the-input-text :label="getLabel" :type="'text'" v-model.trim="inputNow">
    </the-input-text>
    <div class="add-templ__blanks">
      <div
        class="add-templ__blank"
        v-for="templ in getTempls"
        :key="templ.id"
        @click="inputNow = templ.name"
      >
        <div class="add-templ__blank--name">{{ templ?.name }}</div>
        <div class="add-templ__blank--label">{{ templ?.label }}</div>
        <div class="add-templ__blank--abbot">{{ templ?.abbot }}</div>
      </div>
      <div
        class="add-templ__blank"
        v-for="cemetery in getCemeterys"
        :key="cemetery.id"
        @click="
          inputNow = cemetery.name;
          $emit('blur');
        "
      >
        <div class="add-templ__blank--name">{{ cemetery?.name }}</div>
        <div class="add-templ__blank--label">{{ cemetery?.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TheInputText from "@/components/ui/TheInputText.vue";
import { useCemeterysStore } from "@/stores/CemeterysStore.js";
import { useTemplsStore } from "@/stores/TemplsStore.js";

export default {
  components: { TheInputText },
  name: "AddTempl",
  props: ["inputPrors"],
  data() {
    return {
      inputNow: "",
    };
  },
  watch: {
    inputNow(newVal) {
      let type = this.isTempl
        ? "templ"
        : this.isCemetery
        ? "cemetery"
        : "address";

      this.$emit("location", { location: newVal, type });
    },
  },
  computed: {
    getLabel() {
      return this.inputNow === ""
        ? "Храм / Кладбщие / Адрес"
        : this.isTempl
        ? "Храм"
        : this.isCemetery
        ? "Кладбщие"
        : "Адрес";
    },
    getTempls() {
      let templs = useTemplsStore().templs;
      let inputNow = this.inputNow.toLowerCase();

      if (inputNow === "" || this.isTempl) {
        return;
      }

      return templs.filter((el) => {
        let Name = el.name.toLowerCase().includes(inputNow);
        let Abbot = el.abbot
          ? el.abbot.toLowerCase().includes(inputNow)
          : false;
        let Label = el.label
          ? el.label.toLowerCase().includes(inputNow)
          : false;
        return Name || Abbot || Label;
      });
    },
    getCemeterys() {
      let cemetery = useCemeterysStore().cemeterys;
      let inputNow = this.inputNow.toLowerCase();

      if (inputNow === "" || this.isCemetery) {
        return;
      }

      return cemetery.filter((el) => {
        let Name = el.name.toLowerCase().includes(inputNow);
        let Label = el.label
          ? el.label.toLowerCase().includes(inputNow)
          : false;
        return Name || Label;
      });
    },
    isTempl() {
      let templs = useTemplsStore().templs;
      return templs.find((el) => {
        return el.name.toLowerCase() === this.inputNow.toLowerCase();
      });
    },
    isCemetery() {
      let cemeterys = useCemeterysStore().cemeterys;
      return cemeterys.find((el) => {
        return el.name.toLowerCase() === this.inputNow.toLowerCase();
      });
    },
  },
  mounted() {
    if (this.$props.inputPrors) {
      this.inputNow = this.$props.inputPrors;
    }
  },
};
</script>

<style lang="scss">
.add-templ__quick {
  width: 100%;
  height: calc((7dvh - 10px) * 3 + 10px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  & div {
    width: calc(50% - 2.5px);
    height: calc(7dvh - 10px);
    line-height: calc(7dvh - 10px);
    background: $col-bg-dark-hover;
    border: 2px solid $col-basic;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.3em;
    font-weight: 400;
    margin-bottom: 5px;
    &.quick--cemetery {
      border-color: $col-bg-hover-max;
    }
  }
  &.add-templ__quick--unactive {
    height: 0px;
  }
}

.add-templ__blanks {
  width: 100%;
  max-height: 160px;
  overflow: auto;
  & .add-templ__blank {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid $col-basic;
    display: flex;
    flex-wrap: wrap;
    background: $col-bg-dark-hover;
    padding: 0 10px;
    & .add-templ__blank--name {
      width: 100%;
      height: 20px;
    }
    & .add-templ__blank--abbot {
      width: 60%;
      height: 20px;
      color: $col-basic;
      font-style: italic;
      font-size: 0.8em;
    }
    & .add-templ__blank--label {
      width: 40%;
      height: 20px;
      color: $col-bg-hover-max;
      font-style: italic;
      font-size: 0.8em;
    }
  }
}
</style>