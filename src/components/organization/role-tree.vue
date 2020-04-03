<template>
  <div>
    <div>
      <a-button type="primary">添加角色组</a-button>
      <a-button v-margin:left="15">添加角色</a-button>
    </div>
    <a-tree
      @expand="onExpand"
      :expandedKeys="expandedKeys"
      :autoExpandParent="autoExpandParent"
      :treeData="dataList"
    >
      <template slot="title" slot-scope="{ title }">
        <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }}</span>
      </template>
    </a-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      dataList: [
        {
          title: "默认角色组",
          key: "0-0",
          children: [
            {
              title: "主管理员",
              key: "0-0-0"
            },
            {
              title: "子管理员",
              key: "0-0-1"
            },
            {
              title: "负责人",
              key: "0-0-2"
            }
          ]
        },
        {
          title: "技术开发部",
          key: "0-2",
          children: [
            { title: "前端开发", key: "0-2-0-0" },
            { title: "Java开发", key: "0-2-0-1" },
            { title: "安卓开发", key: "0-2-0-2" },
            { title: "ios开发", key: "0-2-0-3" }
          ]
        },
        {
          title: "现场运维部",
          key: "0-1"
        },
        {
          title: "系统维护部",
          key: "0-3"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    initTree() {},
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange() {}
  }
};
</script>
