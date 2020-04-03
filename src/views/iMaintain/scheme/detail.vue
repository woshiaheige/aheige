<template>
  <a-layout class="scheme-detail">
    <!-- 头部 -->
    <a-layout-header style="background:#fff" v-margin:bottom="16">
      <a-row>
        <a-col :span="24">
          <span class="reback">
            <a-icon type="arrow-left" @click="reBack" />运维方案
          </span>
          <a-button icon="plus" type="primary" v-margin:left="10"
            >新方案项</a-button
          >
          <a-button icon="save" type="primary" v-margin="'0 10'">保存</a-button>
          <a-button icon="delete" type="danger">删除</a-button>
        </a-col>
        <a-col :span="24">
          <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
            <a-form-item label="方案名称">
              <a-input></a-input>
            </a-form-item>
            <a-form-item label="方案编号">
              <a-input></a-input>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-layout-header>
    <!-- 头部end -->
    <a-layout>
      <!-- 左侧方案栏 -->
      <a-layout-sider style="background:#fff" v-margin:right="16">
        <a-list bordered :dataSource="schemeList">
          <a-list-item
            slot="renderItem"
            slot-scope="item, index"
            :key="index"
            >{{ item }}</a-list-item
          >
        </a-list></a-layout-sider
      >
      <!-- 左侧方案栏end -->

      <!-- 方案详情 -->
      <a-layout-content style="background:#fff" class="content">
        <h3>方案项详情</h3>
        <a-form
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
          ref="formModal"
          :form="form"
        >
          <a-form-item label="方案项名">
            <a-input
              placeholder="请输入方案项名"
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请填写方案项名' }] }
              ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="方案项类型">
            <a-select
              placeholder="请选择方案项类型"
              v-decorator="[
                'type',
                { rules: [{ required: true, message: '请选择方案项目类型' }] }
              ]"
            >
              <a-select-option value="1">
                Option 1
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="作业对象">
            <a-select
              placeholder="请选择作业对象"
              v-decorator="[
                'object',
                { rules: [{ required: true, message: '请选择作业对象' }] }
              ]"
            >
              <a-select-option value="1">
                Option 1
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="仪器类型">
            <a-select
              placeholder="请选择仪器类型"
              v-decorator="['instrumenType']"
            >
              <a-select-option value="1">
                Option 1
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="使用的表单">
            <a-select
              placeholder="请选择使用的表单"
              v-decorator="[
                'menu',
                { rules: [{ required: true, message: '请选择使用的表单' }] }
              ]"
            >
              <a-select-option value="1">
                Option 1
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <span slot="label">
              周期类型&nbsp;
              <a-tooltip title="What do you want others to call you?">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <a-select placeholder="请选择周期类型" v-decorator="['circleType']">
              <a-select-option value="1">
                Option 1
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="周期单位">
            <a-select placeholder="请选择周期单位" v-decorator="['circleUnit']">
              <a-select-option value="1">
                Option 1
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
        <a-row
          type="flex"
          justify="end"
          v-margin:right="20"
          v-margin:bottom="20"
        >
          <a-col>
            <a-button>
              增加特例项目
            </a-button>
            <a-button type="danger" v-margin:left="20">删除</a-button>
          </a-col>
        </a-row>
      </a-layout-content>
      <!-- 方案详情end -->
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "contractEdit" }),
      schemeList: ["方案A", "方案B"]
    };
  },
  methods: {
    tabChange(e) {
      console.log(e);
    },
    reBack() {
      this.$router.replace({ path: "/i-maintain/scheme" });
    }
  }
};
</script>
