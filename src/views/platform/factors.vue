<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :span="8">
          <div class="header-info">
            <span>因子总数</span>
            <p>{{ divisorCount.total }}</p>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="header-info">
            <span>废气因子</span>
            <p>{{ divisorCount.gasCount }}</p>
          </div>
        </a-col>
        <a-col :span="8">
          <div class="header-info none-border">
            <span>废水因子</span>
            <p>{{ divisorCount.waterCount }}</p>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">因子列表</div>
        <div class="extra">
          <a-form layout="inline" :model="formInline">
            <a-form-item>
              <a-button type="primary" @click="onAddClick">
                <a-icon type="plus" />新建
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-radio-group v-model="formInline.type" @change="onSubmit">
                <a-radio-button value="all">全部</a-radio-button>
                <a-radio-button value="32">废水</a-radio-button>
                <a-radio-button value="31">废气</a-radio-button>
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
        <template slot="protocolType" slot-scope="protocolType">
          <span v-show="protocolType == '05'">05协议</span>
          <span v-show="protocolType == '17'">17协议</span>
          <span v-show="protocolType == '0'">扩张协议</span>
        </template>
        <template slot="type" slot-scope="type">
          <a-tag color="blue" v-if="type == 32">水类</a-tag>
          <a-tag color="red" v-if="type == 31">气类</a-tag>
          <a-tag color="green" v-if="type != 31 && type != 32">其他</a-tag>
        </template>

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
      <!-- 新建因子 -->
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
      pageSize: 10,
      loading: false,
      formInline: {
        name: "",
        code: "",
        type: "all"
      },
      divisorCount: {}, //因子数量
      columns: [
        {
          title: "因子名称",
          dataIndex: "name"
        },
        {
          title: "因子编码",
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
          align: "center",
          title: "类型",
          key: "type",
          scopedSlots: { customRender: "type" },
          dataIndex: "type"
        },
        {
          align: "center",
          title: "协议类型",
          key: "protocolType",
          dataIndex: "protocolType",
          scopedSlots: { customRender: "protocolType" }
        },
        {
          title: "参考值上限",
          key: "ceilval",
          dataIndex: "ceilval"
        },
        {
          title: "参考值下限",
          key: "floorval",
          dataIndex: "floorval"
        },
        {
          align: "center",
          title: "操作",
          key: "action",
          width: 200,
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
        size: this.pageSize,
        page: this.current,
        name: this.formInline.name,
        code: this.formInline.code,
        type: this.formInline.type == "all" ? "" : this.formInline.type
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
    },
    countDivisor() {
      this.$api.platform.countDivisor().then(res => {
        if (res.data.state == 0) {
          this.divisorCount = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.getTableData();
    this.countDivisor();
  }
};
</script>
