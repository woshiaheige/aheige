<template>
  <a-modal
    title="新建突发任务"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
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
          v-model="formData.enterpriseName"
          placeholder="请输入"
          style="width: 200px"
          :defaultActiveFirstOption="false"
          :showArrow="false"
          :filterOption="false"
          @search="searchEnterprise"
          :notFoundContent="null"
        >
          <a-select-option
            v-for="(item, index) in enterpriseList"
            @click="slectEnterprise(item)"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="选择站点" prop="pointId">
        <a-select
          showSearch
          v-model="formData.pointName"
          placeholder="请输入"
          style="width: 200px"
          :defaultActiveFirstOption="false"
          :showArrow="false"
          :filterOption="false"
          @search="searchPoint"
          :notFoundContent="null"
        >
          <a-select-option
            v-for="(item, index) in pointList"
            @click="slectPoint(item)"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="运维小组" prop="groupId">
        <a-select
          showSearch
          v-model="formData.groupName"
          placeholder="请输入"
          style="width: 200px"
          :defaultActiveFirstOption="false"
          :showArrow="false"
          :filterOption="false"
          @search="searchGroup"
          :notFoundContent="null"
        >
          <a-select-option
            v-for="(item, index) in groupList"
            @click="slectGroup(item)"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="运维人员" prop="memberId">
        <a-select
          v-model="formData.memberId"
          placeholder="请输入"
          style="width: 200px"
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
      <a-form-model-item label="开始时间" prop="gmtCreate">
        <a-date-picker
          v-model="formData.gmtCreate"
          show-time
          type="date"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="开始时间"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item label="结束时间" prop="gmtEnd">
        <a-date-picker
          v-model="formData.gmtEnd"
          show-time
          type="date"
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="结束时间"
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
        gmtCreate: undefined,
        gmtEnd: undefined,
        enterpriseName: undefined,
        pointName: undefined,
        groupName: undefined,
        memberName: undefined,
        enterpriseId: "",
        pointId: "",
        groupId: "",
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
        groupId: [
          {
            required: true,
            message: "请选择运维小组",
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
          gmtCreate: undefined,
          gmtEnd: undefined,
          enterpriseName: undefined,
          pointName: undefined,
          groupName: undefined,
          memberName: undefined,
          enterpriseId: "",
          pointId: "",
          groupId: "",
          memberId: ""
        };
      }
    },
    "formData.enterpriseId"() {
      this.$set(this.formData, "pointId", "");
      this.$set(this.formData, "pointName", "");
    }
  },
  methods: {
    searchEnterprise(value) {
      //搜索企业
      // this.formData.enterpriseName = value;
      this.$api.customer
        .getEnterPriseList({ enterpriseName: value })
        .then(res => {
          this.enterpriseList = res.data.data.records;
        });
    },
    slectEnterprise(value) {
      this.$set(this.formData, "enterpriseId", value.id);
      this.$set(this.formData, "enterpriseName", value.name);
    },
    searchPoint(value) {
      //搜索站点
      // this.formData.pointName = value;
      let params = {
        pointName: value,
        enterpriseId: this.formData.enterpriseId
      };
      this.$api.customer.getStationList(params).then(res => {
        this.pointList = res.data.data.records;
      });
    },
    slectPoint(value) {
      this.$set(this.formData, "pointId", value.id);
      this.$set(this.formData, "pointName", value.name);
    },
    searchGroup(value) {
      //搜索小组
      this.$api.customer.getGroupList({ groupName: value }).then(res => {
        this.groupList = res.data.data.records;
      });
    },
    slectGroup(value) {
      this.$set(this.formData, "groupId", value.id);
      this.$set(this.formData, "groupName", value.name);
    },

    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }

        let data = JSON.parse(JSON.stringify(this.formData));
        delete data.enterpriseName;
        delete data.pointName;
        data.type = 2; //突发任务
        data.flag = true;
        data.gmtCreate = this.$moment(data.gmtCreate).format(
          "YYYY-MM-DD HH:mm:ss"
        );
        data.gmtEnd = this.$moment(data.gmtEnd).format("YYYY-MM-DD HH:mm:ss");

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
  mounted() {}
};
</script>
<style lang="less" scoped></style>
