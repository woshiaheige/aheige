<template>
  <a-card :bordered="false" class="enterprise">
    <span slot="title">
      <a-button type="primary">添加运维企业客户</a-button>
    </span>

    <a-table
      :columns="columns"
      :dataSource="data"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="stations" slot-scope="stations">
        <a-select placeholder="选择站点" v-width="150">
          <a-select-option
            :value="station"
            v-for="{ station, key } of stations"
            :key="key"
          >
            {{ station }}
          </a-select-option>
        </a-select>
      </span>
      <span slot="action">
        <a @click="show = true">编辑</a>
        <a-divider type="vertical" />
        <a>删除</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="3"
      :total="500"
    />

    <modal :visible="show"> </modal>
  </a-card>
</template>

<script>
import modal from "@/components/common/modal";
export default {
  components: { modal },
  data() {
    return {
      show: false,
      columns: [
        {
          title: "序号",
          dataIndex: "num",
          key: "num"
        },
        {
          title: "企业名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "行政区域",
          dataIndex: "address",
          key: "address"
        },
        {
          title: "站点数量",
          dataIndex: "stationNum",
          key: "stationNum"
        },
        {
          title: "站点",
          key: "stations",
          dataIndex: "stations",
          scopedSlots: { customRender: "stations" }
        },
        {
          title: "运维小组",
          dataIndex: "group",
          key: "group"
        },
        {
          title: "负责人",
          dataIndex: "principal",
          key: "principal"
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      data: [
        {
          key: "1",
          num: "1",
          name: "腾讯",
          address: "深圳",
          stationNum: "2",
          stations: ["A", "B"],
          group: "小组1",
          principal: "麻花腾"
        }
      ]
    };
  }
};
</script>
