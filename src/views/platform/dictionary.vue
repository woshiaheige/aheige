<template>
  <div class="platform">
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item>
          <a-input placeholder="字典名称" v-model="formInline.name"></a-input>
        </a-form-item>
        <a-form-item>
          <a-input placeholder="字典编号" v-model="formInline.code"></a-input>
        </a-form-item>
        <a-form-item style="float: right">
          <a-button type="primary" @click="onSubmit">
            查询
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" v-margin:top="16">
      <div class="card-header">
        <div class="title">数据字典</div>
        <div class="extra">
          <a-button type="success" @click="visible = true">
            <a-icon type="plus" />新建
          </a-button>
        </div>
      </div>
      <a-table
        size="middle"
        rowKey="id"
        :columns="columns"
        :loading="loading"
        :dataSource="tableData"
        :pagination="false"
        v-margin:top="16"
      >
        <span slot="action" slot-scope="row">
          <a @click="onEdit(row)">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(row)">删除</a>
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
      <dictionary-edit
        :visible.sync="visible"
        @updateTable="getTableData"
        :dictionaryDetail="dictionaryDetail"
      ></dictionary-edit>
    </a-card>
  </div>
</template>
<script>
import dictionaryEdit from "@/components/platform/dictionary/dictionary-edit";
export default {
  components: { dictionaryEdit },
  data() {
    return {
      current: 1,
      total: 0,
      pagesize: 10,
      loading: false,
      dictionaryDetail: "",
      formInline: {
        name: "",
        code: ""
      },
      columns: [
        {
          title: "序号",
          customRender: (text, row, index) => {
            return (
              <span>{index + (this.current - 1) * this.pagesize + 1}</span>
            );
          },
          width: 100,
          align: "center"
        },
        {
          title: "字典名称",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "字典编码",
          dataIndex: "code",
          align: "center"
        },
        {
          title: "字典值",
          dataIndex: "value",
          align: "center"
        },
        {
          title: "字典说明",
          dataIndex: "remark",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
          width: 200
        }
      ],
      tableData: [],
      visible: false
    };
  },
  methods: {
    getTableData() {
      let params = {
        pagesize: this.pagesize,
        page: this.current,
        name: this.formInline.name,
        code: this.formInline.code
      };
      this.loading = true;
      this.$api.common
        .sysDict(params)
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
    onEdit(row) {
      this.$api.common.getSysDictById({ id: row.id }).then(res => {
        if (res.data.state == 0) {
          this.dictionaryDetail = res.data.data;
          this.visible = true;
        }
      });
    },
    onDelete(row) {
      console.log(row);
      let _this = this;
      this.$confirm({
        title: "删除",
        content: `是否删除字典 ${row.name}`,
        onOk() {
          console.log("OK");
          _this.$api.common.deleteSysDict({ id: row.id }).then(res => {
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
    onLock(row) {
      console.log(row);
      this.$confirm({
        title: "锁定",
        content: `是否锁定用户${row.name}`,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  },
  mounted() {
    this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
