<template>
  <a-card :bordered="false" class="factors" title="因子设置">
    <a-form-model layout="inline" :model="formInline">
      <a-form-model-item>
        <a-input v-model="formInline.name" placeholder="因子名称" />
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
          key: "agreement",
          dataIndex: "agreement"
        },
        {
          title: "总值单位",
          key: "agreements",
          dataIndex: "agreement"
        },
        {
          title: "类型",
          key: "sort",
          dataIndex: "sort"
        },
        {
          title: "协议类型",
          key: "speedUnit",
          dataIndex: "speedUnit"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        // {
        //   order: "1",
        //   id: "0",
        //   name: "污水",
        //   code: "W0000",
        //   sort: "水",
        //   agreement: "05协议",
        //   speedUnit: "秒/升",
        //   totalUnit: "立方米"
        // },
        // {
        //   order: "1",
        //   id: "0",
        //   name: "污水",
        //   code: "W0000",
        //   sort: "水",
        //   agreement: "17协议",
        //   speedUnit: "秒/升",
        //   totalUnit: "立方米"
        // }
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
