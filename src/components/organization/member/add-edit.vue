<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="姓名">
        <a-input
          placeholder="请输入"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入姓名' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="账号">
        <a-input
          placeholder="请输入"
          v-decorator="[
            'username',
            { rules: [{ required: true, message: '请输入账号' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="密码">
        <a-input
          placeholder="请输入"
          type="password"
          @blur="validatePassword"
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '请输入密码' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="手机号码">
        <a-input
          @blur="validatePhone"
          placeholder="请输入"
          v-decorator="[
            'phone',
            { rules: [{ required: true, message: '请输入手机号码' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="微信ID">
        <a-input placeholder="请输入" v-decorator="['wechatId']" />
      </a-form-item>
      <a-form-item label="选择权限">
        <a-select
          placeholder="请选择"
          v-decorator="[
            'roleId',
            { rules: [{ required: true, message: '请选择权限' }] }
          ]"
          @select="roleSelect"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) of roleList"
            :key="index"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="运维小组" v-if="roleId == 3">
        <a-select
          placeholder="请选择"
          v-decorator="[
            'groupId',
            { rules: [{ required: true, message: '请选择运维小组' }] }
          ]"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) of groupList"
            :key="index"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="审核权限" v-if="roleId == 2">
        <a-select
          placeholder="请选择"
          v-decorator="[
            'approvalIds',
            { rules: [{ required: true, message: '请选择审核权限' }] }
          ]"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) of approvalList"
            :key="index"
            >{{ item.name }}</a-select-option
          >
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
    memberDetail: {
      required: false
    }
  },
  data() {
    const validatePhone = e => {
      const validatePhoneReg = /^1\d{10}$/;
      if (e.target.value && !validatePhoneReg.test(e.target.value)) {
        const arr = [
          {
            message: "您输入的手机格式不正确!",
            field: "phone"
          }
        ];
        this.form.setFields({ phone: { value: e.target.value, errors: arr } });
      }
    };
    const validatePassword = e => {
      let regPass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
      if (e.target.value && !regPass.test(e.target.value)) {
        const arr = [
          {
            message: "请输入数字，字母或特殊字符",
            field: "phone"
          }
        ];
        this.form.setFields({
          password: { value: e.target.value, errors: arr }
        });
      }
    };
    return {
      validatePassword,
      validatePhone,
      title: "新建",
      memberId: "",
      roleId: "",
      roleList: [],
      groupList: [], //小组列表
      approvalList: [], //审核权限列表
      auditor: "",
      form: this.$form.createForm(this)
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
  watch: {
    memberDetail(nval) {
      if (nval) {
        this.memberId = nval.id;
        this.roleId = nval.roleId;
        if (nval.roleId == 2) {
          this.getDictBySysUserApproval(); //获取审批权限
        } else if (nval.roleId == 3) {
          this.gellAllSysGroup(); //获取小组
        }
        setTimeout(() => {
          this.form.setFieldsValue({
            name: nval.name,
            username: nval.username,
            password: this.$md5(nval.password),
            phone: nval.phone,
            wechatId: nval.wechatId,
            roleId: nval.roleId
          });
          if (nval.roleId == 3) {
            //设置运维小组
            this.form.setFieldsValue({ groupId: nval.groupId });
          } else if (nval.roleId == 2) {
            //审核权限
            this.form.setFieldsValue({ approvalIds: nval.approvalIds });
          }
        }, 50);
      }
    }
  },
  methods: {
    roleSelect(e) {
      this.roleId = e;
      if (e == 3) {
        this.gellAllSysGroup(); //获取小组
      } else if (e == 2) {
        this.getDictBySysUserApproval(); //获取审批权限
      }
    },
    gellAllSysGroup() {
      this.$api.organization.gellAllSysGroup().then(res => {
        if (res.data.state == 0) {
          this.groupList = res.data.data;
        }
      });
    },
    getDictBySysUserApproval() {
      this.$api.organization.getDictBySysUserApproval().then(res => {
        if (res.data.state == 0) {
          this.approvalList = res.data.data;
        }
      });
    },
    closeModal() {
      this.$emit("update:visible", false);
      this.reset();
    },
    getAllRole() {
      //获取角色
      this.$api.organization.getAllRole().then(res => {
        if (res.data.state == 0) {
          this.roleList = res.data.data;
        }
      });
    },
    reset() {
      this.memberId = "";
      this.roleId = "";
      this.form.resetFields();
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.memberId) {
            this.editMember(values);
          } else {
            this.addMember(values);
          }
        }
      });
    },
    editMember(values) {
      let params = values;
      params.id = this.memberId;
      if (params.approvalIds) {
        params.approvalIds = [values.approvalIds];
      }
      this.$api.organization.editSysUser(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改用户成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    addMember(values) {
      let params = values;
      if (params.approvalIds) {
        params.approvalIds = [values.approvalIds];
      }
      this.$api.organization.addSysUser(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("新建用户成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.getAllRole();
  }
};
</script>
<style lang="less" scoped></style>
