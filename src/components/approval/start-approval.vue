<template>
  <a-card :bordered="false" class="index">
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="输入"></a-input>
      </a-form-item>
      <a-form-item>
        <a-select placeholder="下拉" v-width="150">
          <a-select-option value="1">
            Option 1
          </a-select-option>
          <a-select-option value="2">
            Option 2
          </a-select-option>
          <a-select-option value="3">
            Option 3
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-date-picker placeholder="时间" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">
          查询
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
        <a @click="show = true">查看</a>
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
        }
      ]
    };
  }
};
</script>
