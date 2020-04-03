<template>
  <a-card :bordered="false" class="organization">
    <span slot="title">部门管理 </span>
    <a-row :gutter="16">
      <a-col class="department-left" :span="8">
        <department-tree></department-tree>
      </a-col>
      <a-col class="department-right" :span="16">
        <a-card>
          <a-breadcrumb separator=">">
            <a-breadcrumb-item>化一环境有限公司</a-breadcrumb-item>
            <a-breadcrumb-item href="">平台技术部</a-breadcrumb-item>
          </a-breadcrumb>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import departmentTree from "@/components/common/department-tree";
export default {
  components: { departmentTree },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped></style>
