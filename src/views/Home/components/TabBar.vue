<script setup>
defineProps({
  items: { // maxlength = 4 
    type: Array,
    required: true,
    default: []
  }
})
</script>

<template>
  <div class="tabbar-container">
    <RouterLink class="link" active-class="active" v-slot="{isActive}" v-for="(item, index) in items.splice(0, 4)" :key="index" :to="item.to">
      <figure>
        <img v-if="item.image && item.selectedImage" :src="isActive ? item.selectedImage : item.image">
        <figcaption>{{ item.title }}</figcaption>
      </figure>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.tabbar-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: $tabbar-bg;
  backdrop-filter: blur(8px);
  color: #2c2c2c;
  z-index: 99;

  .link {
    height: 100%;
    font-size: 12px;
    padding: 3px 0;

    figure {
      height: 100%;
      text-align: center;
      overflow: hidden;

      img {
        height: 60%;
        pointer-events: none;
        padding-bottom: 0;
      }

      figcaption {
        padding-top: 0;
        transform: scale(0.6) translateY(-10px);
        text-align: center;
      }
    }
  } 
}

.active {
  color: $theme;
}
</style>
