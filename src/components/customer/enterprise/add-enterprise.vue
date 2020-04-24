<template>
  <a-modal
    :title="title + '企业'"
    :visible="modelData.show"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-model-item label="企业名称" prop="name">
        <a-input v-model="formData.name" placeholder="企业名称" />
      </a-form-model-item>
      <a-form-model-item label="所属区域" prop="regionId">
        <!-- <a-cascader
          :fieldNames="{ label: 'name', value: 'code', children: 'city' }"
          :options="options"
          v-model="formData.regionId"
          expandTrigger="hover"
          placeholder="所属区域"
          allowClear
        /> -->
        <a-select
          v-model="formData.regionId"
          placeholder="所属区域"
          showSearch
          :filterOption="filterOption"
        >
          <a-select-option
            v-for="item in areaOptions"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="企业地址" prop="address">
        <a-input v-model="formData.address" placeholder="企业地址" />
      </a-form-model-item>
      <a-form-model-item label="企业信用代码" prop="code">
        <a-input v-model="formData.code" placeholder="企业信用代码" />
      </a-form-model-item>
      <a-form-model-item label="环保负责人" prop="environmentPrincipal">
        <a-input
          v-model="formData.environmentPrincipal"
          placeholder="环保负责人"
        />
      </a-form-model-item>
      <a-form-model-item label="联系电话" prop="phone">
        <a-input v-model="formData.phone" placeholder="联系电话" />
      </a-form-model-item>
      <a-form-model-item label="控制级别" prop="controlLevel">
        <a-select
          placeholder="控制级别"
          v-model="formData.controlLevel"
          showSearch
          :filterOption="filterOption"
        >
          <a-select-option
            v-for="item in controlOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="行业类型" prop="industryId">
        <a-select
          v-model="formData.industryId"
          placeholder="行业类型"
          showSearch
          :filterOption="filterOption"
        >
          <a-select-option
            v-for="item in typeList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="企业简介" prop="introduction">
        <a-input
          type="textarea"
          v-model="formData.introduction"
          placeholder="企业简介"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import cityList from "@/assets/geojson/city_code.json";
export default {
  props: {
    controlOptions: Array,
    typeList: Array,
    value: Object
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value == undefined || value == "") {
        //非必须输入
        callback();
        return;
      }
      if (!/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(value)) {
        callback("电话号格式不正确");
      } else {
        callback();
      }
    };
    return {
      title: "",
      options: [],
      formData: {
        // name: "",
        // regionId: "",
        // address: "",
        // code: "",
        // environmentPrincipal: "",
        // phone: "",
        // controlLevel: "",
        // industryId: "",
        // introduction: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          }
        ],
        regionId: [
          {
            required: true,
            message: "请选择所属区域",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入企业地址",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入企业信用代码",
            trigger: "blur"
          }
        ],
        environmentPrincipal: [
          {
            required: true,
            message: "请输入环保负责人",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
        ],
        controlLevel: [
          {
            required: true,
            message: "请选择控制级别",
            trigger: "change"
          }
        ],
        industryId: [
          {
            required: true,
            message: "请选择企业类型",
            trigger: "change"
          }
        ]
      },
      areaOptions: []
    };
  },
  computed: {
    modelData: {
      get() {
        return this.value;
      },
      set() {}
    }
  },
  methods: {
    handleCancel() {
      this.modelData.show = false;
      this.$refs.ruleForm.clearValidate();
      this.$refs.ruleForm.resetFields();
    },
    handleOk() {
      console.log(this.formData.regionId);
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
        if (this.modelData.type == "edit") {
          this.$api.customer.editEnterPrise(this.formData).then(res => {
            if (res.data.state == 0) {
              this.$message.success("编辑成功");
              this.$emit("refresh");
              this.handleCancel();
            }
          });
        } else {
          this.$api.customer.addEnterPrise(this.formData).then(res => {
            if (res.data.state == 0) {
              this.$message.success("新建成功");
              this.$emit("refresh");
              this.handleCancel();
            }
          });
        }
      });
    },
    getEditData() {
      this.$api.customer
        .getEnterPriseById({ id: this.modelData.row.id })
        .then(res => {
          if (res.data.state == 0) {
            this.formData = res.data.data;
          }
        });
    },
    getArea() {
      this.$api.common.getArea().then(res => {
        if (res.data.state == 0) {
          this.areaOptions = res.data.data;
        }
      });
    }
  },
  mounted() {},
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.options = cityList;
        this.getArea();
        if (this.value.type == "edit") {
          this.title = "编辑";
          this.getEditData();
        } else {
          this.title = "新建";
        }
      }
    }
  }
};
</script>
