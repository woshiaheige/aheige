<template>
  <a-card :bordered="false" class="factors" title="因子设置">
    <a-form-model layout="inline" :model="formInline">
      <a-form-model-item>
        <a-input v-model="formInline.name" placeholder="因子名称" />
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="formInline.name" placeholder="因子编码" />
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="onSubmit">
          查询
        </a-button>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="success" @click="onAddClick">
          新增
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action" slot-scope="row">
        <a @click="visible = true">编辑</a>
        <a-divider type="vertical" />
        <a @click="deleteInstrument(row)">删除</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <!-- 新增因子 -->
    <add-factors
      :visible="addFactorsVisible"
      @cancel="onAddFactorsCancel"
    ></add-factors>
  </a-card>
</template>

<script>
import addFactors from "@/components/platform/factors/add-factors.vue";
export default {
  components: { addFactors },
  data() {
    return {
      addFactorsVisible: false,
      current: 1,
      total: 1,
      visible: false,
      formInline: {
        name: ""
      },
      columns: [
        {
          title: "序号",
          dataIndex: "order",
          key: "order"
        },
        {
          title: "因子名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "编码",
          key: "code",
          dataIndex: "code"
        },
        {
          title: "均值单位",
          key: "avgUnit",
          dataIndex: "avgUnit"
        },
        {
          title: "总值单位",
          key: "sumUnit",
          dataIndex: "sumUnit"
        },
        {
          title: "类型",
          key: "type",
          dataIndex: "type"
        },
        {
          title: "协议类型",
          key: "protocolType",
          dataIndex: "protocolType"
        },
        {
          title: "参考值上限",
          key: "c",
          dataIndex: "c"
        },
        {
          title: "参考值下限",
          key: "f",
          dataIndex: "f"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          order: "1",
          id: "0",
          name: "PHP",
          code: "a21026z",
          avgUnit: "mg/m3",
          sumUnit: "mg/m3",
          type: "废气",
          protocolType: "17协议",
          c: "100",
          f: "0"
        },
        {
          order: "1",
          id: "1",
          name: "JAVA",
          code: "a21026z",
          avgUnit: "mg/m3",
          sumUnit: "mg/m3",
          type: "废气",
          protocolType: "17协议",
          c: "100",
          f: "0"
        },
        {
          order: "1",
          id: "2",
          name: "C++",
          code: "a21026z",
          avgUnit: "mg/m3",
          sumUnit: "mg/m3",
          type: "废气",
          protocolType: "17协议",
          c: "100",
          f: "0"
        }
      ]
    };
  },
  methods: {
    onAddFactorsCancel() {
      this.addFactorsVisible = false;
    },
    onAddClick() {
      this.addFactorsVisible = true;
    },
    // deleteInstrument(row) {
    //   console.log(row);
    //   this.$confirm({
    //     title: "删除",
    //     content: "是否删除",
    //     onOk() {
    //       console.log("OK");
    //     },
    //     onCancel() {
    //       console.log("Cancel");
    //     }
    //   });
    // }
    getTableData() {
      // this.$api.platform.getFactorsList().then(res => {
      //   if (res.status == 200) {
      //     this.tableData = res.data.data;
      //     this.total = res.data.total;
      //   }
      // });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
