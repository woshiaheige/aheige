<template>
  <a-card :bordered="false" class="maintain">
    <div class="card-header">
      <div class="title">投诉列表</div>
      <div class="extra">
        <a-form layout="inline">
          <a-form-item>
            <a-radio-group defaultValue="a" buttonStyle="solid">
              <a-radio-button value="a">全部</a-radio-button>
              <a-radio-button value="b">未处理</a-radio-button>
              <a-radio-button value="c">已处理</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item>
            <a-input-search
              placeholder="请输入企业名称"
              style="width: 200px"
              @search="onSubmit"
            />
          </a-form-item>
        </a-form>
      </div>
    </div>
    <a-table
      size="middle"
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      v-margin:top="16"
    >
      <span slot="action" slot-scope="row">
        <a @click="onEdit(row)">查看</a>
        <a-divider type="vertical" />
        <a @click="onDelete(row)">删除</a>
      </span>
    </a-table>
    <a-pagination
      size="small"
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <add-edit :obj="obj" @cancel="cancel"></add-edit>
  </a-card>
</template>
<script>
import addEdit from "@/components/maintain/complaint/add-edit";
export default {
  components: { addEdit },
  data() {
    return {
      current: 1,
      total: 0,
      columns: [
        {
          title: "企业名称",
          dataIndex: "userName"
        },
        {
          title: "状态",
          dataIndex: "status1"
        },
        {
          title: "上报时间",
          dataIndex: "time1"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [],
      obj: {
        show: false
      }
    };
  },
  methods: {
    getTableData() {
      this.$api.maintain.getMissionList().then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    onEdit(row) {
      console.log(row);
      this.obj.show = true;
      this.obj.row = row;
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
    cancel(value) {
      this.obj.show = value;
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
