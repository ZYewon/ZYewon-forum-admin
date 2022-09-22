import { App } from "vue";
export default {
  install(app: App) {
    app.directive("hasBtn", {
      mounted(el, binding) {
        const btns = JSON.parse(localStorage.getItem("btns") || "[]");
        if (btns.length > 0) {
          if (!btns.includes(binding.value)) {
            el.parentNode.removeChild(el);
          }
        }
      },
    });
  },
};
