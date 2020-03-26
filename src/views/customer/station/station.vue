<template>
  <a-card :bordered="false" class="station">
    <a-form layout="inline">
      <a-form-item>
        <a-select placeholder="选择客户企业" v-width="150" v-model="searchOpt.enterprise">
          <a-select-option :value="item" v-for="(item,index) of enterprise" :key="index">
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-select placeholder="选择运维小组" v-width="150" v-model="searchOpt.group">
          <a-select-option :value="item" v-for="(item,index) of group" :key="index">
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-input placeholder="站点名称、编号" v-model="searchOpt.station"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查找
        </a-button>
        <a-button type="primary" v-margin:left="10" @click="toDetail">
          新增
        </a-button>
      </a-form-item>
    </a-form>

    <a-table
      :columns="columns"
      :dataSource="data"
      v-margin:top="16"
      :pagination="false"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
          :key="tag"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action">
        <!-- <a @click="show = true">查看</a>
        <a-divider type="vertical" />
        <a>删除</a> -->
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
      enterprise:[],
      group:[],
      searchOpt:{
        // enterprise:"",
        // group:"",
        station:""
      },
      columns: [
        {
          dataIndex: "order",
          key: "order",
          title:"序号"
        },
        {
          title: "站点名称（编号）",
          dataIndex: "stationName",
          key: "stationName"
        },
        {
          title: "企业名称",
          dataIndex: "enterprise",
          key: "enterprise"
        },
        {
          title: "维护方案",
          dataIndex: "project",
          key: "project"
        },
        {
          title: "运维小组",
          key: "group",
          dataIndex: "group",
        },
        {
          title: "任务数量",
          dataIndex: "mission",
          key: "mission"
        },
        {
          title: "站点周期",
          dataIndex: "period",
          key: "period"
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
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"]
        }
      ]
    };
  },
  methods:{
    toDetail(){
      this.$router.push({path:"/customer/station/detail"})
    }
  }
};
</script>
