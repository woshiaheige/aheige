<template>
  <div class="counter">
    <a-input-number style="width:200px" :value="value" @change="change">
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
    change(e) {
      console.log(e);
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
