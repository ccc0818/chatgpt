let timer = null;
let callBack = null;

function touchstartHandle(e) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    // 触发长按事件
    callBack && callBack(e);
  }, 800);
}

function longPressCancelHandle() {
  clearTimeout(timer);
}

export default {
  created(el, binding) {
    callBack = binding.value;
    el.addEventListener("touchstart", touchstartHandle);
    el.addEventListener("touchend", longPressCancelHandle);
    el.addEventListener("touchmove", longPressCancelHandle);
  },
  unmounted(el, binding) {
    el.removeEventListener("touchstart", touchstartHandle);
    el.removeEventListener("touchend", longPressCancelHandle);
    el.removeEventListener("touchmove", longPressCancelHandle);
  },
};
