<template>
  <a-card :bordered="false" class="factors" title="因子设置">
    <a-form-model layout="inline" :model="formInline">
      <a-form-model-item>
        <a-input v-model="formInline.name" placeholder="因子名称" />
      </a-form-model-item>
      <!-- <a-form-model-item>
        <a-input v-model="formInline.code" placeholder="因子编号" />
      </a-form-model-item> -->
      <a-form-model-item>
        <a-button type="primary" @click="search">
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
      bordered
      rowKey="id"
      :loading="loading"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action" slot-scope="row">
        <a @click="onAddFactorsEdit(row)">编辑</a>
        <a-divider type="vertical" />
        <a @click="deleteInstrument(row)">删除</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showSizeChanger
      :total="total"
      :current="current"
      @change="pagechange"
      @showSizeChange="sizechange"
    />
    <!-- 新增因子 -->
    <add-factors
      :visible="addFactorsVisible"
      @cancel="onAddFactorsCancel"
      @confirm="onAddFactorsConfirm"
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
      total: 0,
      pagesize: 10,
      loading: false,
      visible: false,
      formInline: {
        name: ""
      },
      columns: [
        {
          align: "center",
          title: "序号",
          customRender: (_, __, index) => {
            return (
              <span>{index + (this.current - 1) * this.pagesize + 1}</span>
            );
          }
        },
        {
          align: "center",
          title: "因子名称",
          dataIndex: "name",
          key: "name"
        },
        {
          align: "center",
          title: "因子编码",
          key: "code",
          dataIndex: "code"
        },
        {
          align: "center",
          title: "均值单位",
          key: "avgUnit",
          dataIndex: "avgUnit"
        },
        {
          align: "center",
          title: "总值单位",
          key: "sumUnit",
          dataIndex: "sumUnit"
        },
        {
          align: "center",
          title: "类型",
          key: "type",
          dataIndex: "type"
        },
        {
          align: "center",
          title: "协议类型",
          key: "protocolType",
          dataIndex: "protocolType"
        },
        {
          align: "center",
          title: "参考值上限",
          key: "ceilval",
          dataIndex: "ceilval"
        },
        {
          align: "center",
          title: "参考值下限",
          key: "floorval",
          dataIndex: "floorval"
        },
        {
          align: "center",
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: []
    };
  },
  methods: {
    onAddFactorsCancel() {
      this.addFactorsVisible = false;
    },
    onAddClick() {
      this.addFactorsVisible = true;
    },
    onAddFactorsEdit(row) {
      this.$api.platform.getSysDivisorById({ id: row.id });
    },
    onAddFactorsConfirm() {
      this.addFactorsVisible = false;
      this.getTableData();
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
    search() {
      this.current = 1;
      this.getTableData();
    },
    getTableData() {
      let params = {
        pagesize: this.pagesize,
        page: this.current,
        name: this.formInline.name
      };
      this.loading = true;
      this.$api.platform
        .sysDivisor(params)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = +res.data.data.total;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
