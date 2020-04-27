<template>
  <div>
    <a-list itemLayout="horizontal" :dataSource="warnList" :loading="loading">
      <a-list-item slot="renderItem" slot-scope="item">
        <div>
          <a-avatar :src="require('@/assets/img/alarm.png')" />
          <span v-color="'#424242'" v-margin:left="8"
            >{{ item.enterpriseName }}XX监测点于{{ item.dataTime }}发生{{
              item.title
            }},请及时处理！</span
          >
        </div>
        <a slot="actions" @click="goDetail(item.busineId, item.id)">关闭提醒</a>
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
    <point-detail
      ref="child"
      v-model="obj"
      @refresh="getTableData"
    ></point-detail>
  </div>
</template>

<script>
import pointDetail from "@/components/index/point-detail";
export default {
  components: { pointDetail },
  data() {
    return {
      loading: false,
      warnList: [],
      total: 0,
      pagesize: 10,
      current: 1,
      item: {},
      obj: {
        show: false
      }
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
