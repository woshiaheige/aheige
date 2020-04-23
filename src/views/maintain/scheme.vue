<template>
  <div>
    <a-card :bordered="false">
      <div class="card-header">
        <div class="title">方案设置</div>
        <div class="extra">
          <a-button type="primary" icon="plus" @click="addSchemeList"
            >新建项目</a-button
          >
        </div>
      </div>
      <a-row :gutter="16">
        <a-col :span="6">
          <a-radio-group
            :defaultValue="31"
            buttonStyle="solid"
            v-model="currentType"
          >
            <a-radio-button :value="31">气类运维</a-radio-button>
            <a-radio-button :value="32">水类运维</a-radio-button>
            <a-radio-button :value="0">其他运维</a-radio-button>
          </a-radio-group>
          <a-button type="dashed" block v-margin:top="16" @click="addNewScheme"
            >新建方案</a-button
          >
          <a-menu v-model="currentScheme" mode="vertical">
            <a-menu-item v-for="item in schemeList" :key="item.id">
              {{ item.name }}({{ item.type == 1 ? "周计划" : "月计划" }})
              <a-divider type="vertical" v-show="currentScheme == item.id" />
              <a-icon
                type="edit"
                v-show="currentScheme == item.id"
                @click="onEditScheme(item)"
              />
              <a-icon
                type="delete"
                v-show="currentScheme == item.id"
                @click="onDeleteScheme(item)"
              />
            </a-menu-item>
            <a-empty v-margin:top="16" v-if="schemeList.length <= 0" />
          </a-menu>
        </a-col>
        <a-col :span="18">
          <a-table
            size="middle"
            rowKey="id"
            :columns="columns"
            :dataSource="tableData"
            :pagination="false"
            :loading="loading"
          >
            <span slot="action" slot-scope="row">
              <a @click="onEditSchemeList(row)">编辑</a>
              <a-divider type="vertical" />
              <a @click="onDeleteSchemeList(row)">删除</a>
            </span>
          </a-table>
          <a-pagination
            size="small"
            v-margin:top="16"
            showQuickJumper
            showSizeChanger
            :defaultCurrent="current"
            :defaultPageSize="pageSize"
            :total="total"
          />
        </a-col>
      </a-row>
    </a-card>

    <add-scheme
      :visible="addSchemeModal"
      :scheme-detail="selectedScheme"
      :maintain-type="currentType"
      @close="addSchemeModal = false"
    ></add-scheme>

    <add-scheme-list
      :visible="addSchemeListModal"
      :scheme-id="currentScheme[0]"
      :scheme-list-detail="selectedSchemeList"
      @close="addSchemeListModal = false"
    ></add-scheme-list>
  </div>
</template>

<script>
import addScheme from "@/components/maintain/scheme/add-scheme.vue";
import addSchemeList from "@/components/maintain/scheme/add-scheme-list.vue";
export default {
  components: {
    addScheme,
    addSchemeList
  },
  data() {
    return {
      currentScheme: [],
      columns: [
        {
          title: "运维项目",
          dataIndex: "name"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      addSchemeModal: false,
      addSchemeListModal: false,
      type: 31,
      schemeList: [],
      menu: [],
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      tableData: [],
      selectedScheme: {},
      selectedSchemeList: {},
      currentType: 31
    };
  },
  mounted() {
    this.getScheme();
  },
  watch: {
    addSchemeModal(newVal) {
      if (!newVal) {
        this.selectedScheme = {};
        this.getScheme();
      }
    },
    addSchemeListModal(newVal) {
      if (!newVal) {
        this.selectedSchemeList = {};
        this.getTableData();
      }
    },
    currentScheme(newVal) {
      this.tableData = [];
      if (newVal.length > 0) {
        this.getTableData();
      }
    },
    currentType() {
      this.getScheme();
    }
  },
  methods: {
    addNewScheme() {
      this.addSchemeModal = true;
    },
    addSchemeList() {
      if (this.currentScheme.length > 0) {
        this.addSchemeListModal = true;
      } else {
        this.$message.warning("请选择方案");
      }
    },
    onEditScheme(item) {
      this.addSchemeModal = true;
      this.selectedScheme = item;
    },
    getScheme() {
      let data = {
        type: this.currentType
      };
      this.$api.maintain.getScheme(data).then(res => {
        this.schemeList = res.data.data;
        this.currentScheme = [];
        if (this.schemeList.length > 0) {
          this.currentScheme.push(this.schemeList[0].id);
        }
        console.log(this.currentScheme);
      });
    },
    onDeleteScheme(item) {
      let that = this;
      this.$confirm({
        title: "删除方案",
        content: "确定删除方案" + item.name + "？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          let data = {
            id: item.id
          };

          that.$api.maintain.deleteScheme(data).then(res => {
            if (res.data.state == 0) {
              that.$message.success("删除成功");
              that.getScheme();
            }
          });
        },
        onCancel() {}
      });
    },
    onDeleteSchemeList(row) {
      let that = this;
      console.log(row);
      this.$confirm({
        title: "删除方案项",
        content: "确定删除方案项" + row.name + "？",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          let data = {
            id: row.id
          };

          that.$api.maintain.deleteSchemeList(data).then(res => {
            if (res.data.state == 0) {
              that.$message.success("删除成功");
              that.getTableData();
            }
          });
        },
        onCancel() {}
      });
    },
    onEditSchemeList(row) {
      this.addSchemeListModal = true;
      this.selectedSchemeList = row;
    },
    getTableData() {
      this.loading = true;
      let data = {
        page: this.current,
        size: this.pageSize,
        programmeId: this.currentScheme[0]
      };

      this.$api.maintain
        .getSchemeList(data)
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
  }
};
</script>
