<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="warnList" :loading="loading">
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions" @click="closeReminds(item.id)">关闭提醒</a>
        <div>
          <a-avatar :src="require('@/assets/img/iconbianzu3.png')" />
          <span v-color="'#424242'" v-margin:left="8"
            >{{ item.gmtCreate }} {{ item.content }}</span
          >
        </div>
      </a-list-item>
    </a-list>
    <a-pagination
      size="small"
      :showTotal="total => `共 ${total} 条`"
      v-margin:top="16"
      showSizeChanger
      :pageSize.sync="pagesize"
      :current="current"
      @change="pagechange"
      @showSizeChange="sizechange"
      :total="total"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      warnList: [],
      total: 0,
      pagesize: 10,
      current: 1
    };
  },
  methods: {
    getTableData() {
      let data = {
        index: this.current,
        size: this.pagesize,
        type: 7 //1： 站点预警提醒，2：合同提醒 3：客户投诉  4:审批通知   5:任务通知  6:报表推送 7 出库警戒提醒 8 年检提醒',
      };
      this.$api.index
        .reminds(data)
        .then(res => {
          if (res.data.state == 0) {
            this.total = Number(res.data.data.total);
            this.warnList = res.data.data.records;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    closeReminds(id) {
      let that = this;

      this.$confirm({
        title: "确认关闭",
        content: "确认关闭警告？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          let data = {
            id,
            status: 1 //0:未处理 1已处理
          };

          that.$api.index.closeMsg(data).then(res => {
            if (res.data.state == 0) {
              that.getTableData();
            }
          });
        },
        onCancel() {}
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>

<style></style>
