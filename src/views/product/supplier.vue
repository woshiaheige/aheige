<template>
  <div>
    <a-card v-margin:bottom="28">
      <a-form-model layout="inline" @submit="onSubmit" @submit.native.prevent>
        <a-form-model-item label="供应商名称">
          <a-input placeholder="请输入" v-model="formInline.name"></a-input>
        </a-form-model-item>
        <a-form-model-item label="联系人名称">
          <a-input placeholder="请输入" v-model="formInline.contact"></a-input>
        </a-form-model-item>
        <a-form-model-item style="float:right">
          <a-button type="primary" html-type="submit">
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card :bordered="false" class="standing">
      <div class="card-header">
        <div class="title">企业列表</div>
        <div class="extra">
          <a-button type="primary" @click="onEdit()">
            <a-icon type="plus" />新增
          </a-button>
        </div>
      </div>
      <a-table
        :loading="loading"
        size="middle"
        :rowKey="(record, index) => index"
        :columns="columns"
        :dataSource="tableData"
        v-margin:top="16"
        :pagination="false"
        bordered
      >
        <span slot="action" slot-scope="row">
          <a @click="onEdit(row)">编辑</a>
          <a-divider type="vertical" />
          <a @click="onDelete(row)">删除</a>
        </span>
      </a-table>
      <a-pagination
        size="small"
        :showTotal="total => `共 ${total} 条`"
        v-margin:top="16"
        showSizeChanger
        :pageSize.sync="pagesize"
        :defaultCurrent="current"
        @change="pagechange"
        @showSizeChange="sizechange"
        :total="total"
      />
      <!-- 新增供应商 -->
      <add-edit :obj="modalInfo" @cancel="cancel" @getTableData="getTableData">
      </add-edit>
    </a-card>
  </div>
</template>

<script>
import addEdit from "@/components/customer/supplier/add-edit";
export default {
  components: { addEdit },
  data() {
    return {
      pagesize: 10,
      current: 1,
      total: 0,
      loading: false,
      formInline: {
        contact: "",
        name: ""
      },
      modalInfo: { show: false },
      columns: [
        {
          align: "center",
          title: "序号",
          width: 100,
          customRender: (_, __, index) => {
            return (
              <span>{index + (this.current - 1) * this.pagesize + 1}</span>
            );
          }
        },
        {
          title: "供应商名称",
          dataIndex: "name",
          align: "center"
        },
        {
          title: "地址",
          dataIndex: "fullAddress",
          align: "center"
        },
        {
          title: "联系人",
          dataIndex: "contact",
          align: "center"
        },
        {
          title: "联系电话",
          dataIndex: "telephone",
          align: "center"
        },
        {
          title: "评级",
          dataIndex: "level",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: []
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.loading = false;
      let data = {
        page: this.current,
        size: this.pagesize,
        contact: this.formInline.contact,
        name: this.formInline.name
      };
      this.$api.product
        .getSupplierList(data)
        .then(res => {
          if (res.data.state == 0) {
            this.tableData = res.data.data.records || [];
            this.total = Number(res.data.data.total);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
    },
    onEdit(row) {
      this.modalInfo.show = true;
      this.modalInfo.row = row;
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
      this.modalInfo.show = value;
    }
  }
};
</script>
