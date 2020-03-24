<template>
  <div class="layout">
    <a-layout-sider
      width="256"
      :style="{ position: 'fixed', height: '100vh', left: 0, overflow: 'auto' }"
    >
      <div class="logo">
        <!-- <img src="@/assets/logo.svg" width="60%" /> -->
        <a-icon type="md-cloudy" size="28" />
        <span>博控智维云</span>
      </div>
      <a-menu
        active-name="1-1"
        theme="dark"
        width="auto"
        :open-names="['1']"
        accordion
        mode="inline"
      >
        <a-sub-menu name="1">
          <template slot="title"> <a-icon type="md-home" />控制台 </template>
          <a-menu-item name="1-1" to="/">主控台</a-menu-item>
          <a-menu-item name="1-2" to="/dashboard/my">工作台</a-menu-item>
        </a-sub-menu>
        <a-sub-menu name="2">
          <template slot="title"> <a-icon type="md-paper" />任务审批 </template>
          <a-menu-item name="2-1" to="/examine/my">等待我审批</a-menu-item>
          <a-menu-item name="2-2" to="/examine/partake"
            >我参与的审批</a-menu-item
          >
          <a-menu-item name="2-3" to="/examine/initiate"
            >我发起的审批</a-menu-item
          >
          <a-menu-item name="2-4" to="/examine/create">新建审批</a-menu-item>
        </a-sub-menu>
        <a-sub-menu name="3">
          <template slot="title">
            <a-icon type="md-construct" />运维管理
          </template>
          <a-menu-item name="3-1" to="/task/list">任务一览</a-menu-item>
          <a-menu-item name="3-2">任务配置</a-menu-item>
          <a-menu-item name="3-3">上报投诉</a-menu-item>
        </a-sub-menu>
        <a-sub-menu name="4">
          <template slot="title"> <a-icon type="md-stats" />报表统计 </template>
          <a-menu-item name="4-1">绩效考核</a-menu-item>
          <a-menu-item name="4-2">统计分析</a-menu-item>
        </a-sub-menu>
        <a-sub-menu name="5">
          <template slot="title"> <a-icon type="md-pulse" />智能维护 </template>
          <a-menu-item name="5-1">实时监控</a-menu-item>
          <a-menu-item name="5-2">运行日志</a-menu-item>
          <a-menu-item name="5-3">异常报警</a-menu-item>
          <a-menu-item name="5-4">远程控制</a-menu-item>
        </a-sub-menu>
        <a-sub-menu name="6">
          <template slot="title">
            <a-icon type="md-people" />客户管理
          </template>
          <a-menu-item name="6-1">企业信息</a-menu-item>
          <a-menu-item name="6-2">运维站点</a-menu-item>
          <a-menu-item name="6-3">合同管理</a-menu-item>
          <a-menu-item name="6-4">一企一档</a-menu-item>
        </a-sub-menu>
        <a-sub-menu name="7">
          <template slot="title"> <a-icon type="md-cube" />资产管理 </template>
          <a-menu-item name="7-1">药品试剂</a-menu-item>
          <a-menu-item name="7-2">备品备件</a-menu-item>
          <a-menu-item name="7-3">出库入库</a-menu-item>
          <a-menu-item name="7-4">车辆管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu name="8">
          <template slot="title">
            <a-icon type="md-contacts" />供应商管理
          </template>
          <a-menu-item name="8-1">供应商信息</a-menu-item>
        </a-sub-menu>
        <a-sub-menu name="9">
          <template slot="title">
            <a-icon type="md-basket" />采购管理
          </template>
          <a-menu-item name="9-1">采购申请</a-menu-item>
          <a-menu-item name="9-2">采购订单</a-menu-item>
          <a-menu-item name="9-3">采购入库</a-menu-item>
          <a-menu-item name="9-4">退货管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu name="10">
          <template slot="title">
            <a-icon type="md-flask" />实验室管理
          </template>
          <a-menu-item name="10-1">任务管理</a-menu-item>
          <a-menu-item name="10-2">采样管理</a-menu-item>
          <a-menu-item name="10-3">分样管理</a-menu-item>
          <a-menu-item name="10-4">检验分析</a-menu-item>
          <a-menu-item name="10-5">质量控制</a-menu-item>
          <a-menu-item name="10-6">检测报告</a-menu-item>
        </a-sub-menu>
        <a-sub-menu name="11">
          <template slot="title">
            <a-icon type="md-list-box" />运维知识库
          </template>
          <a-menu-item name="11-1">知识库</a-menu-item>
        </a-sub-menu>
        <a-sub-menu name="12">
          <template slot="title">
            <a-icon type="md-cog"></a-icon>平台配置
          </template>
          <a-menu-item name="12-1">组织架构</a-menu-item>
          <a-menu-item name="13-1">组织架构</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '256px' }">
      <a-layout-header
        :style="{
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)'
        }"
      >
        <ul class="header-menu">
          <li>
            <a-icon type="md-barcode" size="18" />
          </li>
          <li>
            <a-icon type="md-expand" size="18" />
          </li>
          <li>
            <a-icon type="md-notifications" size="18" />
          </li>
          <li>凌可佳</li>
        </ul>
      </a-layout-header>
      <a-layout-content :style="{ padding: '16px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.layout {
  position: relative;
  overflow: hidden;
  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }
  .ant-layout-sider {
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .logo {
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #fff;
    i {
      margin-right: 5px;
    }
  }
  .header-menu {
    float: right;
    list-style: none;
    li {
      display: inline;
      margin-left: 24px;
    }
  }
}
</style>
