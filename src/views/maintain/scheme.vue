<template>
  <div>
    <a-card :bordered="false">
      <div class="card-header">
        <div class="title">方案设置</div>
        <div class="extra">
          <a-button type="primary" icon="plus">新建项目</a-button>
        </div>
      </div>
      <a-row :gutter="16">
        <a-col :span="6">
          <a-radio-group defaultValue="a" buttonStyle="solid">
            <a-radio-button value="a">水类运维</a-radio-button>
            <a-radio-button value="b">气类运维</a-radio-button>
            <a-radio-button value="c">其他运维</a-radio-button>
          </a-radio-group>
          <a-button type="dashed" block v-margin:top="16">新建方案</a-button>
          <a-menu
            v-model="current"
            mode="vertical"
            :defaultSelectedKeys="['type1']"
          >
            <a-menu-item key="type1">
              巡检（周计划）
            </a-menu-item>
            <a-menu-item key="type2">
              质控（周计划）
            </a-menu-item>
            <a-menu-item key="type3">
              比对（周计划）
            </a-menu-item>
            <a-menu-item key="type4">
              校准（周计划）
            </a-menu-item>
            <a-menu-item key="type5">
              标定（月计划）
            </a-menu-item>
            <a-menu-item key="type6">
              标气更换（月计划）
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
  </div>
</template>

<script>
export default {
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
      ]
    };
  }
};
</script>
