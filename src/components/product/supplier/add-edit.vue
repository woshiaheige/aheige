<template>
  <a-modal
    :title="title + '供应商信息'"
    v-model="status"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
  >
    <a-form-model :model="formInline" :rules="rules" ref="ruleForm">
      <a-form-model-item label="供应商名称" prop="name">
        <a-input placeholder="请输入" v-model="formInline.name" />
      </a-form-model-item>
      <a-form-model-item label="所属区域" prop="regionId">
        <a-select placeholder="请选择" v-model="formInline.regionId">
          <a-select-option
            :value="item.id"
            v-for="item in regionList"
            :key="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="地址" prop="address">
        <a-input placeholder="请输入" v-model="formInline.address" />
      </a-form-model-item>
      <a-form-model-item label="联系人" prop="contact">
        <a-input placeholder="请输入" v-model="formInline.contact" />
      </a-form-model-item>
      <a-form-model-item label="联系电话" prop="telephone">
        <a-input placeholder="请输入" v-model="formInline.telephone" />
      </a-form-model-item>
      <a-form-model-item label="评级" prop="level">
        <a-select placeholder="请选择" v-model="formInline.level">
          <a-select-option :value="1">1</a-select-option>
          <a-select-option :value="2">2</a-select-option>
          <a-select-option :value="3">3</a-select-option>
          <a-select-option :value="4">4</a-select-option>
          <a-select-option :value="5">5</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
export default {
  props: {
    obj: {
      type: Object
    }
  },
  data() {
    return {
      regionList: [],
      title: "",
      formInline: {
        name: "",
        regionId: undefined,
        address: "",
        contact: "",
        telephone: "",
        level: ""
      },
      rules: {
        name: [{ required: true, message: "请输入供应商名称" }]
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
    //修改供应商
    editSupplier() {
      let data = {
        id: this.obj.row.id,
        name: this.formInline.name,
        regionId: this.formInline.regionId,
        address: this.formInline.address,
        contact: this.formInline.contact,
        telephone: this.formInline.telephone,
        level: this.formInline.level
      };
      this.$api.product
        .postEditSupplier(data)
        .then(res => {
          console.log(res);
          if (res.data.state == 0) {
            this.$message.success("修改成功");
            this.$emit("getTableData");
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.$refs.ruleForm.resetFields();
          this.$emit("cancel", false);
        });
    },
    //通过id查询供应商
    getSupplierById() {
      let data = {
        id: this.obj.row.id
      };
      this.$api.product
        .getSupplierById(data)
        .then(res => {
          console.log(res);
          this.formInline.name = res.data.data.name;
          this.formInline.regionId = res.data.data.regionId;
          this.formInline.address = res.data.data.address;
          this.formInline.contact = res.data.data.contact;
          this.formInline.telephone = res.data.data.telephone;
          this.formInline.level = res.data.data.level;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //新建供应商
    postAddSupplier() {
      let data = {
        name: this.formInline.name,
        regionId: this.formInline.regionId,
        address: this.formInline.address,
        contact: this.formInline.contact,
        telephone: this.formInline.telephone,
        level: this.formInline.level
      };
      this.$api.product
        .postAddSupplier(data)
        .then(res => {
          console.log(res);
          if (res.data.state == 0) {
            this.$message.success("新建成功");
            this.$emit("getTableData");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("系统繁忙");
        })
        .finally(() => {
          this.$refs.ruleForm.resetFields();
          this.$emit("cancel", false);
        });
    },
    //获取区域列表
    getArea() {
      let data = {
        id: ""
      };
      this.$api.common
        .getArea(data)
        .then(res => {
          if (res.data.state == 0) {
            this.regionList = res.data.data || [];
          }
        })
        .catch(err => {
          console.log(err);
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
  mounted() {
    this.getArea();
  },
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
