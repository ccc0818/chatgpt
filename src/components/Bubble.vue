<script setup>
const props = defineProps({
  isUser: {
    type: Boolean,
    require: true,
    default: false,
  },
  avatar: {
    type: String,
    default: undefined
  },
  message: String
});
</script>

<template>
  <div v-if="!isUser" class="wrapper">
    <div class="avatar">
      <img class="img" :src="avatar">
    </div>
    <div class="blob">
      {{message}}
    </div>
  </div>
  <div v-else class="wrapper wrapper-user">
    <div class="blob blob-user">
      {{message}}
    </div>
    <div v-if="avatar !== undefined" class="avatar avatar-user">
      <img class="img" :src="avatar">
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 80px;
  padding: 10px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.wrapper-user {
  justify-content: flex-end
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}
.avatar-user {
  margin-right: 0px;
  margin-left: 10px;
}
.avatar .img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-user-drag: none;
}
.blob {
  font-size: 15px;
  background-color: #d7d8db;
  color: #161d2f;
  max-width: 70%;
  padding: 15px;
  margin-top: 10px;
  border-radius: 3px 12px 12px 12px;
  box-sizing: border-box;
  word-break: break-all;
  white-space: pre-wrap;
  transition: width height .3s linear;
}
.blob-user {
  border-radius: 12px 3px 12px 12px;
  color: #f1f2f6;
  background-color: #161d2f;
}
</style>
