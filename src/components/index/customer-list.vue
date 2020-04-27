<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="warnList" :loading="loading">
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions" @click="closeReminds(item.id)">关闭提醒</a>
        <div>
          <a-avatar :src="require('@/assets/img/complain.png')" />
          <span v-color="'#424242'" v-margin:left="8"
            >{{ item.enterpriseName }}于{{
              item.dataTime
            }}提交了投诉建议,请及时处理！</span
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
      :defaultCurrent="current"
      @change="pagechange"
      @showSizeChange="sizechange"
      :total="total"
    />
    <customer-detail
      ref="child"
      v-model="obj"
      @refresh="getTableData"
    ></customer-detail>
  </div>
</template>

<script>
import customerDetail from "@/components/index/customer-detail";
export default {
  components: { customerDetail },
  data() {
    return {
      loading: false,
      warnList: [],
      total: 0,
      pagesize: 10,
      current: 1,
      obj: {
        show: false
      }
    };
  },
  methods: {
    getTableData() {
      this.loading = true;
      let data = {
        index: this.current,
        size: this.pagesize,
        type: 3 //1： 站点预警提醒，2：合同提醒 3：客户投诉
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
