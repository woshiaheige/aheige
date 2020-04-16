<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item>
          <a-input placeholder="企业名称" v-model="list.name"></a-input>
        </a-form-item>
        <a-form-item>
          <a-select placeholder="控制级别" v-width="150" v-model="list.level">
            <a-select-option
              v-for="item in controlOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-select placeholder="行业类别" v-width="150" v-model="list.type">
            <a-select-option
              v-for="item in typeList"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSubmit()">
            查询
          </a-button>
        </a-form-item>
        <a-form-item> </a-form-item>
      </a-form>
    </a-card>
    <a-card
      :bordered="false"
      class="enterprise"
      title="企业信息"
      v-margin:top="16"
    >
      <a-button type="success" @click="onEdit()" slot="extra">
        新增
      </a-button>
      <a-table
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
        :loading="loading"
        bordered
      >
        <span slot="action" slot-scope="row">
          <a @click="goPoint(row)">监控点管理</a>
          <a-divider type="vertical" />
          <a @click="goUser(row)">企业用户</a>
          <a-divider type="vertical" />
          <a @click="onEdit(row)">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(row)">删除</a>
        </span>
      </a-table>

      <a-pagination
        v-margin:top="16"
        showSizeChanger
        :defaultCurrent="current"
        :pageSize.sync="pageSize"
        :total="total"
        @change="pagechange"
        @showSizeChange="sizechange"
      />

      <!-- 新增企业 -->
      <add-enterprise :obj="obj" @cancel="cancel" />
      <!-- 新增企业end -->
    </a-card>
  </div>
</template>

<script>
import addEnterprise from "@/components/customer/enterprise/add-enterprise";
export default {
  components: {
    addEnterprise
  },
  data() {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      controlOptions: [
        { name: "国控", value: 1 },
        { name: "省控", value: 2 },
        { name: "市控", value: 3 },
        { name: "县控", value: 4 }
      ],
      obj: {
        show: false
      },
      columns: [
        {
          title: "序号",
          align: "center",
          customRender: (text, row, index) => `${index + 1}`
        },
        {
          title: "企业名称",
          dataIndex: "name",
          key: "name",
          align: "center"
        },
        {
          title: "控制级别",
          dataIndex: "stationNum",
          key: "stationNum",
          align: "center"
        },
        {
          title: "企业地址",
          dataIndex: "address",
          key: "address",
          align: "center"
        },
        {
          title: "环保负责人",
          dataIndex: "contact",
          key: "contact",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ],
      tableData: [],
      list: {
        name: ""
      },
      typeList: []
    };
  },
  mounted() {
    this.getTableData();
    this.getEnterPriseSelect();
  },
  methods: {
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        enterpriseName: this.list.name,
        controlLevel: this.list.level,
        industryId: this.list.type
      };
      this.$api.customer.getEnterPriseList(data).then(res => {
        if (res.data.state == 0) {
          this.tableData = res.data.data.records;
          this.total = Number(res.data.data.total);
        }
      });
    },
    //行业类型下拉
    getIndustrySelect() {
      this.$api.common.selectIndustry().then(res => {
        this.typeList = res.data.data;
      });
    },
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
    goUser(row) {
      console.log(row);
      this.$router.push({
        path: "/customer/enterprise/user",
        query: { id: row.id }
      });
    },
    goPoint(row) {
      console.log(row);
      this.$router.push({
        path: "/customer/enterprise/station",
        query: { id: row.id }
      });
    },
    onEdit(row) {
      this.obj.show = true;
      this.obj.row = row;
    },
    cancel(value) {
      this.obj.show = value;
      this.getTableData();
    }
  }
};
</script>
