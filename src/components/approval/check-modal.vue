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
    <div class="description-wrapper">
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="审批标题"></a-descriptions-item>
        <a-descriptions-item label="审批内容">{{
          content
        }}</a-descriptions-item>
        <a-descriptions-item label="审批人" v-if="approvalName">{{
          approvalName
        }}</a-descriptions-item>
        <a-descriptions-item label="审批结果" v-if="stateStr">{{
          stateStr
        }}</a-descriptions-item>
      </a-descriptions>
    </div>

    <div slot="footer">
      <a-button @click="cancel">关闭</a-button>
      <a-button
        type="primary"
        @click="approvalClick(true)"
        v-if="obj.info.state < 3"
        >通过</a-button
      >
      <a-button
        type="danger"
        @click="approvalClick(false)"
        v-if="obj.info.state < 3"
        >拒绝</a-button
      >
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object
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
    //审核按钮点击事件
    approvalClick(state) {
      let data = {
        taskId: this.obj.info.taskId,
        pass: state,
        approvalId: this.id
      };
      this.$api.approval
        .getApprovalTask(data)
        .then(res => {
          console.log(res);
          if (res.data.state == 0) {
            this.$message.success("审核成功");
            this.$emit("cancel");
            this.$emit("getTableData");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取任务详情
    getTaskInfo() {
      let data = {
        id: this.id
      };
      this.$api.approval
        .getTaskInfo(data)
        .then(res => {
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
    //关闭事件
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>
