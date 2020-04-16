<template>
  <a-card :bordered="false" class="organization">
    <span slot="title">小组管理</span>
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="小组名称"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSubmit">
          查询
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="success" @click="visible = true">
          新增
        </a-button>
      </a-form-item>
    </a-form>
    <a-row
      type="flex"
      justify="space-between"
      align="middle"
      v-margin:top="20"
      :gutter="[16, 16]"
    >
      <a-col v-for="(item, index) of tableData" :key="index">
        <a-card hoverable style="width: 300px">
          <span slot="title">{{ item.name }}</span>
          <template class="ant-card-actions" slot="actions">
            <a-icon type="setting" key="setting" @click="onEdit(item)" />
            <a-icon type="edit" key="edit" @click="onGroupShow(item)" />
            <a-icon type="delete" key="delete" @click="onDelete(item)" />
          </template>
          <div v-for="(member, key) of item.member" :key="key">
            {{ member.name }}
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-pagination
      size="small"
      v-margin:top="16"
      showSizeChanger
      :total="total"
      :current="current"
      @change="pagechange"
      @showSizeChange="sizechange"
    />
    <!-- 新增编辑小组 -->
    <group-edit :visible.sync="visible" :groupDetail="groupDetail" />
    <!-- 新增编辑组员 -->
    <group-member :visible.sync="groupVisible" />
  </a-card>
</template>
<script>
import groupEdit from "@/components/organization/group/group-edit";
import groupMember from "@/components/organization/group/group-member";
export default {
  components: { groupEdit, groupMember },
  data() {
    return {
      visible: false,
      groupVisible: false,
      groupDetail: "",
      current: 1,
      total: 0,
      loading: false,
      pagesize: 10,
      tableData: [
        { name: "小组A", member: [{ name: "张山" }, { name: "李四" }] }
      ],
      obj: {
        show: false
      },
      checkObj: {
        show: false
      }
    };
  },
  methods: {
    getTableData() {
      this.$api.maintain.getMemberList().then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    onEdit(row) {
      console.log(row);
      this.groupDetail = row;
      this.visible = true;
    },
    onDelete(row) {
      console.log(row);
      this.$confirm({
        title: "删除",
        content: `是否删除${row.name}`,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    onGroupShow(row) {
      //显示小组
      this.groupVisible = true;
      console.log(row);
    }
  },
  mounted() {
    // this.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
