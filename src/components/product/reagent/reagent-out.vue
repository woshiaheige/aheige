<template>
  <a-modal
    :title="title"
    :visible="modelData.show"
    @cancel="handleCancel"
    :width="800"
  >
    <div v-margin:bottom="25">
      <a-table
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        :pagination="false"
        :loading="loading"
      >
        <template slot="type" slot-scope="type">
          <a-tag color="red" v-if="type == 1">出库</a-tag>
          <a-tag color="blue" v-if="type == 2">入库</a-tag>
        </template>
      </a-table>
      <a-pagination
        v-if="tableData.length > 0"
        size="small"
        showSizeChanger
        v-margin:top="5"
        :defaultCurrent="current"
        :pageSize.sync="pageSize"
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
    </div>
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
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      title: "",
      columns: [
        {
          title: "企业",
          dataIndex: "enterpriseName"
        },
        {
          title: "监控点",
          dataIndex: "pointName"
        },
        {
          title: "设备",
          dataIndex: "devName"
        },
        {
          title: "数量",
          dataIndex: "stockCount",
          align: "center",
          width: 100
        },
        {
          title: "时间",
          dataIndex: "gmtCreate",
          align: "center",
          width: 150
        },
        {
          title: "操作人",
          dataIndex: "username",
          align: "center",
          width: 100
        }
      ],
      tableData: []
    };
  },
  computed: {
    modelData() {
      return this.value;
    }
  },
  methods: {
    getTableData() {
      let data = {
        size: this.pageSize,
        page: this.current,
        goodId: this.modelData.row.id
      };
      this.loading = true;
      this.$api.product
        .getStockList(data)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = Number(res.data.data.total);
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    handleCancel() {
      this.modelData.show = false;
    }
  },
  mounted() {},
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.current = 1;
        this.pageSize = 10;
        this.getTableData();
        this.title = this.modelData.row.name + "出库详情";
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
