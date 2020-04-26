<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    @ok="handleOk"
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
      <a-form-model-item label="姓名" prop="name">
        <a-input
          placeholder="请输入"
          :disabled="memberId == 1"
          v-model="formData.name"
        />
      </a-form-model-item>
      <a-form-model-item label="账号" prop="username">
        <a-input
          placeholder="请输入"
          :disabled="memberId == 1"
          v-model="formData.username"
        />
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input-password
          placeholder="请输入"
          type="password"
          v-model="formData.password"
        />
      </a-form-model-item>
      <a-form-model-item label="手机号码" prop="phone">
        <a-input-number
          style="width:100%"
          placeholder="请输入"
          v-model="formData.phone"
        />
      </a-form-model-item>
      <a-form-model-item label="微信ID" prop="wechatId">
        <a-input placeholder="请输入" v-model="formData.wechatId" />
      </a-form-model-item>
      <a-form-model-item label="选择权限" prop="roleId">
        <a-select
          placeholder="请选择"
          :disabled="memberId == 1"
          v-model="formData.roleId"
          @select="roleSelect"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) of roleList"
            :key="index"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="运维小组" v-if="roleId == 3" prop="groupId">
        <a-select
          placeholder="请选择"
          v-model="formData.groupId"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) of groupList"
            :key="index"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="审核权限" v-if="roleId == 2" prop="approvalIds">
        <a-select
          placeholder="请选择"
          v-model="formData.approvalIds"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) of approvalList"
            :key="index"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
let timeout = null;
function debounceFn(fn, wait = 500) {
  console.log(timeout, 555);
  if (timeout !== null) clearTimeout(timeout);
  timeout = setTimeout(fn, wait);
}
// function debounceFn(func, wait = 500) {
//   let timeout;
//   return function() {
//     // let context = this;
//     // let args = arguments;

//     if (timeout) clearTimeout(timeout);

//     timeout = setTimeout(() => {
//       func();
//     }, wait);
//   };
// }
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
    const validatePhone = (rule, value, callback) => {
      if (value == undefined || value == "") {
        //非必须输入
        callback("请输入手机号码");
        return;
      }
      if (!/^1\d{10}$/.test(value)) {
        callback("手机号格式不正确");
      } else {
        callback();
      }
    };
    const validatePassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
    return {
      formData: {
        name: "",
        username: "",
        password: "",
        phone: "",
        wechatId: "",
        roleId: ""
      },
      rules: {
        enterpriseId: [
          {
            required: true,
            message: "请选择所属企业",
            trigger: "change"
          }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        username: [
          { required: true, message: "请输入账号", trigger: "change" }
        ],
        password: [
          {
            required: true,
            message: "请输入数字，字母或特殊字符的组合",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: true,
            validator: validatePhone
          }
        ],
        roleId: [{ required: true, message: "请选择权限" }],
        groupId: [
          { required: true, message: "请选择运维小组", trigger: "change" }
        ],
        approvalIds: [
          { required: true, message: "请选择审核权限", trigger: "change" }
        ]
      },
      initPassword: "", //编辑的密码
      validatePassword,
      validatePhone,
      memberId: "",
      roleId: "",
      roleList: [],
      groupList: [], //小组列表
      approvalList: [], //审核权限列表
      auditor: ""
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
        // setTimeout(() => {
        this.initPassword = nval.password;
        this.formData = {
          name: nval.name,
          username: nval.username,
          password: nval.password,
          phone: nval.phone,
          wechatId: nval.wechatId,
          roleId: nval.roleId
        };
        if (nval.roleId == 3) {
          //设置运维小组
          this.formData.groupId = nval.groupId;
        } else if (nval.roleId == 2) {
          //审核权限
          this.formData.approvalIds = nval.approvalIds[0];
        }
        // }, 50);
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
      this.$refs.ruleForm.resetFields();
    },
    handleOk() {
      if (this.state == true) {
        this.$message.error("请勿重复点击");
        return;
      }
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        if (this.memberId) {
          debounceFn(this.editMember(this.formData));
        } else {
          debounceFn(this.addMember(this.formData));
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
