<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card :bordered="false">
          <div class="card-header">
            <div class="title">配置站点</div>
            <div class="extra">
              <div class="extra">
                <span>站点数：{{ stationList.length }}</span>
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
              <a-input-search
                placeholder="请输入站点名称"
                style="width: 100%"
                v-margin:top="16"
                @search="getPlanStation"
              />
              <a-menu
                v-model="currentStation"
                mode="vertical"
                v-margin:top="16"
              >
                <a-menu-item v-for="item in stationList" :key="item.id">
                  {{ item.name }}
                </a-menu-item>
                <a-spin
                  :spinning="spinning"
                  style="margin-top: 50%; margin-left: 50%; transform: translateY(-50%)"
                />
                <a-empty
                  v-margin:top="16"
                  v-if="stationList.length <= 0 && spinning == false"
                />
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
                      <a-icon type="plus" />新建计划
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
            <template slot="planDay" slot-scope="planDay, row">
              <span v-if="row.type == 1">
                <span v-if="row.planDay == 0">星期日</span>
                <span v-if="row.planDay == 1">星期一</span>
                <span v-if="row.planDay == 2">星期二</span>
                <span v-if="row.planDay == 3">星期三</span>
                <span v-if="row.planDay == 4">星期四</span>
                <span v-if="row.planDay == 5">星期五</span>
                <span v-if="row.planDay == 6">星期六</span>
              </span>
              <span v-if="row.type == 2">
                <span>{{ row.planDay }}号</span>
              </span>
            </template>
            <template slot="range" slot-scope="range, row">
              {{ $moment(row.gmtBegin).format("YYYY-MM-DD") }} -
              {{ $moment(row.gmtEnd).format("YYYY-MM-DD") }}
            </template>
            <template slot="status" slot-scope="status, row">
              <a-badge status="default" text="未执行" v-if="row.status == 1" />
              <a-badge status="success" text="执行中" v-if="row.status == 2" />
              <a-badge status="warning" text="已延期" v-if="row.status == 3" />
            </template>
            <span slot="check" slot-scope="row">
              <a @click="onEditPlan(row)">编辑</a>
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

    <edit-plan
      :visible="editModal"
      :plan-detail="selectedPlan"
      @close="editModal = false"
    ></edit-plan>
  </div>
</template>

<script>
import planAllocation from "@/components/maintain/plan/plan-allocation";
import editPlan from "@/components/maintain/plan/edit-plan";
export default {
  components: {
    planAllocation,
    editPlan
  },
  data() {
    return {
      visible: false,
      editModal: false,
      spinning: false,
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
          title: "方案名称",
          dataIndex: "programmeName"
        },
        {
          title: "方案周期",
          dataIndex: "type",
          scopedSlots: { customRender: "type" }
        },
        {
          title: "执行日期",
          dataIndex: "planDay",
          scopedSlots: { customRender: "planDay" }
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
    },
    editModal(newVal) {
      if (!newVal) {
        this.getTableData();
      }
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
        content: "确定删除计划方案" + row.programmeName + "？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          let data = {
            programmeId: row.programmeId
          };

          that.$api.maintain.deletePlan(data).then(async res => {
            if (res.data.state == 0) {
              that.$message.success("删除成功");
              await that.getPlanStation();
              that.getTableData();
            }
          });
        },
        onCancel() {}
      });
    },
    onAddClick() {
      if (this.currentStation.length > 0) {
        this.visible = true;
        this.selectedPlan = {};
      } else {
        this.$message.warning("请选择站点");
      }
    },
    async getPlanStation() {
      this.spinning = true;
      let data = {
        flag: this.currentTab,
        type: this.currentType
      };
      await this.$api.maintain.getPlanStation(data).then(res => {
        this.stationList = res.data.data;
        this.currentStation = [];
        this.spinning = false;

        if (this.stationList.length > 0) {
          if (this.changedStation === "") {
            this.currentStation.push(this.stationList[0].id);
          } else {
            this.currentStation.push(this.changedStation);
          }
        }
      });
    },
    onEditPlan(row) {
      this.editModal = true;
      this.selectedPlan = row;
    }
  },
  mounted() {
    this.getPlanStation();
  }
};
</script>

<style lang="less" scoped></style>
