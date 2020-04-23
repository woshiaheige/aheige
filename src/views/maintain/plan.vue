<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card :bordered="false">
          <div class="card-header">
            <div class="title">配置站点</div>
            <div class="extra">
              <div class="extra">
                <span>{{ stationList.length }}</span>
              </div>
            </div>
          </div>
          <a-tabs
            :defaultActiveKey="1"
            tabPosition="left"
            size="small"
            v-model="currentTab"
            @change="getPlanStation"
          >
            <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.tab">
              <a-radio-group
                :defaultValue="31"
                buttonStyle="solid"
                v-model="currentType"
              >
                <a-radio-button :value="31">气类站点</a-radio-button>
                <a-radio-button :value="32">水类站点</a-radio-button>
                <a-radio-button :value="0">其他站点</a-radio-button>
              </a-radio-group>
              <a-menu v-model="currentStation" mode="vertical">
                <a-menu-item v-for="item in stationList" :key="item.id">
                  {{ item.name }}
                </a-menu-item>
                <a-empty v-margin:top="16" v-if="stationList.length <= 0" />
              </a-menu>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-col>
      <a-col :span="16">
        <a-card :bordered="false" class="maintain">
          <div class="card-header">
            <div class="title">站点运维计划</div>
            <div class="extra">
              <div class="extra">
                <a-form layout="inline">
                  <a-form-item>
                    <a-button type="primary" @click="onAddClick">
                      <a-icon type="plus" />新建
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
            </div>
          </div>
          <a-table
            size="middle"
            :columns="columns"
            :loading="loading"
            rowKey="id"
            :dataSource="tableData"
            :pagination="false"
            align="center"
            v-margin:top="16"
          >
            <template slot="type" slot-scope="type, row">
              {{ row.type == 1 ? "周计划" : "月计划" }}
            </template>
            <template slot="range" slot-scope="range, row">
              {{ $moment(row.gmtBegin).format("YYYY-MM-DD") }} -
              {{ $moment(row.gmtEnd).format("YYYY-MM-DD") }}
            </template>
            <template slot="status" slot-scope="status, row">
              <a-badge status="default" text="未执行" v-if="row.status == 0" />
              <a-badge status="success" text="已执行" v-if="row.status == 1" />
            </template>
            <span slot="check" slot-scope="row">
              <a @click="onAddClick(row)">编辑</a>
              <a-divider type="vertical" />
              <a @click="onDeletePlan(row)">删除</a>
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
        </a-card>
      </a-col>
    </a-row>
    <plan-allocation
      :visible.sync="visible"
      :station-id="currentStation[0]"
      :station-type="currentType"
      :plan-detail="selectedPlan"
      @check="updateTable"
    />
  </div>
</template>

<script>
import planAllocation from "@/components/maintain/plan/plan-allocation";
export default {
  components: {
    planAllocation
  },
  data() {
    return {
      visible: false,
      tabList: [
        { tab: "未配置站点", key: 1 },
        { tab: "已配置站点", key: 2 }
      ],
      current: 1,
      total: 0,
      size: 10,
      loading: false,
      columns: [
        {
          title: "计划名称",
          dataIndex: "name"
        },
        {
          title: "方案周期",
          dataIndex: "type",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "运维期限",
          dataIndex: "range",
          scopedSlots: { customRender: "range" }
        },
        {
          title: "运维小组",
          dataIndex: "groupName"
        },
        {
          title: "计划状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "操作",
          key: "check",
          scopedSlots: { customRender: "check" }
        }
      ],
      tableData: [],
      currentTab: 1,
      currentType: 31,
      currentStation: [],
      stationList: [],
      selectedPlan: {},
      changedStation: ""
    };
  },
  watch: {
    currentType() {
      this.getPlanStation();
    },
    currentStation() {
      this.getTableData();
    }
  },
  methods: {
    updateTable(stationId) {
      if (this.currentTab == 1) {
        this.currentTab = 2;
        this.changedStation = stationId;
        this.getPlanStation();
      } else {
        this.changedStation = "";
        this.getTableData();
      }
    },
    getTableData() {
      this.tableData = [];
      let data = {
        page: this.current,
        size: this.size,
        pointId: this.currentStation[0]
      };
      if (this.currentStation.length > 0) {
        this.loading = true;
        this.$api.maintain
          .getPlan(data)
          .then(res => {
            if (res.data.state == 0) {
              this.loading = false;
              this.tableData = res.data.data.records;
              this.total = parseInt(res.data.data.total);
            } else {
              this.loading = false;
            }
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    onDeletePlan(row) {
      let that = this;

      that.$confirm({
        title: "删除计划",
        content: "确定删除计划" + row.name + "？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          let data = {
            id: row.id
          };

          that.$api.maintain.deletePlan(data).then(res => {
            if (res.data.state == 0) {
              that.$message.success("删除成功");
              that.getTableData();
            }
          });
        },
        onCancel() {}
      });
    },
    onAddClick(row) {
      if (row) {
        this.visible = true;
        this.selectedPlan = row;
      } else {
        if (this.currentStation.length > 0) {
          this.visible = true;
          this.selectedPlan = {};
        } else {
          this.$message.warning("请选择站点");
        }
      }
    },
    getPlanStation() {
      let data = {
        flag: this.currentTab,
        type: this.currentType
      };
      this.$api.maintain.getPlanStation(data).then(res => {
        this.stationList = res.data.data;
        this.currentStation = [];

        if (this.stationList.length > 0) {
          if (this.changedStation === "") {
            this.currentStation.push(this.stationList[0].id);
          } else {
            this.currentStation.push(this.changedStation);
          }
        }
      });
    }
  },
  mounted() {
    this.getPlanStation();
  }
};
</script>

<style lang="less" scoped></style>
