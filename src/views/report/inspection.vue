<template>
  <a-card :bordered="false" class="inspection" title="巡检记录">
    <a-button type="primary" @click="editorInspection('')"
      >添加巡检报告</a-button
    >
    <a-table
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      v-margin:top="16"
      :pagination="false"
    >
      <span slot="action" slot-scope="row">
        <a @click="editorInspection(row)">编辑</a>
        <a-divider type="vertical" />
        <a @click="showInspection(row)">查看</a>
      </span>
    </a-table>

    <a-pagination
      v-margin:top="16"
      showQuickJumper
      showSizeChanger
      :defaultCurrent="current"
      :total="total"
    />
    <inspection-edit :visible.sync="editVisible" :inspectionId="inspectionId" />
  </a-card>
</template>

<script>
import inspectionEdit from "@/components/report/inspection/inspection-edit";
export default {
  components: { inspectionEdit },
  data() {
    return {
      current: 1,
      total: 1,
      editVisible: false,
      inspectionId: "",
      columns: [
        {
          title: "序号",
          dataIndex: "order",
          key: "order"
        },
        {
          title: "报告名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "巡检开始时间",
          dataIndex: "startTime",
          key: "startTime"
        },
        {
          title: "巡检结束时间",
          dataIndex: "endTime",
          key: "endTime"
        },
        {
          title: "巡检状态",
          dataIndex: "status",
          key: "status"
        },
        {
          title: "创建人",
          dataIndex: "createdBy",
          key: "createdBy"
        },
        {
          title: "创建时间",
          dataIndex: "createdAt",
          key: "createdAt"
        },
        {
          title: "查看",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],
      tableData: [
        {
          order: "1",
          id: "0",
          name: "巡检报告-2020/2/3",
          startTime: "2020-02-03 00：00：00",
          endTime: "2020-02-03 00：00：00",
          status: "",
          createdBy: "",
          createdAt: "2020-2-3"
        }
      ],
      missonDetail: [] //详情的数据
    };
  },
  methods: {
    editorInspection(row) {
      console.log(row);
      if (row) {
        this.inspectionId = row.id;
      } else {
        this.inspectionId = "";
      }
      this.editVisible = true;
    },
    showInspection() {}
  },
  mounted() {}
};
</script>
