<template>
  <a-modal
    :title="carModal.info.name + '库存详情'"
    v-model="carModal.show"
    @cancel="handleCancel"
  >
    <a-table
      size="middle"
      :columns="columns"
      :dataSource="data"
      v-margin:top="16"
      :pagination="false"
    >
    </a-table>
    <template slot="footer">
      <a-button @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      columns: [
        {
          title: "类型",
          dataIndex: "type",
          align: "center"
        },
        {
          title: "数量",
          dataIndex: "num",
          align: "center"
        },
        {
          title: "时间",
          dataIndex: "date",
          align: "center"
        },
        {
          title: "操作人",
          dataIndex: "operator",
          align: "center"
        }
      ],
      data: [
        {
          key: "1",
          type: "入库",
          num: "500",
          date: "2020.5.21",
          operator: "陈琛琛"
        }
      ]
    };
  },
  computed: {
    carModal() {
      return this.value;
    }
  },
  methods: {
    handleCancel() {
      this.carModal.show = false;
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped></style>
