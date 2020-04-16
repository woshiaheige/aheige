<template>
  <div>
    <a-card :bordered="false" v-margin:bottom="28">
      <a-form-model layout="inline" :model="formInline">
        <a-form-model-item>
          <a-range-picker @change="onChange" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <a-card :bordered="false">
      <span slot="title">
        <a-icon type="arrow-left" @click="$router.back(-1)" />实时数据
      </span>

      <a-table
        :loading="loading"
        :rowKey="(record, index) => index"
        size="middle"
        bordered
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
      >
        <span slot="action" slot-scope="row">
          <a @click="toMonitorData(row)">监测数据</a>
        </span>
      </a-table>

      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pageSize"
        :defaultCurrent="current"
        :total="total"
      />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      pointId: "",
      pageSize: 10,
      current: 1,
      total: 0,
      tableData: [
        {
          date: "2020-04-25 16:43:00",
          temperature: "30",
          gas: "二氧化碳"
        },
        {
          date: "2020-04-25 16:43:00",
          temperature: "30",
          gas: "二氧化碳"
        }
      ],
      columns: [
        {
          title: "时间",
          dataIndex: "date",
          key: "date",
          align: "center"
        },
        {
          title: "温度",
          dataIndex: "temperature",
          key: "temperature",
          align: "center"
        },
        {
          title: "废气",
          dataIndex: "gas",
          key: "gas",
          align: "center"
        }
      ],
      formInline: {
        beginTime: "",
        endTime: ""
      }
    };
  },
  mounted() {
    this.setPointId();
    this.getRealData();
  },
  methods: {
    onChange(date, dateString) {
      this.formInline.beginTime = dateString[0] + " 00:00:00";
      this.formInline.endTime = dateString[1] + " 23:59:59";
    },
    setPointId() {
      this.pointId = this.$route.params.row.pointId;
    },
    getRealData() {
      this.loading = true;
      let data = this.pointId;
      this.$api.monitor
        .getRealData(data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
