<template>
  <div>
    <a-form layout="inline">
      <a-form-item label="运维小组">
        <a-select
          defaultValue="all"
          style="width: 120px"
          v-model="formInline.group"
          showSearch
          :filterOption="filterOptions"
          @change="onSubmit"
        >
          <a-select-option
            :value="item.id"
            v-for="(item, index) of groupOptions"
            :key="index"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="运维人员">
        <a-input
          placeholder="请输入"
          v-model="formInline.member"
          :maxLength="30"
          @pressEnter="onSubmit"
        />
      </a-form-item>
      <a-form-item label="任务状态">
        <a-select
          defaultValue="all"
          style="width: 120px"
          v-model="formInline.isComplete"
          showSearch
          :filterOption="filterOptions"
          @change="onSubmit"
        >
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="1">已完成</a-select-option>
          <a-select-option value="0">待处理</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-form-item label="任务类型">
          <a-select
            defaultValue="1"
            style="width: 120px"
            v-model="formInline.type"
            showSearch
            :filterOption="filterOptions"
            @change="onSubmit"
          >
            <a-select-option value="1">例行任务</a-select-option>
            <a-select-option value="2">突发任务</a-select-option>
          </a-select>
        </a-form-item>
      </a-form-item>
      <a-form-item label="时间范围">
        <a-range-picker @change="onChange" />
      </a-form-item>
      <a-form-item style="float: right">
        <a-button type="primary" @click="onSubmit">
          查询
        </a-button>
        <a-button @click="resetFormInLine" v-margin:left="16">
          重置
        </a-button>
      </a-form-item>
    </a-form>
    <!-- 例行任务 -->
    <template v-if="formInline.type == 1">
      <mission-daily :execFormInline="execFormInline" ref="missionDaily" />
    </template>

    <!-- 突发任务 -->
    <template v-if="formInline.type == 2">
      <mission-outburst
        :execFormInline="execFormInline"
        ref="missionOutburst"
      />
    </template>
  </div>
</template>
<script>
import missionDaily from "@/components/maintain/mission/mission-daily";
import missionOutburst from "@/components/maintain/mission/mission-outburst";
export default {
  components: { missionDaily, missionOutburst },
  data() {
    return {
      groupOptions: [],
      formInline: {
        group: "",
        member: "",
        type: "1",
        isComplete: "all"
      },
      execFormInline: {}
    };
  },
  methods: {
    onChange(e) {
      console.log(e);
    },
    resetFormInLine() {
      this.formInline = this.$options.data().formInline;
      this.onSubmit();
    },
    onSubmit() {
      this.execFormInline = this.formInline;
      if (this.formInline.type == 1) {
        this.$refs.missionDaily.getTableData();
      } else {
        this.$refs.missionOutburst.getTableData();
      }
    },
    gellAllSysGroup() {
      this.$api.organization.gellAllSysGroup().then(res => {
        res.data.data.unshift({ name: "全部", id: "" });
        this.groupOptions = res.data.data;
      });
    }
  },
  mounted() {
    this.gellAllSysGroup();
    this.$refs.missionDaily.getTableData();
  }
};
</script>
<style lang="less" scoped></style>
