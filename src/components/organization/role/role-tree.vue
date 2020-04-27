<template>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="closeModal"
    :maskClosable="false"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="权限名称">
        <a-input
          placeholder="请输入"
          v-decorator="[
            'name',
            {
              rules: [
                {
                  required: true,
                  message: '请输入权限名称,长度不能超过30位',
                  max: 30
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="权限类型">
        <a-select
          placeholder="请选择"
          v-decorator="[
            'type',
            { rules: [{ required: true, message: '请选择权限类型' }] }
          ]"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) of roleTypeList"
            :key="index"
            >{{ item.label }}</a-select-option
          >
        </a-select>
      </a-form-item>
    </a-form>
    <a-tree
      checkable
      :autoExpandParent="autoExpandParent"
      v-model="resourceIdList"
      @check="treeClick"
      @expand="onExpand"
      :expandedKeys="expandedKeys"
      :replaceFields="replaceFields"
      key="id"
      :treeData="dataList"
    />
    <template slot="footer">
      <a-button key="back" @click="closeModal">取消</a-button>
      <a-button key="go" type="primary" @click="handleOk" v-preventReClick
        >确认</a-button
      >
    </template>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    roleDetail: {
      required: false
    }
  },
  data() {
    return {
      replaceFields: {
        key: "id"
      },
      form: this.$form.createForm(this),
      expandedKeys: [],
      autoExpandParent: true,
      dataList: [],
      roleId: "",
      userRoleId: "", //用户的角色id(用来判断如果用户修改自己的角色则刷新组件)
      resourceIdList: [],
      // menuIds: [], //获取已授权的id
      roleTypeList: [
        { label: "超级管理员", id: "1" },
        { label: "运维主管", id: "2" },
        { label: "运维人员", id: "3" },
        { label: "仓库人员", id: "4" }
      ] //权限类型
    };
  },

  computed: {
    title() {
      let title = "";
      title = this.roleDetail ? "编辑授权" : "新建授权";
      return title;
    }
  },
  watch: {
    visible(nval) {
      if (nval == true) {
        // this.userRoleId = JSON.parse(sessionStorage.getItem("userinfo")).roleId;
        this.queryResourceTree();
        if (this.roleDetail) {
          //编辑权限
          setTimeout(() => {
            this.form.setFieldsValue({
              name: this.roleDetail.name,
              type: `${this.roleDetail.type}`
            });
          }, 50);
          this.roleId = this.roleDetail.id;
          this.getSysRoleById(this.roleId);
        } else {
          setTimeout(() => {
            this.initRole();
          }, 500);
        }
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
      this.reset();
    },
    reset() {
      this.roleId = "";
      this.expandedKeys = [];
      this.roleId = "";
      this.userRoleId = "";
      this.resourceIdList = [];
      // this.menuIds = [];
      this.form.resetFields();
    },
    initRole() {
      //添加默认权限
      if (this.resourceIdList.indexOf("1001") == -1) {
        this.resourceIdList.push("1001");
      }
    },
    queryResourceTree() {
      //获取树
      this.$api.organization.queryResourceTree().then(res => {
        if (res.data.state == "0") {
          this.dataList = res.data.data;
          this.treeDispose(this.dataList);
        }
      });
    },

    getSysRoleById(id) {
      //根据id获取已授权
      let params = {
        id: id
      };
      this.resourceIdList = [];
      this.$api.organization.getSysRoleById(params).then(res => {
        if (res.data.state == "0" && res.data.data.resourceIds) {
          this.$nextTick(() => {
            this.resourceIdList = res.data.data.resourceIds;
            this.initRole();
            // this.expandedKeys = res.data.data.resourceIds;
          });
        }
      });
    },
    treeClick(keys) {
      this.resourceIdList = keys;
    },
    treeDispose(array) {
      //树处理

      array.forEach(item => {
        if (item.children && item.children.length > 0) {
          this.treeDispose(item.children);
          //console.log(item);
        }
        if (item.id == "1001") {
          //设置运维监控为默认值
          this.$set(item, "disabled", true);
        }
      });
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.roleId) {
            this.editRole(values);
          } else {
            this.addRole(values);
          }
        }
      });
    },
    editRole(name) {
      //编辑
      let data = {
        resourceIds: this.resourceIdList,
        id: this.roleId,
        ...name
      };
      this.$api.organization
        .editSysRole(data)
        .then(res => {
          if (res.data.state == "0") {
            this.$message.success("授权成功!");
            if (this.roleId == this.userRoleId) {
              //如果用户修改的是自己的角色,刷新页面组件
              this.$store.dispatch("createRouterTable", this.resourceIdList);
              // location.reload([true]);
            }
            this.closeModal();
            this.$emit("updateTable");
          }
        })
        .catch(() => {
          this.closeModal();
        });
    },
    addRole(name) {
      //新建
      let data = {
        resourceIds: this.resourceIdList,
        id: this.roleId,
        ...name
      };
      this.$api.organization
        .addSysRole(data)
        .then(res => {
          if (res.data.state == "0") {
            this.$message.success("授权成功!");
            if (this.roleId == this.userRoleId) {
              //如果用户修改的是自己的角色,刷新页面组件
              this.$store.dispatch("createRouterTable", this.resourceIdList);
              // location.reload([true]);
            }
            this.closeModal();
            this.$emit("updateTable");
          }
        })
        .catch(() => {
          this.closeModal();
        });
    },
    onExpand(expandedKeys) {
      // console.log("onExpand", expandedKeys);
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    }
  }
};
</script>
