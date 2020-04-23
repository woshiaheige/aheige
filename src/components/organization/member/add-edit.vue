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
          :disabled="memberId == 1"
          v-decorator="[
            'name',
            { rules: [{ required: true, message: '请输入姓名' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="账号">
        <a-input
          placeholder="请输入"
          :disabled="memberId == 1"
          v-decorator="[
            'username',
            { rules: [{ required: true, message: '请输入账号' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="密码">
        <a-input-password
          placeholder="请输入"
          type="password"
          v-decorator="[
            'password',
            {
              rules: [
                {
                  message: '请输入数字，字母或特殊字符的组合,6位以上',
                  required: true
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="手机号码">
        <a-input-number
          style="width:100%"
          placeholder="请输入"
          v-decorator="[
            'phone',
            {
              rules: [
                {
                  required: true,
                  pattern: validatePhone,
                  message: '请输入正确的手机号码'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="微信ID">
        <a-input placeholder="请输入" v-decorator="['wechatId']" />
      </a-form-item>
      <a-form-item label="选择权限">
        <a-select
          placeholder="请选择"
          :disabled="memberId == 1"
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
    const validatePhone = /^1\d{10}$/;
    const validatePassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    return {
      initPassword: "", //编辑的密码
      validatePassword,
      validatePhone,
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
    title() {
      let title = this.memberId ? "编辑用户" : "新增用户";
      return title;
    },
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
          this.initPassword = nval.password;
          this.form.setFieldsValue({
            name: nval.name,
            username: nval.username,
            password: nval.password,
            phone: nval.phone,
            wechatId: nval.wechatId,
            roleId: nval.roleId
          });
          if (nval.roleId == 3) {
            //设置运维小组
            this.form.setFieldsValue({ groupId: nval.groupId });
          } else if (nval.roleId == 2) {
            //审核权限
            this.form.setFieldsValue({ approvalIds: nval.approvalIds[0] });
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
      this.initPassword = "";
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
      if (this.initPassword != params.password) {
        //避免重复加密
        params.password = this.$md5(params.password);
      }

      if (params.approvalIds) {
        params.approvalIds = [values.approvalIds];
      }
      this.$api.organization.editSysUser(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改用户成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
        }
      });
    },
    addMember(values) {
      let params = values;
      params.password = this.$md5(params.password);
      if (params.approvalIds) {
        params.approvalIds = [values.approvalIds];
      }
      this.$api.organization.addSysUser(params).then(res => {
        if (res.data.state == 0) {
          this.$message.success("新建用户成功");
          this.$emit("update:visible", false);
          this.$emit("updateTable");
          this.reset();
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
