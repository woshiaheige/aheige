<template>
  <a-modal :title="title" :visible="visible" @cancel="closeModal">
    <a-tree
      checkable
      @expand="onExpand"
      :expandedKeys="expandedKeys"
      :autoExpandParent="autoExpandParent"
      v-model="checkedKeys"
      @select="onSelect"
      :selectedKeys="selectedKeys"
      :treeData="treeData"
    />
  </a-modal>
</template>

<script>
const treeData = [
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", key: "0-0-0-2" }
        ]
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", key: "0-0-1-2" }
        ]
      },
      {
        title: "0-0-2",
        key: "0-0-2"
      }
    ]
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      { title: "0-1-0-0", key: "0-1-0-0" },
      { title: "0-1-0-1", key: "0-1-0-1" },
      { title: "0-1-0-2", key: "0-1-0-2" }
    ]
  },
  {
    title: "0-2",
    key: "0-2"
  }
];
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      expandedKeys: ["0-0-0", "0-0-1"],
      autoExpandParent: true,
      checkedKeys: ["0-0-0"],
      selectedKeys: [],
      treeData
    };
  },
  computed: {
    title() {
      return "编辑权限";
    }
  },
  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    }
  }
};
</script>
