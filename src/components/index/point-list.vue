<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="warnList" :loading="loading">
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions">查看详情</a>
        <a-list-item-meta :description="item.content">
          <a slot="title">{{ item.enterpriseName }}</a>
          <a-avatar slot="avatar" :src="require('@/assets/img/alarm.png')" />
        </a-list-item-meta>
        <div v-margin:right="48">
          <p>报警类型</p>
          <p>{{ item.title }}</p>
        </div>
        <div>
          <p>报警时间</p>
          <p>{{ item.dataTime }}</p>
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
      current: 1,
      item: {}
    };
  },
  methods: {
    //获取列表数据
    getTableData() {
      this.loading = true;
      let data = {
        index: this.current,
        size: this.pagesize,
        type: 1 //1： 站点预警提醒，2：合同提醒 3：客户投诉
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
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>

<style></style>
