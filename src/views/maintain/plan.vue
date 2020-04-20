<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="7">
        <a-card :bordered="false" :tabList="tabList">
          <a-radio-group defaultValue="a" buttonStyle="solid">
            <a-radio-button value="a">水类站点</a-radio-button>
            <a-radio-button value="b">气类站点</a-radio-button>
            <a-radio-button value="c">其他站点</a-radio-button>
          </a-radio-group>
          <a-list>
            <a-list-item slot="renderItem">
              XX污水处理厂废水排口
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="17">
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
    <plan-allocation :visible.sync="visible" :planDetail="planDetail" />
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
          title: "计划名称",
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
      planDetail: ""
    };
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
    }
  },
  mounted() {
    // this.getTableData();
  }
};
</script>

<style lang="less" scoped></style>
