<template>
  <a-modal title="基本信息" :visible="visible" width="60%" @cancel="cancel">
    <a-steps :current="current" v-margin:bottom="20">
      <a-step>
        <template slot="title">
          发起审批
        </template>
        <span slot="description">{{ gmtCreate }}</span>
      </a-step>
      <a-step title="审批中" />
      <a-step title="审批完成" :description="approvalTime" />
    </a-steps>
    <a-row v-margin:bottom="10">
      <a-col :span="12"
        ><span class="descriptions">审批标题：</span>{{ title }}</a-col
      >
      <a-col :span="12"
        ><span class="descriptions">审批内容：</span>{{ content }}</a-col
      >
    </a-row>
    <a-row v-margin:bottom="10">
      <a-col :span="12" v-if="approvalName"
        ><span class="descriptions">审批人：</span>{{ approvalName }}</a-col
      >
      <a-col :span="12" v-if="stateStr"
        ><span class="descriptions">审批结果：</span>{{ stateStr }}</a-col
      >
    </a-row>
    <div slot="footer">
      <a-button @click="cancel">关闭</a-button>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: function() {
        return {};
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: "",
      content: "",
      state: 1,
      gmtCreate: "",
      gmtModified: "",
      type: 1,
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
      number: {
        value: 11
      }
    };
  },
  computed: {
    stateStr() {
      if (this.obj.info.state == 1 || this.obj.info.state == 2) {
        return "";
      } else if (this.obj.info.state == 3) {
        return "通过";
      } else {
        return "未通过";
      }
    },
    approvalName() {
      if (this.obj.info.approvalName) {
        return this.obj.info.approvalName;
      } else {
        return "";
      }
    },
    approvalTime() {
      if (this.obj.info.approvalTime) {
        return this.obj.info.approvalTime;
      } else {
        return "";
      }
    },
    current() {
      if (this.obj.info.state == 1) {
        return 1;
      } else if (this.obj.info.state == 2) {
        return 2;
      } else {
        return 3;
      }
    },
    id() {
      return this.obj.info.id;
    }
  },
  watch: {
    visible() {
      if (this.visible == true) {
        this.getTaskInfo();
      }
    }
  },
  methods: {
    getTaskInfo() {
      let data = {
        id: this.id
      };
      this.$api.approval
        .getTaskInfo(data)
        .then(res => {
          console.log(res);
          this.title = res.data.data.title;
          this.content = res.data.data.content;
          this.state = res.data.data.state;
          this.gmtCreate = res.data.data.gmtCreate;
          this.gmtModified = res.data.data.gmtModified;
          this.type = res.data.data.type;
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="less" scoped></style>
