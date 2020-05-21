import Vue from "vue";

const margin = Vue.directive("margin", {
  inserted: function(el, binding) {
    switch (binding.arg) {
      case "left":
        el.style.marginLeft = binding.value + "px";
        break;
      case "right":
        el.style.marginRight = binding.value + "px";
        break;
      case "top":
        el.style.marginTop = binding.value + "px";
        break;
      case "bottom":
        el.style.marginBottom = binding.value + "px";
        break;
      default:
        el.style.margin = binding.value + "px";
        break;
    }
  }
});

const padding = Vue.directive("padding", {
  inserted: function(el, binding) {
    switch (binding.arg) {
      case "left":
        el.style.paddingLeft = binding.value + "px";
        break;
      case "right":
        el.style.paddingRight = binding.value + "px";
        break;
      case "top":
        el.style.paddingTop = binding.value + "px";
        break;
      case "bottom":
        el.style.paddingBottom = binding.value + "px";
        break;
      default:
        el.style.padding = binding.value + "px";
        break;
    }
  }
});

const radius = Vue.directive("radius", {
  inserted: function(el, binding) {
    el.style.borderRadius = binding.value + "px";
  }
});

const color = Vue.directive("color", {
  inserted: function(el, binding) {
    el.style.color = binding.value;
  }
});

const backgroundColor = Vue.directive("bgcolor", {
  inserted: function(el, binding) {
    switch (binding.arg) {
      case "white":
        el.style.backgroundColor = "#fff";
        break;
      default:
        el.style.backgroundColor = binding.value;
        break;
    }
  }
});

const fontSize = Vue.directive("fontsize", {
  inserted: function(el, binding) {
    el.style.fontSize = binding.value + "px";
  }
});

const fontWeight = Vue.directive("fontWeight", {
  inserted: function(el, binding) {
    el.style.fontWeight = binding.value + "px";
  }
});

const width = Vue.directive("width", {
  inserted: function(el, binding) {
    el.style.width = binding.value + "px";
  }
});

const height = Vue.directive("height", {
  inserted: function(el, binding) {
    el.style.height = binding.value + "px";
  }
});

const scale = Vue.directive("scale", {
  inserted: function(el, binding) {
    el.style.transform = "scale(" + binding.value + ")";
  }
});

const translate = Vue.directive("translate", {
  inserted: function(el, binding) {
    switch (binding.arg) {
      case "x":
        el.style.transform = "translateX(" + binding.value + "px)";
        break;
      case "y":
        el.style.transform = "translateY(" + binding.value + "px)";
        break;
      case "z":
        el.style.transform = "translateZ(" + binding.value + "px)";
        break;
    }
  }
});

const rotate = Vue.directive("rotate", {
  inserted: function(el, binding) {
    switch (binding.arg) {
      case "x":
        el.style.transform = "rotateX(" + binding.value + "deg)";
        break;
      case "y":
        el.style.transform = "rotateY(" + binding.value + "deg)";
        break;
      case "z":
        el.style.transform = "rotateZ(" + binding.value + "deg)";
        break;
    }
  }
});

const prevent = Vue.directive("preventReClick", {
  inserted(el, binding) {
    el.addEventListener("click", () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, binding.value || 30000);
      }
    });
  }
});

const focus = Vue.directive("focus", {
  inserted(el, binding) {
    // 聚焦元素
    if (binding.value) {
      el.focus();
    }
  }
});

export default {
  margin,
  color,
  padding,
  radius,
  backgroundColor,
  fontSize,
  width,
  height,
  scale,
  prevent,
  focus,
  fontWeight,
  translate,
  rotate
};
