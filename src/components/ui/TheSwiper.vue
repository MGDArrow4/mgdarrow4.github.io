<template>
  <div class="js-swiper" ref="swiperBlock">
    <div class="js-swiper__delete" ref="delete">
      <font-awesome-icon :icon="['fas', 'trash']" />
    </div>
    <div class="js-swiper__edit" ref="edit">
      <font-awesome-icon :icon="['fas', 'pencil']" />
    </div>
    <div class="js-swiper__main" ref="swiper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSwiper",
  mounted() {
    let swiper = this.$refs.swiper;

    let pointGet,
      x1,
      y1,
      xDiff,
      yDiff = null;

    swiper.addEventListener("touchstart", (el) => {
      pointGet = swiper.offsetWidth;
      x1 = el.touches[0].clientX;
      y1 = el.touches[0].clientY;
      swiper.style.transition = `none`;
      this.$refs.delete.style.transition = `none`;
      this.$refs.edit.style.transition = `none`;

      this.$refs.edit.style.height = `${swiper.clientHeight}px`;
      this.$refs.delete.style.height = `${swiper.clientHeight}px`;
    });

    swiper.addEventListener("touchmove", (el) => {
      let x2 = el.touches[0].clientX;
      let y2 = el.touches[0].clientY;
      xDiff = x2 - x1;
      yDiff = y2 - y1;
      if (
        Math.abs(xDiff) > pointGet / 8 &&
        Math.abs(xDiff) > Math.abs(yDiff) * 2
      ) {
        swiper.style.translate =
          xDiff < 0 ? `${xDiff + pointGet / 8}px` : `${xDiff - pointGet / 8}px`;

        if (xDiff > 0) {
          this.$refs.delete.style.width = `${Math.abs(xDiff) - pointGet / 8}px`;
          this.$refs.edit.style.width = `0px`;
        } else {
          this.$refs.delete.style.width = `0px`;
          this.$refs.edit.style.width = `${Math.abs(xDiff) - pointGet / 8}px`;
        }

        if (pointGet / 1.3 < Math.abs(xDiff)) {
          this.$refs.delete.style.opacity = `1`;
          this.$refs.edit.style.opacity = `1`;
        } else {
          this.$refs.delete.style.opacity = `0.8`;
          this.$refs.edit.style.opacity = `0.8`;
        }
      }
    });
    swiper.addEventListener("touchend", () => {
      if (pointGet / 1.3 < Math.abs(xDiff)) {
        if (xDiff < 0) {
          swiper.style.transition = `0.4s ease-in-out`;
          swiper.style.translate = `0px`;
          this.$refs.edit.style.transition = `0.4s ease-in-out`;
          this.$refs.edit.style.width = `0px`;

          this.$emit("swipe", "edit");
        } else {
          swiper.style.transition = `0.4s ease-in-out`;
          swiper.style.translate = `${pointGet}px`;
          this.$refs.delete.style.transition = `0.4s ease-in-out`;
          this.$refs.delete.style.width = `${pointGet}px`;

          this.$refs.swiperBlock.style.height = `${swiper.offsetHeight + 5}px`;
          this.$refs.swiperBlock.style.transition = `0.4s ease-in-out`;
          setTimeout(() => {
            this.$refs.swiperBlock.style.height = `0px`;
          }, 100);

          this.$emit("swipe", "delete");
        }
      } else {
        swiper.style.transition = `0.4s ease-in-out`;
        swiper.style.translate = `0px`;

        this.$refs.delete.style.transition = `0.4s ease-in-out`;
        this.$refs.delete.style.width = `0px`;
        this.$refs.edit.style.transition = `0.4s ease-in-out`;
        this.$refs.edit.style.width = `0px`;
      }
    });
  },
};
</script>

<style lang="scss">
.js-swiper {
  position: relative;
  width: 100%;
  //   height: max-content;
  overflow: hidden;
}

.js-swiper__delete,
.js-swiper__edit {
  position: absolute;
  width: 0px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  opacity: 0.8;
  & svg {
    display: block;
  }
}

.js-swiper__delete {
  left: 0;
  background: $col-red;
}
.js-swiper__edit {
  right: 0;
  background: $col-basic;
}

.js-swiper__main {
  position: relative;
  width: 100%;
  height: max-content;
}
</style>