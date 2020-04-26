<template>
  <a-modal
    :title="title + '企业'"
    :visible="modelData.show"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-model-item label="企业名称" prop="name">
        <a-input
          v-model="formData.name"
          :maxLength="30"
          placeholder="企业名称"
        />
      </a-form-model-item>
      <a-form-model-item label="所属区域" prop="regionId">
        <a-cascader
          :options="cityList"
          v-model="formData.regionId"
          placeholder="请选择"
        />
      </a-form-model-item>
      <a-form-model-item label="企业地址" prop="address">
        <a-input
          v-model="formData.address"
          :maxLength="30"
          placeholder="企业地址"
        />
      </a-form-model-item>
      <a-form-model-item label="企业信用代码" prop="code">
        <a-input
          v-model="formData.code"
          :maxLength="30"
          placeholder="企业信用代码"
        />
      </a-form-model-item>
      <a-form-model-item label="环保负责人" prop="environmentPrincipal">
        <a-input
          v-model="formData.environmentPrincipal"
          placeholder="环保负责人"
          :maxLength="30"
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
          :filterOption="filterOptions"
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
          :filterOption="filterOptions"
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
          :maxLength="300"
        />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" v-preventReClick @click="handleOk">
        保存
      </a-button>
    </template>
  </a-modal>
</template>

<script>
import cityList from "@/assets/json/city_code.json";
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
      cityList,
      title: "",
      options: [],
      formData: {},
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
    //通过区域id，设置省id和市id
    setRegionId(id) {
      if (id) {
        let temp1 = id.substring(0, 2) + "0000";
        let temp2 = id.substring(0, 4) + "00";
        this.formData.regionId = [temp1, temp2, id];
      }
    },
    handleCancel() {
      this.modelData.show = false;
      this.$refs.ruleForm.clearValidate();
      this.$refs.ruleForm.resetFields();
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
        let _data = JSON.parse(JSON.stringify(this.formData));
        _data.regionId = _data.regionId[_data.regionId.length - 1];
        if (this.modelData.type == "edit") {
          this.$api.customer.editEnterPrise(_data).then(res => {
            if (res.data.state == 0) {
              this.$message.success("编辑成功");
              this.$emit("refresh");
              this.handleCancel();
            }
          });
        } else {
          this.$api.customer.addEnterPrise(_data).then(res => {
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
            this.setRegionId(res.data.data.regionId);
          }
        });
    }
  },
  mounted() {},
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.formData = {};
        this.options = cityList;
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
