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
          >
            <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.tab">
              <a-radio-group
                :defaultValue="31"
                buttonStyle="solid"
                v-model="currentType"
              >
                <a-radio-button :value="31">水类站点</a-radio-button>
                <a-radio-button :value="32">气类站点</a-radio-button>
                <a-radio-button :value="0">其他站点</a-radio-button>
              </a-radio-group>
              <a-menu
                v-model="currentStation"
                mode="vertical"
                @click="selectStation"
              >
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
            <div class="title">站点运维方案</div>
            <div class="extra">
              <div class="extra">
                <a-form layout="inline">
                  <a-form-item>
                    <a-button type="primary" @click="onAddClick">
                      <a-icon type="plus" />新建
                    </a-button>
                  </a-form-item>
                  <!-- <a-form-item>
              <a-input-search
                placeholder="请输入运维方案"
                style="width: 200px"
                v-model="formInline.name"
                @search="onSubmit"
              />
            </a-form-item> -->
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
            <a slot="check" slot-scope="row">
              <a @click="onAddClick(row)">编辑</a>
              <a-divider type="vertical" />
              <a @click="goDetail(row)">删除</a>
            </a>
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
    />
  </div>
</template>

<script>
import planAllocation from "@/components/organization/plan/plan-allocation";
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
          dataIndex: "number"
        },
        {
          title: "方案周期",
          dataIndex: "number"
        },
        {
          title: "运维期限",
          dataIndex: "number"
        },
        {
          title: "运维小组",
          dataIndex: "number"
        },
        {
          title: "计划状态",
          dataIndex: "number"
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
      selectedStationDetail: {},
      stationList: []
    };
  },
  watch: {
    currentTab() {
      this.getPlanStation();
    },
    currentType() {
      this.getPlanStation();
    }
  },
  methods: {
    getTableData() {
      this.loading = true;
      let params = {
        size: this.size,
        page: this.current
      };
      this.$api.car
        .manageVehicleUse(params)
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
    goDetail(row) {
      console.log(row);
    },
    onAddClick() {
      this.visible = true;
    },
    getPlanStation() {
      let data = {
        flag: this.currentTab,
        type: this.currentType
      };
      this.$api.maintain.getPlanStation(data).then(res => {
        this.stationList = res.data.data;
        if (this.stationList.length > 0) {
          this.currentStation.push(this.stationList[0].id);
        } else {
          this.currentStation = [];
        }
      });
    },
    selectStation(object) {
      this.selectedStationDetail = object.item;
      console.log(object);
    }
  },
  mounted() {
    this.getPlanStation();
  }
};
</script>

<style lang="less" scoped></style>
