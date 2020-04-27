<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="warnList" :loading="loading">
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions" @click="goDetail(item.busineId, item.id)">关闭提醒</a>
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
    goDetail(id, msgId) {
      this.obj.show = true;
      this.$refs.child.getDetail(id, msgId);
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>

<style></style>
