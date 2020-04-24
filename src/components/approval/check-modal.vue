<template>
  <a-modal title="基本信息" :visible="visible" width="60%" @cancel="cancel">
    <a-steps :current="1" v-margin:bottom="20">
      <a-step>
        <template slot="title">
          发起审批
        </template>
        <span slot="description">{{ gmtCreate }}</span>
      </a-step>
      <a-step title="审批中" :description="gmtModified" />
      <a-step title="审批完成" description="" />
    </a-steps>
    <a-row v-margin:bottom="10">
      <a-col :span="12"
        ><span class="descriptions">审批标题：</span>{{ title }}</a-col
      >
      <a-col :span="12">
        <span class="descriptions">状态：</span>
        <a-tag v-if="state == 1" color="green">未处理</a-tag>
        <a-tag v-if="state == 2" color="cyan">处理中</a-tag>
        <a-tag v-if="state == 3" color="blue">通过</a-tag>
        <a-tag v-if="state == 4" color="red">未通过</a-tag>
      </a-col>
    </a-row>
    <a-row v-margin:bottom="10">
      <a-col :span="12"
        ><span class="descriptions">创建时间：</span>{{ gmtCreate }}</a-col
      >
      <a-col :span="12"
        ><span class="descriptions">类型：</span>
        <a-tag color="green" v-if="type == 1">任务延迟</a-tag>
        <a-tag color="blue" v-if="type == 2">任务转交</a-tag>
      </a-col>
    </a-row>
    <a-row v-margin:bottom="10">
      <a-col :span="12"
        ><span class="descriptions">审批内容：</span>{{ content }}</a-col
      >
    </a-row>
    <div slot="footer">
      <a-button @click="cancel">取消</a-button>
      <a-button type="primary" @click="approvalClick(true)">通过</a-button>
      <a-button type="danger" @click="approvalClick(false)">拒绝</a-button>
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

<style lang="less" scoped></style>
