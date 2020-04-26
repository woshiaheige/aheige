<template>
  <div class="counter">
    <a-input-number
      style="width:200px"
      :value="value"
      @change="change"
      :min="0"
      :formatter="formatter"
      :max="10000000"
    >
      <!-- <a-icon type="minus" slot="prefix" class="add" @click="subtract"/>
      <a-tooltip slot="suffix"> <a-icon type="plus" @click="add"/></a-tooltip
    > -->
    </a-input-number>
    <span v-margin:left="10">
      <slot name="uni"> </slot>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {};
  },
  methods: {
    subtract() {
      //减法
      let val = this.value;
      --val;
      this.$emit("input", val);
    },
    add() {
      //加法
      let val = this.value;
      ++val;
      this.$emit("input", val);
    },
    formatter(value) {
      let str = "" + value;
      if (str.indexOf(".") != -1) {
        let arr = str.split("");
        arr.splice(arr.length - 1);
        let str2 = arr.join("");
        value = +str2;
      }
      return value;
    },
    change(e) {
      // console.log(e);
      this.$emit("input", e);
    }
  }
};
</script>
<style lang="less" scoped>
.counter {
  .add {
    cursor: pointer;
  }
}
</style>
<style lang="less">
.counter {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
}
</style>
