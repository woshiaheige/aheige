<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="时间">
          <a-range-picker
            :allowClear="false"
            v-model="list.range"
            :show-time="{ format: 'HH:mm:ss' }"
            format="YYYY-MM-DD HH:mm:ss"
            @change="handleChange"
          />
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查询
          </a-button>
          <a-button @click="reset()" v-margin:left="16">
            重置
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" class="contract" v-margin:top="16">
      <div class="card-header">
        <div class="title">报文日志</div>
      </div>
      <a-table
        :rowKey="(record, index) => index"
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
        :loading="loading"
      >
      </a-table>

      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :current="current"
        :pageSize.sync="pageSize"
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      list: {
        range: [
          this.$moment(this.$moment().format("YYYY-MM-DD") + " 00:00:00"),
          this.$moment(this.$moment().format("YYYY-MM-DD") + " 23:59:59")
        ]
      },
      columns: [
        {
          title: "报文时间",
          dataIndex: "gmtCreate",
          key: "gmtCreate",
          width: 160
        },
        {
          title: "报文内容",
          dataIndex: "text",
          key: "text"
        }
      ],
      tableData: []
    };
  },
  methods: {
    reset() {
      this.list = {
        range: [
          this.$moment(this.$moment().format("YYYY-MM-DD") + " 00:00:00"),
          this.$moment(this.$moment().format("YYYY-MM-DD") + " 23:59:59")
        ]
      };
      this.onSubmit();
    },
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        beginTime: this.list.range[0].format("YYYY-MM-DD HH:mm:ss"),
        endTime: this.list.range[1].format("YYYY-MM-DD HH:mm:ss")
      };
      this.loading = true;
      this.$api.log
        .getMsgList(data)
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
    handleChange(date, dateString) {
      if (
        this.$moment(dateString[1]).valueOf() >
        this.$moment(dateString[0])
          .add(1, "months")
          .valueOf()
      ) {
        let end = this.$moment(dateString[0], "YYYY-MM-DD").add(1, "months");
        this.list.range[1] = end;
      } else {
        this.list.range[1] = date[1];
      }
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
