<template>
  <a-modal
    title="新增突发任务"
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
      <a-form-model-item label="选择站点" prop="pointId">
        <a-select v-model="formData.pointId" placeholder="站点">
          <a-select-option
            v-for="item in stationList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="选择任务项" prop="planId">
        <a-select v-model="formData.planId" placeholder="任务项">
          <a-select-option
            v-for="item in planList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="任务项名称" prop="name">
        <a-input placeholder="任务项名称" v-model="formData.name" />
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
      <a-form-model-item label="任务项说明" prop="content">
        <a-input v-model="formData.content" type="textarea" />
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
    stationList: Array,
    planList: Array
  },
  data() {
    return {
      formData: {
        name: "",
        content: "",
        gmtCreate: null,
        gmtEnd: null
      },
      rules: {
        pointId: [
          {
            required: true,
            message: "请选择站点",
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
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        let data = JSON.parse(JSON.stringify(this.formData));
        data.programmeItemIds = [];
        //取任务项集合
        this.planList.forEach(item => {
          if (item.id == data.planId) {
            data.programmeItemIds.push(item);
          }
        });
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
  mounted() {},
  watch: {
    status() {
      if (this.status == true) {
        this.formData = {
          name: "",
          content: "",
          gmtCreate: null,
          gmtEnd: null
        };
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
