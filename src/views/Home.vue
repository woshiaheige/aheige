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
        <img :src="require('@/assets/img/icon.png')" alt="" />
        <span>智维云</span>
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
          <a-sub-menu v-if="item.children.length > 0" :key="item.key">
            <span slot="title"
              ><a-icon :type="item.icon" /><span>{{ item.title }}</span></span
            >
            <a-menu-item v-for="subItem in item.children" :key="subItem.key">{{
              subItem.title
            }}</a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="item.key"
            ><a-icon :type="item.icon" /><span>{{
              item.title
            }}</span></a-menu-item
          >
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '256px' }">
      <a-layout-header class="layout-header">
        <div class="header-menu">
          <a-popover title="相关二维码" placement="bottom">
            <template slot="content">
              <a-row :gutter="16">
                <a-col :span="8">
                  <a-card style="width: 200px">
                    <img
                      alt="example"
                      style="width: 100%; height: 100%"
                      :src="require('@/assets/img/wx-app-qrcode.png')"
                    />
                    <template slot="actions" class="ant-card-actions">
                      <span>运维人员小程序</span>
                    </template>
                  </a-card>
                </a-col>
                <a-col :span="8">
                  <a-card style="width: 200px">
                    <img
                      alt="example"
                      style="width: 100%; height: 100%"
                      :src="
                        require('@/assets/img/wx-app-enterprise-qrcode.png')
                      "
                    />
                    <template slot="actions" class="ant-card-actions">
                      <span>企业用户小程序</span>
                    </template>
                  </a-card>
                </a-col>
                <a-col :span="8">
                  <a-card style="width: 200px">
                    <img
                      alt="example"
                      style="width: 100%; height: 100%"
                      :src="require('@/assets/img/official_account_qrcode.png')"
                    />
                    <template slot="actions" class="ant-card-actions">
                      <span>微信公众号</span>
                    </template>
                  </a-card>
                </a-col>
              </a-row>
            </template>
            <a-icon type="qrcode" :style="{ fontSize: '24px' }" />
          </a-popover>
          <!-- <a-icon type="bell" :style="{ fontSize: '24px' }" /> -->
          <a-dropdown>
            <div
              v-margin:left="16"
              style="cursor: pointer;"
              @click="e => e.preventDefault()"
            >
              <a-avatar
                style="backgroundColor:#2db7f5"
                icon="user"
                v-margin:right="5"
              /><span>{{ username }}</span>
            </div>

            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="changePsw">修改密码</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>

          <a-icon
            type="logout"
            :style="{ fontSize: '24px', marginLeft: '16px' }"
            @click="signOut"
          />
        </div>
      </a-layout-header>
      <a-page-header
        @back="() => $router.go(-1)"
        v-margin:top="66"
        :class="$route.meta.back ? 'back-show' : 'back-hide'"
      >
        <a-breadcrumb :routes="routes">
          <template slot="itemRender" slot-scope="{ route, params, routes }">
            <span v-if="routes.indexOf(route) === routes.length - 1">
              {{ route.breadcrumbName }}
            </span>
            <router-link v-else :to="route.path">
              {{ route.breadcrumbName }}
            </router-link>
          </template>
        </a-breadcrumb>
        <template slot="backIcon">
          <a-icon type="arrow-left" v-show="$route.meta.back" />
        </template>
        <template slot="title">{{ $route.meta.title }}</template>
      </a-page-header>
      <a-layout-content class="main-content" v-padding="16">
        <keep-alive :include="includeArr">
          <router-view></router-view>
        </keep-alive>
      </a-layout-content>
    </a-layout>
    <psw-modal :visible.sync="visible"></psw-modal>
  </div>
</template>
<script>
import routeTable from "@/router/routerTable";
import pswModal from "@/components/home/psw-modal";
export default {
  components: { pswModal },
  data() {
    return {
      routes: [
        {
          path: "/index/data",
          breadcrumbName: "首页"
        }
      ],
      collapsed: false,
      openKeys: [],
      selectedKeys: [],
      visible: false
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
    },
    menuList() {
      let permissionArr = JSON.parse(sessionStorage.getItem("permission"));
      let menuArr = [
        {
          title: "首页",
          id: 9,
          key: "dashboard",
          icon: "appstore",
          children: []
        },
        {
          title: "运维一览",
          id: 10,
          key: "index",
          icon: "home",
          children: []
        },
        {
          title: "监控中心",
          id: 11,
          key: "monitor",
          icon: "table",
          children: []
        },
        {
          title: "审批管理",
          id: 12,
          key: "approval",
          icon: "audit",
          children: []
        },
        {
          title: "运维管理",
          id: 13,
          key: "maintain",
          icon: "control",
          children: []
        },
        {
          title: "客户管理",
          id: 14,
          key: "customer",
          icon: "team",
          children: []
        },
        {
          title: "成本管理",
          id: 19,
          key: "cost",
          icon: "money-collect",
          children: []
        },
        {
          title: "人员考评",
          id: 20,
          key: "assessment",
          icon: "file-done",
          children: []
        },
        {
          title: "车辆管理",
          id: 15,
          key: "car",
          icon: "car",
          children: []
        },
        {
          title: "物资管理",
          id: 16,
          key: "product",
          icon: "gold",
          children: []
        },
        {
          title: "基础数据",
          id: 17,
          key: "platform",
          icon: "setting",
          children: []
        },
        {
          title: "系统设置",
          id: 18,
          key: "organization",
          icon: "user",
          children: []
        }
      ];

      permissionArr.forEach(item => {
        if (
          item.permission !== "" ||
          item.permission !== null ||
          item.permission !== undefined
        ) {
          menuArr.forEach(menuItem => {
            if (menuItem.id == item.parentId) {
              menuItem.children.push({
                title: item.name,
                key: item.permission
              });
            }
          });
        }
      });

      return menuArr;
    },
    username() {
      return JSON.parse(sessionStorage.getItem("userinfo")).username;
    },
    includeArr() {
      return this.$store.state.includeArr;
    }
  },
  watch: {
    $route() {
      this.setMenu();
      this.setBreadcrumbName();
    }
  },
  created() {
    this.removeLoading();
  },
  mounted() {
    this.setMenu();
    if (sessionStorage.getItem("routes")) {
      this.routes = JSON.parse(sessionStorage.getItem("routes"));
    }
  },
  methods: {
    //退出
    signOut() {
      let that = this;
      this.$confirm({
        title: "退出",
        content: "是否退出？",
        onOk() {
          sessionStorage.clear();
          that.$router.push("/login");
          setTimeout(() => {
            location.reload();
          }, 500);
        },
        onCancel() {}
      });
    },
    changePsw() {
      this.visible = true;
    },
    changeMenu(object) {
      console.log(object);
      for (let i in routeTable[1].children) {
        if (routeTable[1].children[i].key === object.key) {
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
    },
    setBreadcrumbName() {
      if (this.$route.path === "/dashboard") {
        this.routes = [
          {
            path: "/dashboard",
            breadcrumbName: "首页"
          }
        ];
      } else {
        if (!this.$route.meta.back) {
          this.routes = [
            {
              path: "/dashboard",
              breadcrumbName: "首页"
            },
            {
              path: this.$route.path,
              breadcrumbName: this.$route.meta.title
            }
          ];
        } else {
          if (this.routes.find(item => item.path === this.$route.path)) {
            this.routes.splice(this.routes.length - 1, 1);
          } else {
            this.routes.push({
              path: this.$route.path,
              breadcrumbName: this.$route.meta.title
            });
          }
        }
      }

      sessionStorage.setItem("routes", JSON.stringify(this.routes));
    }
  }
};
</script>
<style lang="less"></style>
