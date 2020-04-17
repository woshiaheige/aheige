<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :span="8">
          <div class="header-info">
            <span>因子总数</span>
            <p>176</p>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="header-info">
            <span>废气因子</span>
            <p>67</p>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="header-info none-border">
            <span>废水因子</span>
            <p>83</p>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">因子设置</div>
        <div class="extra">
          <a-form layout="inline" :model="formInline">
            <a-form-item>
              <a-button type="primary" @click="onAddClick">
                <a-icon type="plus" />新建
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-radio-group
                :value="formInline.type"
                @change="handleTypeChange"
              >
                <a-radio-button value="all">全部</a-radio-button>
                <a-radio-button value="default">废水</a-radio-button>
                <a-radio-button value="small">废气</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item>
              <a-input-search
                placeholder="请输入因子名称"
                style="width: 200px"
                v-model="formInline.name"
                @search="onSubmit"
              />
            </a-form-item>
          </a-form>
        </div>
      </div>

      <a-table
        size="middle"
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
        size="small"
        v-margin:top="16"
        showSizeChanger
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        :current="current"
        @change="pagechange"
        @showSizeChange="sizechange"
      />
      <!-- 新增因子 -->
      <add-factors
        :visible="addFactorsVisible"
        @cancel="onAddFactorsCancel"
        @confirm="onAddFactorsConfirm"
        :factorsDetail="factorsDetail"
      ></add-factors>
    </a-card>
  </div>
</template>

<script>
import addFactors from "@/components/platform/factors/add-factors.vue";
export default {
  components: { addFactors },
  data() {
    return {
      addFactorsVisible: false,
      factorsDetail: "", //因子详情
      current: 1,
      total: 0,
      pagesize: 10,
      loading: false,
      formInline: {
        name: "",
        code: "",
        type: "all"
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
    handleTypeChange() {},
    onAddFactorsCancel() {
      this.addFactorsVisible = false;
    },
    onAddClick() {
      this.addFactorsVisible = true;
      this.factorsDetail = "";
    },
    onAddFactorsEdit(row) {
      this.$api.platform.getSysDivisorById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.factorsDetail = res.data.data;
          this.addFactorsVisible = true;
        }
      });
    },
    onAddFactorsConfirm() {
      this.addFactorsVisible = false;
      this.getTableData();
    },
    deleteInstrument(row) {
      console.log(row);
      let _this = this;
      this.$confirm({
        title: "删除",
        content: `是否删除因子 ${row.name}`,
        onOk() {
          console.log("OK");
          _this.$api.platform.deleteSysDivisor({ id: row.id }).then(res => {
            if (res.data.state == 0) {
              _this.$message.success("删除成功");
              _this.getTableData();
            } else {
              _this.$message.error(res.data.msg);
            }
          });
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    getTableData() {
      let params = {
        pagesize: this.pagesize,
        page: this.current,
        name: this.formInline.name,
        code: this.formInline.code
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
