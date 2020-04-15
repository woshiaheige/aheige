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
      :treeData="treeList"
      :replaceFields="replaceFields"
    >
      <template slot="custom" slot-scope="item">
        <span v-if="item.title.indexOf(searchValue) > -1">
          {{ item.title.substr(0, item.title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{
            item.title.substr(
              item.title.indexOf(searchValue) + searchValue.length
            )
          }}
        </span>
        <span v-else>{{ item.title }}</span>
        <a-icon
          type="plus"
          title="新增"
          v-margin:left="15"
          @click="onEdit(item, 'add')"
        />
        <a-icon
          type="form"
          title="编辑"
          v-margin:left="10"
          @click="onEdit(item, 'edit')"
        />
        <a-icon
          type="delete"
          title="删除"
          v-margin:left="10"
          @click="onDelete(item)"
        />
      </template>

      <!--<template slot="title" slot-scope="{ title }">
         <span v-if="title.indexOf(searchValue) > -1">
          {{ title.substr(0, title.indexOf(searchValue)) }}
          <span style="color: #f50">{{ searchValue }}</span>
          {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
        </span>
        <span v-else>{{ title }} <a @click="onDelete(row)">删除</a></span>
      </template>-->
    </a-tree>
    <add-edit :obj="obj" @cancel="cancel"></add-edit>
  </div>
</template>

<script>
import addEdit from "./add-edit";
export default {
  components: { addEdit },
  data() {
    return {
      expandedKeys: [], //展开的父节点
      searchValue: "",
      autoExpandParent: true, //是否自动展开父节点
      dataList: [
        {
          title: "化一环境有限公司",
          scopedSlots: { title: "custom" },
          id: "0-0",
          children: [
            {
              title: "技术部",
              scopedSlots: { title: "custom" },
              id: "0-0-0",
              children: [
                {
                  title: "分组1",
                  scopedSlots: { title: "custom" },
                  id: "0-0-0-0"
                },
                {
                  title: "分组2",
                  scopedSlots: { title: "custom" },
                  id: "0-0-0-1"
                },
                {
                  title: "分组3",
                  scopedSlots: { title: "custom" },
                  id: "0-0-0-2"
                }
              ]
            },
            {
              title: "开发部",
              scopedSlots: { title: "custom" },
              id: "0-0-1",
              children: [
                {
                  title: "分组1",
                  scopedSlots: { title: "custom" },
                  id: "0-0-1-0"
                },
                {
                  title: "分组2",
                  scopedSlots: { title: "custom" },
                  id: "0-0-1-1"
                },
                {
                  title: "分组3",
                  scopedSlots: { title: "custom" },
                  id: "0-0-1-2"
                }
              ]
            },
            {
              title: "生产部",
              scopedSlots: { title: "custom" },
              id: "0-0-2"
            }
          ]
        }
      ],
      treeList: [],
      replaceFields: {
        key: "id"
      },
      obj: {
        show: false
      }
    };
  },
  mounted() {
    this.initTree();
  },
  methods: {
    initTree() {
      this.treeList = this.dataList;
    },
    //展开/收起节点时触发
    onExpand(expandedKeys) {
      // console.log(expandedKeys);
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onDragend(selectedKeys) {
      console.log("点击节点");
      console.log(selectedKeys);
    },
    //tree search
    onSearch(e) {
      this.expandedKeys = [];
      let searchValue = e.target.value || "";
      this.treeList = this.dataList;
      if (searchValue) {
        this.expandedKeys = this.getParentKey(searchValue, this.treeList);

        let expandedKeys = this.expandedKeys;
        Object.assign(this, {
          expandedKeys,
          searchValue: searchValue,
          autoExpandParent: true
        });
      }
    },
    getParentKey(key, tree) {
      let parentKey = [];
      tree.forEach(node => {
        if (node.children) {
          if (node.children.some(item => item.title.indexOf(key) > -1)) {
            parentKey.push(node.id);
          } else {
            node.children.forEach(childItem => {
              if (childItem.children) {
                if (
                  childItem.children.some(item => item.title.indexOf(key) > -1)
                ) {
                  parentKey.push(childItem.id);
                }
              }
            });
          }
        }
      });
      return parentKey;
    },
    onEdit(item, key) {
      this.obj.show = true;
      this.obj.row = item;
      this.obj.key = key;
    },
    onDelete(item) {
      console.log(item);
      this.$confirm({
        title: "删除",
        content: "是否删除",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    cancel(value) {
      this.obj.show = value;
    }
  }
};
</script>
