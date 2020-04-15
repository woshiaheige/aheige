<template>
  <a-card :bordered="false" class="standing" title="监测数据">
    <a-form-model layout="inline" :model="formInline">
      <a-form-model-item>
        <a-input v-model="formInline.name" placeholder="企业名称" />
      </a-form-model-item>
      <a-form-model-item>
        <a-select placeholder="行业类别" v-width="150">
          <a-select-option value="32">废水</a-select-option>
          <a-select-option value="31">废气</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary">
          查询
        </a-button>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="success">
          新增
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-table
      bordered
      rowKey="id"
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
      v-margin:top="16"
      showSizeChanger
      :pageSize.sync="pageSize"
      :defaultCurrent="current"
      :total="total"
    />
  </a-card>
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
          name: "化一环境",
          creditCode: "912357122321765hy",
          industryName: "制造业",
          pointTypeName: "废水,废气",
          controlType: "一般监管企业",
          pointCount: "25"
        },
        {
          name: "广州博控",
          creditCode: "912357122321765bc",
          industryName: "制造业",
          pointTypeName: "废水,废气",
          controlType: "一般监管企业",
          pointCount: "30"
        }
      ],
      columns: [
        {
          title: "企业名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "统一社会代码",
          dataIndex: "creditCode",
          key: "creditCode",
          align: "center"
        },
        {
          title: "行业类别",
          dataIndex: "industryName",
          key: "industryName",
          align: "center"
        },
        {
          title: "监测类型",
          dataIndex: "pointTypeName",
          key: "pointTypeName",
          align: "center"
        },
        {
          title: "控制类别",
          dataIndex: "controlType",
          key: "controlType",
          align: "center"
        },
        {
          title: "监测点数",
          dataIndex: "pointCount",
          key: "pointCount",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      formInline: {
        name: "",
        type: ""
      }
    };
  },
  mounted() {},
  methods: {
    toMonitorData(row) {
      console.log(row);
      this.$router.push("/monitor/data");
    }
  }
};
</script>
