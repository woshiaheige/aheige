<template>
  <a-modal
    :title="title + '供应商信息'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
    :maskClosable="false"
  >
    <a-form-model
      :model="formInline"
      :rules="rules"
      ref="ruleForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="供应商名称" prop="name">
        <a-input
          placeholder="请输入"
          v-model="formInline.name"
          :maxLength="30"
          v-width="350"
        />
      </a-form-model-item>
      <a-form-model-item label="所属区域" prop="regionId">
        <a-cascader
          :options="cityList"
          v-model="formInline.regionId"
          placeholder="请选择"
          v-width="350"
        />
      </a-form-model-item>
      <a-form-model-item label="地址" prop="address">
        <a-input
          placeholder="请输入"
          v-model="formInline.address"
          :maxLength="30"
          v-width="350"
        />
      </a-form-model-item>
      <a-form-model-item label="联系人" prop="contact">
        <a-input
          placeholder="请输入"
          v-model="formInline.contact"
          :maxLength="10"
          v-width="350"
        />
      </a-form-model-item>
      <a-form-model-item label="联系电话" prop="telephone">
        <a-input
          placeholder="请输入"
          v-model="formInline.telephone"
          v-width="350"
        />
      </a-form-model-item>
      <a-form-model-item label="评级" prop="level">
        <a-rate v-model="formInline.level" />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleOk" v-preventReClick>
        保存
      </a-button>
    </template>
  </a-modal>
</template>
<script>
import cityList from "@/assets/json/city_code.json";
export default {
  props: {
    obj: {
      type: Object
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value == undefined || value == "") {
        //非必须输入
        callback();
        return;
      }
      if (!/^1\d{10}$/.test(value)) {
        callback("电话号格式不正确");
      } else {
        callback();
      }
    };
    const validateLevel = (rule, value, callback) => {
      if (value == 0) {
        //非必须输入
        callback("请选择供应商等级");
        return;
      }
      callback();
    };
    return {
      cityList,
      title: "",
      formInline: {
        name: "",
        regionId: [],
        address: "",
        contact: "",
        telephone: "",
        level: 0
      },
      rules: {
        name: [
          { required: true, message: "请输入供应商名称", trigger: "blur" }
        ],
        regionId: [{ required: true, message: "请选择区域", trigger: "blur" }],
        address: [
          { required: true, message: "请输入供应商地址", trigger: "blur" }
        ],

        telephone: [{ validator: validatePhone, trigger: "blur" }],
        level: [{ validator: validateLevel, trigger: "blur" }]
      }
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
    //通过区域id，设置省id和市id
    setRegionId(id) {
      if (id) {
        let temp1 = id.substring(0, 2) + "0000";
        let temp2 = id.substring(0, 4) + "00";
        this.formInline.regionId = [temp1, temp2, id];
      }
    },
    //修改供应商
    editSupplier() {
      let data = {
        id: this.obj.row.id,
        name: this.formInline.name,
        regionId:
          this.formInline.regionId[this.formInline.regionId.length - 1] || "",
        address: this.formInline.address,
        contact: this.formInline.contact,
        telephone: this.formInline.telephone,
        level: this.formInline.level
      };
      this.$api.product
        .postEditSupplier(data)
        .then(res => {
          if (res.data.state == 0) {
            this.$message.success("修改成功");
            this.$emit("getTableData");
          }
        })
        .catch(() => {
          this.handleCancel();
        })
        .finally(() => {
          this.handleCancel();
        });
    },
    //通过id查询供应商
    getSupplierById() {
      let data = {
        id: this.obj.row.id
      };
      this.$api.product.getSupplierById(data).then(res => {
        this.formInline.name = res.data.data.name;
        this.formInline.address = res.data.data.address;
        this.formInline.contact = res.data.data.contact;
        this.formInline.telephone = res.data.data.telephone;
        this.formInline.level = res.data.data.level;
        this.setRegionId(res.data.data.regionId);
      });
    },
    //新建供应商
    postAddSupplier() {
      let data = {
        name: this.formInline.name,
        regionId: this.formInline.regionId[this.formInline.regionId.length - 1],
        address: this.formInline.address,
        contact: this.formInline.contact,
        telephone: this.formInline.telephone,
        level: this.formInline.level
      };
      this.$api.product
        .postAddSupplier(data)
        .then(res => {
          if (res.data.state == 0) {
            this.$message.success("新建成功");
            this.$emit("getTableData");
          }
        })
        .catch(() => {
          this.handleCancel();
        })
        .finally(() => {
          this.handleCancel();
        });
    },
    //点击ok
    handleOk(e) {
      e.preventDefault();
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.obj.row != "" && this.obj.row != undefined) {
            this.editSupplier();
          } else {
            this.postAddSupplier();
          }
        }
      });
    },
    //点击取消
    handleCancel() {
      this.$refs.ruleForm.resetFields();
      this.$emit("cancel", false);
    }
  },
  mounted() {},
  watch: {
    status() {
      if (this.status == true) {
        if (this.obj.row != "" && this.obj.row != undefined) {
          this.title = "编辑";
          this.getSupplierById();
        } else {
          this.title = "新建";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
