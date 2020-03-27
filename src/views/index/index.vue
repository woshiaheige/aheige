<template>
  <a-row :gutter="16">
    <a-col :span="6">
      <a-card>
        <a-statistic
          title="服务客户"
          :value="298"
          :valueStyle="{ color: '#3f8600' }"
          style="margin-right: 50px"
        >
        </a-statistic>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card>
        <a-statistic
          title="运维站点"
          :value="298"
          :valueStyle="{ color: '#cf1322' }"
        >
        </a-statistic>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card>
        <a-statistic
          title="维护仪器"
          :value="298"
          :valueStyle="{ color: '#cf1322' }"
        >
        </a-statistic>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card>
        <a-statistic
          title="运维小组"
          :value="298"
          suffix="组"
          :valueStyle="{ color: '#cf1322' }"
        >
        </a-statistic>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      columns: [
        {
          dataIndex: "name",
          key: "name",
          slots: { title: "customTitle" },
          scopedSlots: { customRender: "name" }
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age"
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address"
        },
        {
          title: "Tags",
          key: "tags",
          dataIndex: "tags",
          scopedSlots: { customRender: "tags" }
        },
        {
          title: "Action",
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
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["loser"]
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"]
        }
      ]
    };
  }
};
</script>
