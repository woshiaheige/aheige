<template>
  <div>
    <a-card :bordered="false" v-margin:bottom="28">
      <a-form-model layout="inline" :model="formInline">
        <a-form-model-item>
          <a-input v-model="formInline.enterprise" placeholder="企业名称" />
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.point" placeholder="监控点名称" />
        </a-form-model-item>
        <a-form-model-item>
          <a-select
            placeholder="控制级别"
            v-width="150"
            @change="onLevelChange"
          >
            <a-select-option value="32">废水</a-select-option>
            <a-select-option value="31">废气</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card :bordered="false" title="监测数据">
      <a-table
        bordered
        rowKey="ents"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
      >
        <span slot="action" slot-scope="row">
          <a @click="toMonitorData(row)">实时数据</a>
        </span>
      </a-table>

      <a-pagination
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
      pageSize: 10,
      current: 1,
      total: 0,
      tableData: [
        {
          ents: "化一环境",
          industryName: "制造业",
          name: "1#排水口",
          pointTypeName: "废水,废气",
          controlType: "一般监管企业",
          factorCount: "25",
          isOnline: "在线",
          isNormal: "正常",
          dateTime: "2020-04-16 00:00:00"
        }
      ],
      columns: [
        {
          title: "序号",
          align: "center",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "企业名称",
          dataIndex: "ents",
          align: "center"
        },
        {
          title: "控制级别",
          dataIndex: "controlType",
          align: "center"
        },
        {
          title: "行业类型",
          dataIndex: "industryName",
          align: "center"
        },
        {
          title: "监控点名称",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "监测因子数",
          dataIndex: "factorCount",
          align: "center"
        },
        {
          title: "是否在线",
          dataIndex: "isOnline",
          align: "center"
        },
        {
          title: "是否异常",
          dataIndex: "isNormal",
          align: "center"
        },
        {
          title: "最后通讯时间",
          dataIndex: "dateTime",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      formInline: {
        enterprise: "",
        point: "",
        level: ""
      }
    };
  },
  mounted() {},
  methods: {
    onLevelChange(value) {
      this.form.level = value;
    },
    toMonitorData(row) {
      console.log(row);
      this.$router.push("/monitor/data");
    }
  }
};
</script>
