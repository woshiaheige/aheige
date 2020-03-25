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
        theme="dark"
        width="auto"
        mode="inline"
        @click="changeMenu"
        @openChange="openChangeMenu"
        :defaultOpenKeys="openMenu"
        :defaultSelectedKeys="selectedMenu"
        :openKeys="openKeys"
        :selectedKeys="selectedKeys"
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
      openKeys: [],
      selectedKeys: [],
      menuList: [
        {
          title: "首页",
          key: "index",
          icon: "alipay-circle"
        },
        {
          title: "工作台",
          key: "workbench",
          icon: "alipay-circle"
        },
        {
          title: "任务审批",
          key: "approval",
          icon: "alipay-circle",
          children: [
            {
              title: "等待审批",
              key: "wait"
            },
            {
              title: "参与的审批",
              key: "participate"
            },
            {
              title: "发起的审批",
              key: "start"
            },
            {
              title: "发起审批",
              key: "to-start"
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
              key: "mission"
            },
            {
              title: "站点任务管理",
              key: "station-mission"
            },
            {
              title: "运维地图",
              key: "map"
            },
            {
              title: "车辆使用记录",
              key: "car-usage"
            },
            {
              title: "违章管理",
              key: "violation"
            },
            {
              title: "上报投诉",
              key: "complaint"
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
              key: "maintain-log"
            },
            {
              title: "智能报表",
              key: "i-report"
            },
            {
              title: "巡检记录",
              key: "inspection"
            },
            {
              title: "仪器汇总",
              key: "device"
            },
            {
              title: "每日运维",
              key: "daily"
            },
            {
              title: "小组汇总",
              key: "team"
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
              key: "operation-log"
            },
            {
              title: "报警管理",
              key: "warning"
            },
            {
              title: "远程控制",
              key: "remote"
            },
            {
              title: "运维方案",
              key: "scheme"
            },
            {
              title: "运维计划",
              key: "plan"
            },
            {
              title: "报告模板",
              key: "template"
            },
            {
              title: "实时动态",
              key: "realtime"
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
              key: "enterprise"
            },
            {
              title: "站点管理",
              key: "station"
            },
            {
              title: "合同管理",
              key: "contract"
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
              key: "car"
            },
            {
              title: "供应商管理",
              key: "supplier"
            },
            {
              title: "物品管理",
              key: "product"
            }
          ]
        },
        {
          title: "系统公告",
          key: "announcement",
          icon: "alipay-circle"
        },
        {
          title: "运维知识库",
          key: "knowledge",
          icon: "alipay-circle"
        },
        {
          title: "平台配置",
          key: "platform",
          icon: "alipay-circle",
          children: [
            {
              title: "组织架构",
              key: "organization"
            },
            {
              title: "企业设置",
              key: "enterprise-setup"
            },
            {
              title: "基础数据",
              key: "basic-data"
            },
            {
              title: "设备设置",
              key: "device-setup"
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
        if (this.$route.path.indexOf("/" + this.menuList[i].key + "/") > -1) {
          openMenuArr.push(this.menuList[i].key);
          break;
        }
      }

      return openMenuArr;
    }
  },
  watch: {
    $route() {
      this.setMenu();
    }
  },
  mounted() {
    this.setMenu();
  },
  methods: {
    changeMenu(object) {
      for (let i in routeTable[1].children) {
        if (routeTable[1].children[i].key == object.key) {
          this.$router.push(routeTable[1].children[i].path);
        }
      }
    },
    openChangeMenu(openKeys) {
      // 只展开一个子菜单
      let latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      this.openKeys = latestOpenKey ? [latestOpenKey] : [];
    },
    setMenu() {
      this.openKeys = this.openMenu;
      this.selectedKeys = this.selectedMenu;
    }
  }
};
</script>
<style lang="less"></style>
