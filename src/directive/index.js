import Vue from "vue";

//外边距 v-margin:left="5" 即margin-left: 5px
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

//内边距 v-margin:padding="5" padding-left: 5px
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

//圆角 v-radius
const radius = Vue.directive("radius", {
  inserted: function(el, binding) {
    el.style.borderRadius = binding.value + "px";
  }
});

//字体颜色 v-color
const color = Vue.directive("color", {
  inserted: function(el, binding) {
    el.style.color = binding.value;
  }
});

//背景颜色 v-bgcolor
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

//字体大小 v-fontSize
const fontSize = Vue.directive("fontsize", {
  inserted: function(el, binding) {
    el.style.fontSize = binding.value + "px";
  }
});

//字体粗细 v-fontWeight
const fontWeight = Vue.directive("fontWeight", {
  inserted: function(el, binding) {
    el.style.fontWeight = binding.value + "px";
  }
});

//宽度 v-width
const width = Vue.directive("width", {
  inserted: function(el, binding) {
    el.style.width = binding.value + "px";
  }
});

//高度 v-height
const height = Vue.directive("height", {
  inserted: function(el, binding) {
    el.style.height = binding.value + "px";
  }
});

//等比例放大缩小 v-scale
const scale = Vue.directive("scale", {
  inserted: function(el, binding) {
    el.style.transform = "scale(" + binding.value + ")";
  }
});

//平移 v-translate:x="5" 即transform: translateX(5px)
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

//旋转 v-rotate:x="5" 即transform: rotateX(5deg)
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

//防止重复提交 v-preventReClick="500"即500ms内按钮不能重复点击，默认30000ms
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

//聚焦元素
const focus = Vue.directive("focus", {
  inserted(el, binding) {
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
