<template>
  <a-modal
    :title="info.name + '的详细信息'"
    v-model="status"
    @cancel="handleCancel"
    class="member-modal-detail"
  >
    <template slot="footer">
      <a-button key="back" @click="handleCancel">关闭</a-button>
    </template>

    <a-row :gutter="16">
      <a-col :span="8">
        <a-avatar :size="124" icon="user" />
      </a-col>
      <a-col :span="16">
        <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-form-item label="姓名">{{ info.name }} </a-form-item>
          <a-form-item label="邮箱">{{ info.email }}</a-form-item>
          <a-form-item label="手机">{{ info.tel }} </a-form-item>
          <a-form-item label="座机">{{ info.telNum }} </a-form-item>
          <a-form-item label="性别">{{ info.sex }}</a-form-item>
          <a-form-item label="职位">{{ info.position }} </a-form-item>
          <a-form-item label="部门">{{ info.department }} </a-form-item>
          <a-form-item label="角色">{{ info.role }} </a-form-item>
          <a-form-item label="工号">{{ info.num }} </a-form-item>
          <a-form-item label="地点">{{ info.address }} </a-form-item>
          <a-form-item label="状态">{{ info.status }} </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script>
export default {
  props: {
    obj: Object
  },
  data() {
    return {
      info: ""
    };
  },
  computed: {
    status: {
      get() {
        return this.obj.show;
      },
      set() {}
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel", false);
    }
  },
  mounted() {},
  watch: {
    status() {
      if (this.status == true) {
        console.log(this.info);
        this.info = this.obj.row;
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
