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
            defaultValue="a"
            buttonStyle="solid"
            @change="changeType"
          >
            <a-radio-button value="a">水类运维</a-radio-button>
            <a-radio-button value="b">气类运维</a-radio-button>
            <a-radio-button value="c">其他运维</a-radio-button>
          </a-radio-group>
          <a-button type="dashed" block v-margin:top="16" @click="addNewScheme"
            >新建方案</a-button
          >
          <a-menu
            v-model="current"
            mode="vertical"
            :defaultSelectedKeys="['type1']"
            v-if="type == 'a'"
          >
            <a-menu-item key="type1">
              日检查维护
            </a-menu-item>
            <a-menu-item key="type2">
              周检查维护
            </a-menu-item>
            <a-menu-item key="type3">
              月检查维护
            </a-menu-item>
            <a-menu-item key="type4">
              季检查维护
            </a-menu-item>
            <a-menu-item key="type5">
              定期校验
            </a-menu-item>
            <a-menu-item key="type6">
              比对监测
            </a-menu-item>
          </a-menu>
          <a-menu
            v-model="current"
            mode="vertical"
            :defaultSelectedKeys="['type1']"
            v-if="type == 'b'"
          >
            <a-menu-item key="type1">
              日常巡检
            </a-menu-item>
            <a-menu-item key="type2">
              日常维护
            </a-menu-item>
            <a-menu-item key="type3">
              定期校准
            </a-menu-item>
            <a-menu-item key="type4">
              定期维护
            </a-menu-item>
            <a-menu-item key="type5">
              定期校验
            </a-menu-item>
            <a-menu-item key="type6">
              比对监测
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
      current: ["type1"],
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
      type: "a"
    };
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
    }
  }
};
</script>
