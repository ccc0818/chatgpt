<script setup>
import TabBar from './components/TabBar.vue';
import chatImage from '@/assets/images/tabbar/message.png';
import chatImageActive from '@/assets/images/tabbar/message-active.png';
import robotImage from '@/assets/images/tabbar/robot.png';
import robotImageActive from '@/assets/images/tabbar/robot-active.png';
import personImage from '@/assets/images/tabbar/person.png';
import personImageActive from '@/assets/images/tabbar/person-active.png';
import imgImage from '@/assets/images/tabbar/image.png';
import imgImageActive from '@/assets/images/tabbar/image-active.png';


const items = [
  { 
    title: '聊天', 
    to: { name: 'chat' }, 
    selectedImage: chatImageActive, 
    image: chatImage 
  },
  { 
    title: '机器人', 
    to: { name: 'robot' },
    selectedImage: robotImageActive,
    image: robotImage 
  },
  {
    title: '画图',
    to: { name: 'image' },
    selectedImage: imgImageActive,
    image: imgImage
  },
  { 
    title: '个人中心', 
    to: { name: 'user' },
    selectedImage: personImageActive,
    image: personImage     
  }
];
</script>

<template>
  <div class="home-container">
    <!-- 显示区 -->
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component class="container" :is="Component" />
      </KeepAlive>
    </RouterView>
    <!-- 底栏 -->
    <TabBar :items="items" />
  </div>
</template>

<style scoped lang="scss">
.home-container {
  height: 100%;

  .container {
    height: 100%;
    padding-bottom: 50px;
  }
}
</style>
