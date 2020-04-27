<template>
  <a-modal
    title="站点报警信息"
    :visible="modelData.show"
    @cancel="handleCancel"
  >
    <a-table
      :rowKey="(record, index) => index"
      size="middle"
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      :loading="loading"
    >
    </a-table>
    <template slot="footer">
      <a-button type="primary" @click="closeReminds">关闭报警</a-button>
    </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      columns: [
        {
          title: "监控点名称",
          dataIndex: "pointName",
          key: "pointName"
        },
        {
          title: "因子名称",
          dataIndex: "divisorName",
          key: "divisorName"
        },
        {
          title: "下限",
          dataIndex: "floorval",
          key: "floorval"
        },
        {
          title: "上限",
          dataIndex: "ceilval",
          key: "ceilval"
        },
        {
          title: "超标值",
          dataIndex: "realVal",
          key: "realVal"
        }
      ],
      tableData: [],
      loading: true,
      id: ""
    };
  },
  computed: {
    modelData() {
      console.log(this.value);
      return this.value;
    }
  },
  methods: {
    handleCancel() {
      this.modelData.show = false;
    },
    getDetail(id, msgId) {
      this.id = msgId;
      this.$api.index
        .getPointById({ id: id })
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    closeReminds() {
      let data = {
        id: this.id,
        status: 1 //0:未处理 1已处理
      };
      let that = this;
      this.$api.index.closeMsg(data).then(res => {
        if (res.data.state == 0) {
          that.modelData.show = false;
          that.$emit("refresh");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
