<template>
  <div>
    <a-tree @select="onSelect" :treeData="treeData" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      expandedKeys: [],
      autoExpandParent: true,
      treeData: [
        {
          id: "210000",
          checked: false,
          children: [
            {
              id: "210400",
              checked: false,
              children: [
                {
                  id: "1235742041091194881",
                  checked: false,
                  children: [],
                  title: "豪华陶瓷有限公司",
                  iconCls: "",
                  parentId: "210400",
                  parentIds: "",
                  provinceName: "",
                  grandfatherId: "",
                  value: "",
                  label: "",
                  have: 0,
                  url: "enterprise",
                  isOnline: 0,
                  mn: "",
                  leaf: false
                }
              ],
              title: "泉州市",
              iconCls: "",
              parentId: "210000",
              parentIds: "",
              provinceName: "",
              grandfatherId: "",
              value: "",
              label: "",
              have: 0,
              url: "",
              isOnline: 0,
              mn: "",
              leaf: false
            },
            {
              id: "210500",
              checked: false,
              children: [
                {
                  id: "1",
                  checked: false,
                  children: [],
                  title: "中林集团莆田国林木业城",
                  iconCls: "",
                  parentId: "210500",
                  parentIds: "",
                  provinceName: "",
                  grandfatherId: "",
                  value: "",
                  label: "",
                  have: 0,
                  url: "enterprise",
                  isOnline: 0,
                  mn: "",
                  leaf: false
                }
              ],
              title: "莆田市",
              iconCls: "",
              parentId: "210000",
              parentIds: "",
              provinceName: "",
              grandfatherId: "",
              value: "",
              label: "",
              have: 0,
              url: "",
              isOnline: 0,
              mn: "",
              leaf: false
            }
          ],
          title: "福建省",
          iconCls: "",
          parentId: "",
          parentIds: "",
          provinceName: "",
          grandfatherId: "",
          value: "",
          label: "",
          have: 0,
          url: "",
          isOnline: 0,
          mn: "",
          leaf: false
        }
      ]
    };
  },
  methods: {
    onSelect() {}
  }
};
</script>

<style></style>
