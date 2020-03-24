<template>
  <div class="layout">
    <a-layout-sider
      width="256"
      :style="{ position: 'fixed', height: '100vh', left: 0, overflow: 'auto' }"
    >
      <div class="logo">
        <a-icon
          type="alipay-circle"
          theme="filled"
          :style="{ fontSize: '28px' }"
        />
        <span>博控智维云</span>
      </div>
      <a-menu
        active-name="1-1"
        theme="dark"
        width="auto"
        mode="inline"
        @click="changeMenu"
        :defaultOpenKeys="openMenu"
        :defaultSelectedKeys="selectedMenu"
      >
        <template v-for="item in menuList">
          <a-menu-item v-if="!item.children" :key="item.key">
            <a-icon :type="item.icon" />
            {{ item.title }}
          </a-menu-item>
          <a-sub-menu v-if="item.children" :key="item.key">
            <span slot="title"
              ><a-icon :type="item.icon" /><span>{{ item.title }}</span></span
            >
            <a-menu-item v-for="subItem in item.children" :key="subItem.key">{{
              subItem.title
            }}</a-menu-item>
          </a-sub-menu>
        </template>
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
            <a-icon type="aliwangwang" :style="{ fontSize: '18px' }" />
          </li>
          <li>
            <a-icon type="aliwangwang" :style="{ fontSize: '18px' }" />
          </li>
          <li>
            <a-icon type="aliwangwang" :style="{ fontSize: '18px' }" />
          </li>
          <li>凌可佳</li>
          <li>
            <a-icon type="aliwangwang" :style="{ fontSize: '18px' }" />
          </li>
        </ul>
      </a-layout-header>
      <a-layout-content v-padding="30">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import routeTable from "@/router/routerTable";
export default {
  data() {
    return {
      menuList: [
        {
          title: "首页",
          key: "index",
          icon: "alipay-circle",
          url: ""
        },
        {
          title: "工作台",
          key: "workbench",
          icon: "alipay-circle",
          url: ""
        },
        {
          title: "任务审批",
          key: "examination",
          icon: "alipay-circle",
          children: [
            {
              title: "等待审批",
              key: "wait",
              url: ""
            },
            {
              title: "参与的审批",
              key: "participate",
              url: ""
            },
            {
              title: "发起的审批",
              key: "start",
              url: ""
            },
            {
              title: "发起审批",
              key: "to-start",
              url: ""
            }
          ]
        },
        {
          title: "运维管理",
          key: "maintain",
          icon: "alipay-circle",
          children: [
            {
              title: "任务一览",
              key: "mission",
              url: ""
            },
            {
              title: "站点任务管理",
              key: "station-mission",
              url: ""
            },
            {
              title: "运维地图",
              key: "map",
              url: ""
            },
            {
              title: "车辆使用记录",
              key: "car-usage",
              url: ""
            },
            {
              title: "违章管理",
              key: "violation",
              url: ""
            },
            {
              title: "上报投诉",
              key: "complaint",
              url: ""
            }
          ]
        },
        {
          title: "运维报表",
          key: "report",
          icon: "alipay-circle",
          children: [
            {
              title: "运维记录报告",
              key: "maintain-log",
              url: ""
            },
            {
              title: "智能报表",
              key: "i-report",
              url: ""
            },
            {
              title: "巡检记录",
              key: "inspection",
              url: ""
            },
            {
              title: "发起的审批",
              key: "start",
              url: ""
            },
            {
              title: "仪器汇总",
              key: "device",
              url: ""
            },
            {
              title: "每日运维",
              key: "daily",
              url: ""
            },
            {
              title: "小组汇总",
              key: "team",
              url: ""
            }
          ]
        },
        {
          title: "智能维护",
          key: "i-maintain",
          icon: "alipay-circle",
          children: [
            {
              title: "运行日志",
              key: "operation-log",
              url: ""
            },
            {
              title: "报警管理",
              key: "warning",
              url: ""
            },
            {
              title: "远程控制",
              key: "remote",
              url: ""
            },
            {
              title: "运维方案",
              key: "scheme",
              url: ""
            },
            {
              title: "运维计划",
              key: "plan",
              url: ""
            },
            {
              title: "报告模板",
              key: "template",
              url: ""
            },
            {
              title: "实时动态",
              key: "realtime",
              url: ""
            }
          ]
        },
        {
          title: "客户管理",
          key: "customer",
          icon: "alipay-circle",
          children: [
            {
              title: "一企一档",
              key: "enterprise",
              url: ""
            },
            {
              title: "站点管理",
              key: "station",
              url: ""
            },
            {
              title: "合同管理",
              key: "contract",
              url: ""
            }
          ]
        },
        {
          title: "台账管理",
          key: "standing",
          icon: "alipay-circle",
          children: [
            {
              title: "车辆管理",
              key: "car",
              url: ""
            },
            {
              title: "供应商管理",
              key: "supplier",
              url: ""
            },
            {
              title: "物品管理",
              key: "product",
              url: ""
            }
          ]
        },
        {
          title: "系统公告",
          key: "announcement",
          icon: "alipay-circle",
          url: ""
        },
        {
          title: "运维知识库",
          key: "knowledge",
          icon: "alipay-circle",
          url: ""
        },
        {
          title: "平台配置",
          key: "platform",
          icon: "alipay-circle",
          children: [
            {
              title: "组织架构",
              key: "organization",
              url: ""
            },
            {
              title: "企业设置",
              key: "enterprise-setup",
              url: ""
            },
            {
              title: "基础数据",
              key: "basic-data",
              url: ""
            },
            {
              title: "设备设置",
              key: "device-setup",
              url: ""
            }
          ]
        }
      ]
    };
  },
  computed: {
    selectedMenu() {
      let selectedMenuArr = [];
      for (let i in routeTable[1].children) {
        if (this.$route.path.indexOf(routeTable[1].children[i].path) > -1) {
          if (routeTable[1].children[i].key) {
            selectedMenuArr.push(routeTable[1].children[i].key);
            break;
          }
        }
      }

      return selectedMenuArr;
    },
    openMenu() {
      let openMenuArr = [];
      for (let i in this.menuList) {
        if (this.$route.path.indexOf(this.menuList[i].key) > -1) {
          openMenuArr.push(this.menuList[i].key);
          break;
        }
      }

      return openMenuArr;
    }
  },
  mounted() {},
  methods: {
    changeMenu(object) {
      for (let i in routeTable[1].children) {
        if (routeTable[1].children[i].key == object.key) {
          this.$router.push(routeTable[1].children[i].path);
        }
      }
    }
  }
};
</script>
<style lang="less"></style>
