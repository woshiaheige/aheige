<template>
  <a-modal
    title="新建突发任务"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
    :maskClosable="false"
  >
    <a-form-model
      ref="ruleForm"
      :validateOnRuleChange="true"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="选择企业" prop="enterpriseId">
        <a-select
          showSearch
          v-model="formData.enterpriseId"
          placeholder="请输入"
          style="width: 200px"
        >
          <a-select-option
            v-for="(item, index) in enterpriseList"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="选择站点" prop="pointId">
        <a-select
          :disabled="formData.enterpriseId == ''"
          showSearch
          :value="formData.pointId"
          placeholder="请输入"
          style="width: 200px"
        >
          <a-select-option
            @click="selectStation(item)"
            v-for="(item, index) in pointList"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="运维人员" prop="memberId">
        <a-select
          :disabled="formData.pointId == ''"
          v-model="formData.memberId"
          placeholder="请选择"
          style="width: 200px"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="(item, index) in memberList"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="任务名称" prop="name">
        <a-input placeholder="任务名称" v-model="formData.name" />
      </a-form-model-item>
      <a-form-model-item label="执行时间" prop="gmtExecution">
        <a-date-picker
          v-model="formData.gmtExecution"
          show-time
          type="date"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="开始时间"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item label="任务说明" prop="content">
        <a-input
          v-model="formData.content"
          type="textarea"
          placeholder="请输入"
        />
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
    }
  },
  data() {
    return {
      enterpriseList: [], //企业
      pointList: [], //站点
      groupList: [], //小组
      memberList: [], //成员
      formData: {
        name: "",
        content: "",
        gmtExecution: undefined,
        enterpriseId: "",
        pointId: "",
        memberId: ""
      },
      rules: {
        enterpriseId: [
          {
            required: true,
            message: "请选择企业",
            trigger: "change"
          }
        ],
        pointId: [
          {
            required: true,
            message: "请选择站点",
            trigger: "change"
          }
        ],
        memberId: [
          {
            required: true,
            message: "请选择运维人员",
            trigger: "change"
          }
        ],
        planId: [
          {
            required: true,
            message: "请选择任务项",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入任务名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    status: {
      get() {
        return this.visible;
      },
      set() {}
    }
  },
  watch: {
    status() {
      if (this.status == true) {
        this.formData = {
          name: "",
          content: "",
          gmtExecution: undefined,
          enterpriseId: "",
          pointId: "",
          memberId: ""
        };
      }
    },
    "formData.enterpriseId"() {
      this.$set(this.formData, "pointId", "");
      this.getStationList();
    },
    "formData.pointId"() {
      this.$set(this.formData, "memberId", "");
      this.getMemberList();
    }
  },
  methods: {
    getEnterprise(value) {
      //企业下拉
      // this.formData.enterpriseName = value;
      this.$api.customer
        .getEnterPriseList({ enterpriseName: value })
        .then(res => {
          this.enterpriseList = res.data.data.records;
        });
    },
    getStationList(value) {
      //获取站点
      let params = {
        pointName: value,
        enterpriseId: this.formData.enterpriseId,
        page: 1,
        size: 999
      };
      this.$api.customer.getStationList(params).then(res => {
        this.pointList = res.data.data.records;
      });
    },
    selectStation(item) {
      this.formData.pointId = item.id;
      this.getMemberList(item.groupId);
    },
    getMemberList(groupId) {
      //获取小组成员
      this.$api.organization
        .getUserByGroupId({ groupId: groupId })
        .then(res => {
          if (res.data.state == 0) {
            this.memberList = res.data.data;
          }
        });
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }

        let data = JSON.parse(JSON.stringify(this.formData));

        data.type = 2; //突发任务
        data.handleId = data.memberId;
        delete data.memberId;
        data.gmtExecution = this.$moment(data.gmtExecution).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        this.$api.maintain.addManageTask(data).then(res => {
          if (res.data.state == 0) {
            this.$message.success("添加成功");
            this.handleCancel();
          }
        });
      });
    },
    handleCancel() {
      this.$refs.ruleForm.clearValidate();
      this.$emit("cancel", false);
    }
  },
  mounted() {
    this.getEnterprise();
  }
};
</script>
<style lang="less" scoped></style>
