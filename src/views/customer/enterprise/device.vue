<template>
  <a-card :bordered="false" class="station">
    <span slot="title">
      <a-icon type="arrow-left" @click="$router.back(-1)" />监测设备
    </span>
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="设备名称"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="生产厂家"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="设备型号"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查找
        </a-button>
        <a-button type="success" v-margin:left="10" @click="onEdit()">
          新增
        </a-button>
      </a-form-item>
    </a-form>

    <a-table
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
      bordered
    >
      <span slot="downLoad">
        <a>附件下载</a>
      </span>
      <span slot="action" slot-scope="row">
        <a @click="onEdit(row)">编辑</a>
        <a-divider type="vertical" />
        <a @click="onDelete(row)">删除</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <add-edit :obj="obj" @cancel="cancel"></add-edit>
  </a-card>
</template>

<script>
import addEdit from "@/components/customer/enterprise/add-edit-device";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      total: 1,
      columns: [
        {
          title: "序号",
          align: "center",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "设备名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "生产厂家",
          dataIndex: "company",
          key: "company",
          align: "center"
        },
        {
          title: "设备型号",
          dataIndex: "model",
          key: "model",
          align: "center"
        },
        {
          title: "设备类型",
          dataIndex: "type",
          key: "type",
          align: "center"
        },
        {
          title: "验收时间",
          key: "time",
          dataIndex: "time",
          align: "center"
        },
        {
          title: "验收材料",
          key: "downLoad",
          scopedSlots: { customRender: "downLoad" },
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ],
      tableData: [
        {
          name: "排污设备",
          company: "环保公司",
          model: "001",
          type: "废水",
          time: "2020-02-02"
        },
        {
          name: "排污设备",
          company: "环保公司",
          model: "002",
          type: "废气",
          time: "2020-02-12"
        }
      ],
      obj: {
        show: false
      }
    };
  },
  methods: {
    getTableData() {},
    onDelete(row) {
      console.log(row);
      this.$confirm({
        title: "删除",
        content: "是否删除",
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    onEdit(row) {
      this.obj.show = true;
      this.obj.row = row;
    },
    cancel(value) {
      this.obj.show = value;
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
