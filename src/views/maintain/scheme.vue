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
            defaultValue="31"
            buttonStyle="solid"
            @change="changeType"
          >
            <a-radio-button value="31">气类运维</a-radio-button>
            <a-radio-button value="32">水类运维</a-radio-button>
            <a-radio-button value="0">其他运维</a-radio-button>
          </a-radio-group>
          <a-button type="dashed" block v-margin:top="16" @click="addNewScheme"
            >新建方案</a-button
          >
          <a-menu
            v-model="currentScheme"
            mode="vertical"
            :defaultSelectedKeys="[gasSchemeList[0].id]"
            v-if="type == '31'"
          >
            <a-menu-item v-for="item in gasSchemeList" :key="item.id">
              {{ item.name }}
            </a-menu-item>
          </a-menu>
          <a-menu
            v-model="currentScheme"
            mode="vertical"
            :defaultSelectedKeys="[waterSchemeList[0].id]"
            v-if="type == '32'"
          >
            <a-menu-item v-for="item in waterSchemeList" :key="item.id">
              {{ item.name }}
            </a-menu-item>
          </a-menu>
          <a-menu
            v-model="currentScheme"
            mode="vertical"
            :defaultSelectedKeys="[otherSchemeList[0].id]"
            v-if="type == '0'"
          >
            <a-menu-item v-for="item in otherSchemeList" :key="item.id">
              {{ item.name }}
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
            <a slot="check">
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
      @close="addSchemeModal = false"
    ></add-scheme>

    <add-scheme-list
      :visible="addSchemeListModal"
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
      currentScheme: ["type1"],
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
      type: "a",
      waterSchemeList: [],
      gasSchemeList: [],
      otherSchemeList: []
    };
  },
  mounted() {
    this.getScheme();
  },
  methods: {
    addNewScheme() {
      this.addSchemeModal = true;
    },
    addSchemeList() {
      this.addSchemeListModal = true;
    },
    changeType(e) {
      this.type = e.target.value;
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
      });
    }
  }
};
</script>
