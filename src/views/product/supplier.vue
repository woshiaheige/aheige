<template>
  <a-form-model-item>
    <a-card :bordered="false" class="standing">
      <div class="card-header">
        <div class="title">供应商列表</div>
        <div class="extra">
          <a-form layout="inline" :model="formInline">
            <a-form-item>
              <a-button type="primary" @click="onEdit()">
                <a-icon type="plus" />新建
              </a-button>
            </a-form-item>
            <a-form-item>
              <a-input-search
                placeholder="输入供应商名称"
                style="width: 200px"
                v-model="formInline.name"
                @search="onSubmit"
              />
            </a-form-item>
          </a-form>
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
      >
        <template slot="star" slot-scope="level">
          <a-rate :value="level" disabled />
        </template>
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
      <!-- 新建供应商 -->
      <add-edit :obj="modalInfo" @cancel="cancel" @getTableData="getTableData">
      </add-edit>
    </a-card>
  </a-form-model-item>
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
          title: "供应商名称",
          dataIndex: "name"
        },
        {
          title: "地址",
          dataIndex: "fullAddress"
        },
        {
          title: "联系人",
          dataIndex: "contact"
        },
        {
          title: "联系电话",
          dataIndex: "telephone"
        },
        {
          title: "评级",
          dataIndex: "level",
          scopedSlots: { customRender: "star" }
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
