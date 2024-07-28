<template>
  <div class="read-funeral">
    <div class="funeral__time">{{ funeral.time }}</div>
    <div class="funeral__info">
      <div
        class="funeral-info__location"
        :class="{ 'funeral-info__location--ws': !funeral.surname }"
      >
        {{
          funeral.locationTempl ||
          funeral.locationCemetery ||
          funeral.locationAddress
        }}
      </div>
      <div class="funeral-info__surname" v-if="funeral.surname">
        {{ funeral.surname }}
      </div>
      <div
        class="funeral-info__templ"
        v-if="funeral.locationTempl !== funeral.templ"
      >
        <span :class="{ 'funeral-red': funeral.templ === 'false' }">{{
          isTempl(funeral.templ)
        }}</span>
      </div>
    </div>
    <div class="funeral__status">
      <font-awesome-icon
        :icon="['fab', 'bitcoin']"
        :class="{
          'funeral-red-payment': !funeral.payment,
          'funeral-green': funeral.payment,
        }"
      />
      <font-awesome-icon
        :icon="['fas', 'circle-check']"
        v-if="funeral.phoneLocation !== null"
        :class="{
          'funeral-red':
            funeral.phoneLocation === 'false' ||
            funeral.phoneLocation === false,
          'funeral-green':
            funeral.phoneLocation === 'true' || funeral.phoneLocation === true,
        }"
      />
      <font-awesome-icon
        :icon="['fas', 'circle-check']"
        :class="{
          'funeral-red': !funeral.phoneTempl,
          'funeral-green': funeral.phoneTempl,
        }"
      />
    </div>
    <div class="funeral__comment" v-if="funeral.comment">
      *{{ funeral.comment }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ReadPoint",
  props: ["funeral"],
  methods: {
    isTempl(templ) {
      return templ === "false" || templ === false ? "Не распределено" : templ;
    },
  },
};
</script>

<style lang="scss">
.read-funeral {
  width: 100%;
  min-height: 45px;
  font-weight: 400;
  margin-bottom: 5px;
  background: $col-bg-dark-hover;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  & .funeral__time {
    width: 15%;
    font-size: 1.3em;
    font-weight: 500;
    text-align: center;
  }
  & .funeral__info {
    width: calc(78% - 10px);
    margin: 0 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
    & .funeral-info__location {
      width: 65%;
      padding: 2px 0;
      &.funeral-info__location--ws {
        width: 100%;
      }
    }
    & .funeral-info__surname {
      width: 35%;
      padding: 2px 0;
      color: $col-basic;
    }
    & .funeral-info__templ {
      width: 100%;
      border-top: 1px solid $col-basic;
      padding: 2px 0;
    }
  }
  & .funeral__status {
    text-align: center;
    width: 7%;
    & svg {
      width: 80%;
    }
  }
  & .funeral__comment {
    width: 100%;
    margin-top: 3px;
    padding: 2px 0;
    font-size: 0.9em;
    text-align: center;
    font-style: italic;
    font-weight: 300;
    color: $col-basic;
    background: $col-bg-dark-hover;
    border-top: 1px solid $col-basic;
  }
}
.funeral-red {
  color: $col-red;
}
.funeral-red-payment {
  color: $col-red;
  font-size: 1em;
  // filter: drop-shadow(0px 0px 0px $col-red);
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: paymentNone;
}
.funeral-green {
  color: $col-green;
}
@keyframes paymentNone {
  0% {
    // font-size: 1em;
    filter: drop-shadow(0px 0px 0px $col-red);
  }

  50% {
    font-size: 1.2em;
    color: $col-basic;
    filter: drop-shadow(0px 0px 1px $col-basic);
  }
  100% {
    // font-size: 1em;
    filter: drop-shadow(0px 0px 0px $col-red);
  }
}
</style>