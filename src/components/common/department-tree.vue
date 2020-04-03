<template>
  <div>
    <a-input-search
      style="margin-bottom: 8px"
      placeholder="搜索员工或部门"
      @change="onSearch"
    />
    <a-tree
      @expand="onExpand"
      @select="onDragend"
      :expandedKeys="expandedKeys"
      :autoExpandParent="autoExpandParent"
      :treeData="dataList"
      :replaceFields="replaceFields"
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
      expandedKeys: [], //展开的父节点
      searchValue: "",
      autoExpandParent: true, //是否自动展开父节点
      dataList: [
        {
          title: "化一环境有限公司",
          id: "1",
          children: [
            {
              title: "技术部",
              id: "0-0-0",
              children: [
                { title: "分组1", id: "0-0-0-0" },
                { title: "分组2", id: "0-0-0-1" },
                { title: "分组3", id: "0-0-0-2" }
              ]
            },
            {
              title: "开发部",
              id: "0-0-1",
              children: [
                { title: "分组1", id: "0-0-1-0" },
                { title: "分组2", id: "0-0-1-1" },
                { title: "分组3", id: "0-0-1-2" }
              ]
            },
            {
              title: "生产部",
              id: "0-0-2"
            }
          ]
        },
        {
          title: "广州分公司",
          id: "0-1",
          children: [
            { title: "生产部", id: "0-1-0-0" },
            { title: "开发部", id: "0-1-0-1" },
            { title: "技术部", id: "0-1-0-2" }
          ]
        }
      ],
      replaceFields: {
        key: "id"
      }
    };
  },
  mounted() {},
  methods: {
    //展开/收起节点时触发
    onExpand(expandedKeys) {
      // console.log(expandedKeys);
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onDragend(selectedKeys, e) {
      console.log(selectedKeys);
      console.log(e);
    },
    onSearch(e) {
      console.log(e.target.value);
    }
  }
};
</script>
