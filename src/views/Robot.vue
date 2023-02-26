<script setup>
import { storeToRefs } from 'pinia';
import { ref, reactive } from 'vue';
import { Overlay, Field, CellGroup, Form, Button } from 'vant';
import { onBeforeRouteLeave, useRouter } from 'vue-router';
import useStore from '../store';

const router = useRouter();
const { robotStore } = useStore();
const { robots } = storeToRefs(robotStore);
const { setOneRobot, initRobots, removeOneRobot } = robotStore;
const showOverlay = ref(false);
const showContext = ref(false);
const contextEl = ref(null);
const viewEl = ref(null);
const transformOrigin = ref('top left');
const robotInfo = reactive({
  name: '',
  type: '',
  salutation: '',
  character: ''
});
let currentSelect;
let timer;

// 初始化机器人数据
initRobots();

onBeforeRouteLeave(() => {
  showContext.value = false;
  showOverlay.value = false;
});

// methods
const onRobot = (item) => {
  if (showContext.value) {
    showContext.value = false;
    return;
  }

  if (robots.value.currentRobot != item) {
    robots.value.changed = true;
    robots.value.currentRobot = item;
  }
  router.replace('/home/chat')
}

const onAddRobot = (form) => {
  let { name, type, salutation, character } = form;
  type = `现在开始, 你的名字是${name}, 你将模仿为${type}, 你的性格是${character}。`;
  setOneRobot({ name, type, salutation, avatar: '/assets/images/openai.png' });
  robotInfo.name = '';
  robotInfo.type = '';
  robotInfo.salutation = '';
  robotInfo.character = '';
  showOverlay.value = false;
}

const onShowContext = (x, y, idx) => {
  showContext.value = true;
  currentSelect = idx;

  if (x + 165 > viewEl.value.clientWidth) {
    transformOrigin.value = 'top right';
    contextEl.value.style.left = x - 165 + 'px';
  } else {
    transformOrigin.value = 'top left';
    contextEl.value.style.left = x + 5 + 'px';
  }
  contextEl.value.style.top = y + 5 + 'px';
}
</script>

<template>
  <div ref="viewEl" id="robot" class="view" @click="showContext = false" @contextmenu.prevent>
    <div class="cell" v-for="i of robots.robots" :key="i.id" @click.stop="onRobot(i)" @contextmenu.prevent>
      <img :src="i.avatar" alt="图片加载失败" draggable="false" unselectable>
      <span class="name" unselectable>{{ i.name }}</span>
    </div>
    <div class="cell" v-for="(i, idx) of robots.userRobots" :key="i.id" @click.stop="onRobot(i)"
      v-longpress="(e) => { showContext = false;; onShowContext(e.touches[0].pageX, e.touches[0].pageY, idx) }"
      @contextmenu.prevent.stop="onShowContext($event.target.offsetLeft + $event.offsetX, $event.target.offsetTop + $event.offsetY, idx)">
      <img :src="i.avatar" alt="图片加载失败" draggable="false" unselectable>
      <span class="name" unselectable>{{ i.name }}</span>
    </div>
    <div class="cell" @click="showOverlay = true;" @contextmenu.prevent="">
      <span class="iconfont icon-jia add"></span>
      <span class="name">添加机器人</span>
    </div>

    <Overlay :show="showOverlay" @click.stop="showOverlay = false"
      :custom-style="{ backdropFilter: 'blur(20px)' }">
      <CellGroup inset @click.stop="" class="cell-group">
        <Form @submit="onAddRobot" show-error>
          <!-- 名称 -->
          <Field v-model="robotInfo.name" name="name" placeholder="定义AI名字" :rules="[{ required: true }]" />
          <!-- 类型 -->
          <Field v-model="robotInfo.type" name="type" placeholder="定义你的AI的职业或者物种" :rules="[{ required: true }]" />
          <!-- 性格 -->
          <Field v-model="robotInfo.character" name="character" placeholder="简单描述一下你的AI的性格" />
          <!-- 问候语 -->
          <Field v-model="robotInfo.salutation" name="salutation" placeholder="输入一下AI打招呼的语句"
            :rules="[{ required: true }]" />
          <!-- 提交按钮 -->
          <Button class="add-btn" block native-type="submit">添加</Button>
        </Form>
      </CellGroup>
    </Overlay>

    <Transition name="context">
      <div class="context" v-show="showContext" ref="contextEl" :style="{ transformOrigin }">
        <div class="menu-item" @click="() => { removeOneRobot(currentSelect); showContext = false; }">
          <span class="iconfont icon-shanchu icon" />
          <span class="text">删除</span>
        </div>

      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/icon-fonts/iconfont.css';

.view {
  display: grid;
  height: 100%;
  overflow-y: auto;
  justify-content: space-between;
  padding: 20px;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-rows: repeat(auto-fit, 110px);
  gap: 10px;
  // background-color: #eee;
  position: relative;

  .cell {
    width: 100px;
    height: 100%;
    // overflow: hidden;
    padding: 5px 0;
    position: relative;
    user-select: none;

    img {
      width: 80px;
      height: 80px;
      margin: 0 10px;
      display: block;
      padding: 0;
      object-fit: contain;
      background-color: lighten($theme, 20);
      border-radius: 10px;
      pointer-events: none;
    }

    .name {
      display: block;
      width: 100%;
      height: 15px;
      font-size: 12px;
      color: $theme;
      text-align: center;
      line-height: 15px;
      margin-top: 10px;
    }

    .add {
      color: #eee;
      display: block;
      width: 80px;
      height: 80px;
      margin: 0 auto;
      text-align: center;
      border-radius: 10px;
      line-height: 80px;
      font-size: 48px;
      user-select: none;
      background-color: rgba($color: $theme, $alpha: 0.5);
    }

    .badge-icon {
      display: block;
      font-size: 32px;
      line-height: 80px;
      width: 80px;
      height: 80px;
      text-align: center;
      background-color: rgba(237, 113, 113, 0.252);
      backdrop-filter: blur(8px);
      color: #eee;
      position: absolute;
      border-radius: 8px;
      top: 5px;
      right: 10px;
    }
  }

  .cell-group {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: clamp(300px, 80%, 500px);

    .add-btn {
      outline: none;
      border: none;
      background-color: $theme;
      width: clamp(150px, 80%, 400px);
      height: 40px;
      margin: 10px auto;
      display: block;
      border-radius: 5px;
      color: #eee;
      font-size: 14px;
      letter-spacing: 30px;
      padding-left: 30px;
    }
  }

  .context {
    width: 160px;
    // background-color: #eee;
    border-radius: 3px;
    position: fixed;
    left: 0;
    top: 0;
    padding: 5px;
    transition: all .2s ease-out;
    box-shadow: 0 10px 30px rgb(0 0 0 / 50%);
    transform-origin: top left;

    .menu-item {
      display: flex;
      height: 30px;
      font-size: 14px;
      color: $theme;
      border-radius: 3px;
      text-align: center;
      line-height: 30px;
      user-select: none;
      justify-content: flex-start;
      padding: 0 10px;

      &:hover {
        background-color: rgba(100, 100, 100, 0.5);
      }

      &:nth-last-child(1):hover {
        background-color: rgba(255, 100, 100, 0.5);
        color: red;
      }

      .text {
        flex: 1;
        text-align: left;
        margin-left: 10px;
      }
    }
  }

  .context-enter-from,
  .context-leave-to {
    opacity: 0;
    transform: scale(0);
  }

  .context-enter-to,
  .context-leave-from {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
