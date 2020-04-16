<template>
  <div class="layout">
    <a-layout-sider
      width="256"
      :style="{
        position: 'fixed',
        height: '100vh',
        left: 0,
        overflow: 'auto',
        zIndex: 1
      }"
    >
      <div class="logo">
        <!-- <a-icon type="cloud" theme="filled" v-fontsize="28" />
        <span>博控智维云</span> -->
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
            <a-avatar icon="user" />
          </li>
          <li>凌可佳</li>
        </ul>
      </a-layout-header>
      <a-page-header title="监测数据" :breadcrumb="{ props: { routes } }" />
      <a-layout-content class="main-content" v-padding="30">
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
      routes: [
        {
          path: "/index",
          breadcrumbName: "首页"
        }
      ],
      collapsed: false,
      openKeys: [],
      selectedKeys: [],
      menuList: [
        {
          title: "运维一览",
          key: "index",
          icon: "home"
        },
        {
          title: "监控中心",
          key: "monitor",
          icon: "table",
          children: [
            {
              title: "监测数据",
              key: "monitor-standing"
            },
            {
              title: "超标数据",
              key: "monitor-exceed"
            },
            {
              title: "数据报表",
              key: "monitor-report"
            },
            {
              title: "异常数据",
              key: "monitor-unusual"
            }
            // {
            //   title: "传输速率",
            //   key: "speed"
            // },
            // {
            //   title: "报警管理",
            //   key: "warn"
            // }
            // {
            //   title: "每日运维",
            //   key: "maintenance"
            // }
            // {
            //   title: "设备反控",
            //   key: "control"
            // },
          ]
        },
        {
          title: "审批管理",
          key: "approval",
          icon: "audit"
        },
        {
          title: "运维管理",
          key: "maintain",
          icon: "control",
          children: [
            {
              title: "任务管理",
              key: "mission"
            },
            {
              title: "运维计划",
              key: "plan"
            },
            {
              title: "上报投诉",
              key: "complaint"
            },
            {
              title: "日常巡检",
              key: "inspection"
            },
            {
              title: "运维记录",
              key: "maintain-log"
            },
            {
              title: "运维知识",
              key: "knowledge"
            }
            // {
            //   title: "站点任务管理",
            //   key: "station-mission"
            // }
            // {
            //   title: "运维地图",
            //   key: "map"
            // },
            // {
            //   title: "车辆使用记录",
            //   key: "car-usage"
            // },
            // {
            //   title: "违章管理",
            //   key: "violation"
            // }
          ]
        },
        {
          title: "客户管理",
          key: "customer",
          icon: "team",
          children: [
            {
              title: "企业信息",
              key: "enterprise"
            },
            {
              title: "监控点管理",
              key: "station"
            },
            {
              title: "合同管理",
              key: "contract"
            },
            {
              title: "供应商管理",
              key: "supplier"
            }
            // {
            //   title: "企业用户",
            //   key: "user-enterprise"
            // }
          ]
        },
        // {
        //   title: "运维报表",
        //   key: "report",
        //   icon: "line-chart",
        //   children: [
        //     {
        //       title: "智能报表",
        //       key: "i-report"
        //     },

        //     {
        //       title: "仪器汇总",
        //       key: "device"
        //     },
        //     {
        //       title: "每日运维",
        //       key: "daily"
        //     },
        //     {
        //       title: "小组汇总",
        //       key: "team"
        //     }
        //   ]
        // },
        // {
        //   title: "智能维护",
        //   key: "i-maintain",
        //   icon: "tool",
        //   children: [
        //     {
        //       title: "运行日志",
        //       key: "operation-log"
        //     },
        //     {
        //       title: "报警管理",
        //       key: "warning"
        //     },
        //     {
        //       title: "远程控制",
        //       key: "remote"
        //     },

        //     {
        //       title: "运维计划",
        //       key: "plan"
        //     },
        //     {
        //       title: "报告模板",
        //       key: "template"
        //     },
        //     {
        //       title: "实时动态",
        //       key: "realtime"
        //     }
        //   ]
        // },
        {
          title: "车辆管理",
          key: "car",
          icon: "car",
          children: [
            {
              title: "车辆管理",
              key: "manage"
            },
            {
              title: "车辆使用记录",
              key: "usage"
            }
          ]
        },
        {
          title: "物品管理",
          key: "product",
          icon: "gold"
        },
        {
          title: "基础数据",
          key: "platform",
          icon: "setting",
          children: [
            {
              title: "因子设置",
              key: "factors"
            },
            {
              title: "运维设置",
              key: "operation"
            },
            {
              title: "行业设置",
              key: "industry"
            },
            {
              title: "数据字典",
              key: "dictionary"
            }
            // {
            //   title: "仪器设置",
            //   key: "instrument"
            // },

            // {
            //   title: "方案设置",
            //   key: "scheme"
            // }
          ]
        },
        {
          title: "系统设置",
          key: "organization",
          icon: "user",
          children: [
            {
              title: "用户管理",
              key: "member"
            },
            {
              title: "小组管理",
              key: "group"
            },
            // {
            //   title: "部门管理",
            //   key: "department"
            // },
            {
              title: "权限管理",
              key: "role"
            }
            // {
            //   title: "权限管理",
            //   key: "permission"
            // }
          ]
        }

        // {
        //   title: "我的工作台",
        //   key: "workbench",
        //   icon: "desktop"
        // }
        // {
        //   title: "台账管理",
        //   key: "standing",
        //   icon: "codepen",
        //   children: [
        //     {
        //       title: "车辆管理",
        //       key: "car"
        //     },
        //
        //     {
        //       title: "物品管理",
        //       key: "product"
        //     }
        //   ]
        // },
        // {
        //   title: "系统公告",
        //   key: "announcement",
        //   icon: "sound"
        // },
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
      this.routes.push({
        path: this.$route.path,
        breadcrumbName: this.$route.name
      });
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
