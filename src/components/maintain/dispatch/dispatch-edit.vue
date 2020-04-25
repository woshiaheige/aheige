<template>
  <a-modal
    title="调度任务"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
    :maskClosable="false"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="调度日期">
        <a-select
          v-model="form.date"
          placeholder="请选择"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option key="1" value="1">星期一</a-select-option>
          <a-select-option key="2" value="2">星期二</a-select-option>
          <a-select-option key="3" value="3">星期三</a-select-option>
          <a-select-option key="4" value="4">星期四</a-select-option>
          <a-select-option key="5" value="5">星期五</a-select-option>
          <a-select-option key="6" value="6">星期六</a-select-option>
          <a-select-option key="7" value="7">星期日</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="调度人员">
        <a-select
          v-model="form.member"
          placeholder="请选择"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option v-for="item in memberList" :key="item.id">{{
            item.name
          }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    missionDetail: {
      required: false
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      groupId: "",
      memberList: []
    };
  },
  computed: {},
  watch: {
    visible(newVal) {
      if (newVal) {
        this.getMemberByGroup();
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    reset() {
      this.groupId = "";
      this.form.resetFields();
    },
    getMemberByGroup() {
      let data = {
        groupId: this.missionDetail.groupId
      };
      this.$api.organization.getUserByGroupId(data).then(res => {
        this.memberList = res.data.data;
      });
    },
    handleOk() {
      let data = {
        id: this.missionDetail.id
      };

      this.$api.maintain.missionDispatch(data).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
