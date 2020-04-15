<template>
  <a-modal
    :title="title"
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
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-model-item label="企业名称" prop="name">
        <a-input v-model="formData.name" placeholder="企业名称" />
      </a-form-model-item>
      <a-form-model-item label="所属区域" prop="area">
        <a-select v-model="formData.area" placeholder="所属区域"></a-select>
      </a-form-model-item>
      <a-form-model-item label="企业地址" prop="address">
        <a-input v-model="formData.address" placeholder="企业地址" />
      </a-form-model-item>
      <a-form-model-item label="企业信用代码" prop="code">
        <a-input v-model="formData.code" placeholder="企业信用代码" />
      </a-form-model-item>
      <a-form-model-item label="环保负责人" prop="leading">
        <a-input v-model="formData.leading" placeholder="环保负责人" />
      </a-form-model-item>
      <a-form-model-item label="联系电话" prop="tel">
        <a-input v-model="formData.tel" placeholder="联系电话" />
      </a-form-model-item>
      <a-form-model-item label="控制级别" prop="level">
        <a-select placeholder="控制级别" v-model="formData.level">
          <a-select-option
            v-for="item in controlOptions"
            :key="item.value"
            :value="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="企业类型" prop="type">
        <a-select v-model="formData.type" placeholder="企业类型"> </a-select>
      </a-form-model-item>
      <a-form-model-item label="企业简介">
        <a-input type="textarea" placeholder="企业简介" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
export default {
  props: {
    obj: Object
  },
  data() {
    // const validatePhone = (rule, value, callback) => {
    //   if (value == undefined || value == "") {
    //     //非必须输入
    //     callback();
    //     return;
    //   }
    //   if (!/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(value)) {
    //     callback("电话号格式不正确");
    //   } else {
    //     callback();
    //   }
    // };
    return {
      title: "",
      formData: {
        name: "",
        area: "",
        address: "",
        code: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur"
          }
        ],
        area: [
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
        leading: [
          {
            required: true,
            message: "请输入环保负责人",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "blur"
          }
        ],
        level: [
          {
            required: true,
            message: "请输入联系电话",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请输入企业类型",
            trigger: "blur"
          }
        ]
      },
      controlOptions: [
        { name: "国控", value: "1" },
        { name: "省控", value: "2" },
        { name: "市控", value: "3" },
        { name: "县控", value: "4" }
      ]
    };
  },
  computed: {
    status: {
      get() {
        return this.obj.show;
      },
      set() {}
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel", false);
      this.$refs.ruleForm.clearValidate();
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
      });
    }
  },
  mounted() {},
  watch: {
    status() {
      if (this.status == true) {
        if (this.obj.row != "" && this.obj.row != undefined) {
          this.title = "编辑";
        } else {
          this.title = "新增";
        }
      }
    }
  }
};
</script>
