import "./showMessage.scss";

export function showMessage(
  { type = "primary", message = "", duration = 1000 },
  dom
) {
  if (dom === undefined) {
    dom = document.querySelector("body");
  }

  if (getComputedStyle(dom).position === "static") {
    dom.style.position = "relative";
  }

  const msgDom = document.createElement("div");
  msgDom.id = "message";
  msgDom.classList.add(type);
  msgDom.innerHTML = `<p>${message}</p>`;

  msgDom.style.transform = 'translate(-50%, -50%) translateY(80px)'
  msgDom.style.opacity = 0
  dom.appendChild(msgDom);
  msgDom.clientHeight;
  msgDom.style.transform = "translate(-50%, -50%) translateY(0)";
  msgDom.style.opacity = 1;
  

  if (duration) {
    setTimeout(() => {
      msgDom.style.transform = "translate(-50%, -50%) translateY(-80px)";
      msgDom.style.opacity = 0;
      msgDom.ontransitionend = () => msgDom.remove();
    }, duration);
  }
}
