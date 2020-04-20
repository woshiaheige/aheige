<template>
  <div>
    <a-drawer
      title="配置站点运维方案"
      :placement="placement"
      :closable="false"
      @close="onClose"
      :width="980"
      :visible="visible"
    >
      <a-card :bordered="false">
        <a-form layout="inline">
          <a-form-item label="计划名称">
            <a-input></a-input>
          </a-form-item>
          <a-form-item label="运维期限">
            <a-range-picker></a-range-picker>
          </a-form-item>
        </a-form>
        <a-divider></a-divider>
        <a-transfer
          :titles="['所有方案', '已配置方案']"
          :listStyle="{
            width: '300px',
            height: '300px'
          }"
        />
        <a-divider></a-divider>
        <a-button type="primary">配置方案</a-button>
      </a-card>
    </a-drawer>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    planDetail: {
      required: false
    }
  },
  data() {
    return {
      placement: "right"
    };
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
    }
    // onChange(e) {
    //   this.placement = e.target.value;
    // }
  }
};
</script>
