<template>
  <div>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item label="企业名称">
          <a-input placeholder="请输入" v-model="list.name"></a-input>
        </a-form-item>
        <a-form-item label="控制级别">
          <a-select
            placeholder="请选择"
            allowClear
            v-width="150"
            v-model="list.level"
          >
            <a-select-option
              v-for="item in controlOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="行业类别">
          <a-select
            placeholder="请选择"
            allowClear
            v-width="150"
            v-model="list.type"
          >
            <a-select-option
              v-for="item in typeList"
              :key="item.id"
              :value="item.id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit()">
            查询
          </a-button>
        </a-form-item>
        <a-form-item> </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" class="enterprise" v-margin:top="16">
      <div class="card-header">
        <div class="title">企业列表</div>
        <div class="extra">
          <a-button type="primary" @click="onEdit('add')">
            <a-icon type="plus" />新建
          </a-button>
        </div>
      </div>
      <a-table
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
        :loading="loading"
      >
        <span slot="action" slot-scope="row">
          <a @click="goPoint(row)">监控点管理</a>
          <a-divider type="vertical" />
          <a @click="goUser(row)">企业用户</a>
          <a-divider type="vertical" />
          <a @click="onEdit('edit', row)">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(row)">删除</a>
        </span>
      </a-table>

      <a-pagination
        size="small"
        v-margin:top="16"
        showSizeChanger
        :defaultCurrent="current"
        :pageSize.sync="pageSize"
        :total="total"
        :showTotal="total => `共 ${total} 条`"
        @change="pagechange"
        @showSizeChange="sizechange"
      />

      <!-- 新增企业 -->
      <add-enterprise
        :controlOptions="controlOptions"
        :typeList="typeList"
        v-model="obj"
        @refresh="getTableData"
      />
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
           width: 100,
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
          dataIndex: "controlLevel",
          key: "controlLevel",
          align: "center",
          customRender: text => {
            if (text == "1") {
              return "国控";
            } else if (text == "2") {
              return "省控";
            } else if (text == "3") {
              return "市控";
            } else if (text == "4") {
              return "县控";
            }
          }
        },
        {
          title: "企业地址",
          dataIndex: "address",
          key: "address",
          align: "center"
        },
        {
          title: "环保负责人",
          dataIndex: "environmentPrincipal",
          key: "environmentPrincipal",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 300,
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
    this.getIndustrySelect();
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
      this.loading = true;
      this.$api.customer
        .getEnterPriseList(data)
        .then(res => {
          if (res.data.state == 0) {
            this.loading = false;
            this.tableData = res.data.data.records;
            this.total = Number(res.data.data.total);
          }
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    },
    //行业类型下拉
    getIndustrySelect() {
      this.$api.common.selectIndustry().then(res => {
        this.typeList = res.data.data;
      });
    },
    onDelete(row) {
      let that = this;
      this.$confirm({
        title: "删除",
        content: "是否删除",
        onOk() {
          that.$api.customer
            .delEnterPrise({
              id: row.id
            })
            .then(res => {
              if (res.data.state == 0) {
                this.$message.success("删除成功");
                this.getTableData();
              }
            });
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
    onEdit(type, row) {
      this.obj.show = true;
      this.obj.type = type;
      this.obj.row = row;
    }
  }
};
</script>
