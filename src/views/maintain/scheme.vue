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
            @change="changeType"
          >
            <a-radio-button :value="31">气类运维</a-radio-button>
            <a-radio-button :value="32">水类运维</a-radio-button>
            <a-radio-button :value="0">其他运维</a-radio-button>
          </a-radio-group>
          <a-button type="dashed" block v-margin:top="16" @click="addNewScheme"
            >新建方案</a-button
          >
          <a-menu v-model="currentScheme" mode="vertical" v-if="type == 31">
            <a-menu-item v-for="item in gasSchemeList" :key="item.id">
              {{ item.name }}
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
          </a-menu>
          <a-menu v-model="currentScheme" mode="vertical" v-if="type == 32">
            <a-menu-item v-for="item in waterSchemeList" :key="item.id">
              {{ item.name }}
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
          </a-menu>
          <a-menu v-model="currentScheme" mode="vertical" v-if="type == 0">
            <a-menu-item v-for="item in otherSchemeList" :key="item.id">
              {{ item.name }}
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
          </a-menu>
        </a-col>
        <a-col :span="18">
          <a-table
            size="middle"
            :columns="columns"
            :dataSource="tableData"
            :pagination="false"
            :loading="loading"
          >
            <a slot="action">
              <a @click="detailShow = true">编辑</a>
              <a-divider type="vertical" />
              <a>删除</a>
            </a>
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
      :maintain-type="type"
      @close="addSchemeModal = false"
    ></add-scheme>

    <add-scheme-list
      :visible="addSchemeListModal"
      :scheme-id="currentScheme[0]"
      :scheme-list-detail="selectedScheme"
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
      waterSchemeList: [],
      gasSchemeList: [],
      otherSchemeList: [],
      menu: [],
      current: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      tableData: [],
      selectedScheme: {}
    };
  },
  mounted() {
    this.getScheme();
  },
  watch: {
    addSchemeModal(newVal) {
      if (!newVal) {
        this.reset();
        this.getScheme();
      }
    },
    currentScheme() {
      this.getTableData();
    }
  },
  methods: {
    addNewScheme() {
      this.addSchemeModal = true;
    },
    addSchemeList() {
      this.addSchemeListModal = true;
    },
    onEditScheme(item) {
      this.addSchemeModal = true;
      this.selectedScheme = item;
    },
    changeType(e) {
      this.type = e.target.value;
      this.currentScheme = [];
      if (e.target.value == 31) {
        this.currentScheme.push(this.gasSchemeList[0].id);
      } else if (e.target.value == 32) {
        this.currentScheme.push(this.waterSchemeList[0].id);
      } else if (e.target.value == 0) {
        this.currentScheme.push(this.otherSchemeList[0].id);
      }
    },
    reset() {
      this.waterSchemeList = [];
      this.gasSchemeList = [];
      this.otherSchemeList = [];
    },
    getScheme() {
      this.$api.maintain.getScheme().then(res => {
        res.data.data.forEach(item => {
          switch (item.maintainType) {
            case 31:
              this.gasSchemeList.push(item);
              break;
            case 32:
              this.waterSchemeList.push(item);
              break;
            case 0:
              this.otherSchemeList.push(item);
          }
        });

        this.currentScheme = [];
        if (this.type == 31) {
          this.currentScheme.push(this.gasSchemeList[0].id);
        } else if (this.type == 32) {
          this.currentScheme.push(this.waterSchemeList[0].id);
        } else if (this.type == 0) {
          this.currentScheme.push(this.otherSchemeList[0].id);
        }
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
              that.reset();
              that.getScheme();
            }
          });
        },
        onCancel() {}
      });
    },
    getTableData() {
      let data = {
        page: this.current,
        size: this.pageSize,
        programmeId: this.currentScheme[0]
      };

      this.$api.maintain.getSchemeList(data).then(res => {
        if (res.data.state == 0) {
          this.tableData = res.data.data.records;
        }
      });
    }
  }
};
</script>
