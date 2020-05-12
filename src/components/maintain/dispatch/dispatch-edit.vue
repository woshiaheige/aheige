<template>
  <a-modal
    title="调度任务"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
    :maskClosable="false"
  >
    <a-form-model
      ref="form"
      :model="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="调度日期">
        <a-select
          v-model="form.date"
          placeholder="请选择"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="item in dateList"
            :key="item.value"
            :disabled="item.disable"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="调度小组">
        <a-select
          v-model="form.group"
          placeholder="请选择"
          showSearch
          :filterOption="filterOptions"
          @change="changeGroup"
        >
          <a-select-option v-for="item in groupList" :key="item.id">{{
            item.name
          }}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="调度人员">
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
      </a-form-model-item>
    </a-form-model>
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
      required: true,
      type: Object
    },
    week: {
      required: true,
      type: String
    },
    day: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      form: { date: 0, member: "" },
      groupId: "",
      memberList: [],
      groupList: []
    };
  },
  computed: {
    dateList() {
      let list = [
        { name: "星期日", value: 0, disable: false },
        { name: "星期一", value: 1, disable: false },
        { name: "星期二", value: 2, disable: false },
        { name: "星期三", value: 3, disable: false },
        { name: "星期四", value: 4, disable: false },
        { name: "星期五", value: 5, disable: false },
        { name: "星期六", value: 6, disable: false }
      ];

      if (this.week == "this") {
        list.forEach(item => {
          if (item.value < Number(this.$moment().format("d"))) {
            item.disable = true;
          }
        });
      } else {
        list.forEach(item => {
          item.disable = false;
        });
      }
      return list;
    },
    today() {
      return Number(this.$moment().format("d"));
    }
  },
  watch: {
    async visible(newVal) {
      if (newVal) {
        await this.getAllGroup();
        await this.getMemberByGroup(this.missionDetail.groupId);
        this.form.date = this.day;
        this.form.group = this.missionDetail.groupId;
        this.form.member = this.missionDetail.handleId;
      }
    }
  },
  methods: {
    closeModal() {
      this.$refs.form.resetFields();
      this.$emit("close");
    },
    async getMemberByGroup(groupId) {
      let data = {
        groupId
      };
      await this.$api.organization.getUserByGroupId(data).then(res => {
        this.memberList = res.data.data;
        this.form.member =
          this.memberList.length > 0 ? this.memberList[0].id : "";
      });
    },
    async getAllGroup() {
      await this.$api.common.selectGroup().then(res => {
        if (res.data.state == 0) {
          this.groupList = res.data.data;
        }
      });
    },
    changeGroup(value) {
      this.form.group = value;
      this.getMemberByGroup(value);
    },
    handleOk() {
      let data = {
        id: this.missionDetail.id,
        dateTime: "",
        userId: this.form.member
      };
      if (this.week == "this") {
        data.dateTime =
          this.$moment()
            .subtract(this.today - this.form.date, "d")
            .format("YYYY-MM-DD") + " 00:00:00";
      } else {
        if (this.form.date >= this.today) {
          data.dateTime =
            this.$moment()
              .add(this.form.date - this.today, "d")
              .add(7, "d")
              .format("YYYY-MM-DD") + " 00:00:00";
        } else {
          data.dateTime =
            this.$moment()
              .subtract(this.today - this.form.date, "d")
              .add(7, "d")
              .format("YYYY-MM-DD") + " 00:00:00";
        }
      }

      if (this.form.member !== "") {
        this.$api.maintain.missionDispatch(data).then(res => {
          if (res.data.state == 0) {
            this.$message.success("调度成功");
            this.closeModal();
          }
        });
      } else {
        this.$message.warning("请选择要调度的组员");
      }
    }
  }
};
</script>
