<template>
  <a-card :bordered="false" class="plan" title="运维计划">
    <a-form layout="inline">
      <a-row type="flex" justify="space-between" align="middle">
        <a-col>
          <a-form-item>
            <a-button
              v-margin:right="20"
              size="small"
              type="primary"
              icon="save"
              >保存计划</a-button
            >
            <a-button type="primary" size="small" icon="send"
              >立即执行</a-button
            >
          </a-form-item>
        </a-col>
        <a-col>
          <a-form-item label="小组">
            <a-select placeholder="请选择小组" v-width="150">
              <a-select-option value="1">
                Option 1
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="客户">
            <a-select placeholder="请选择客户" v-width="150">
              <a-select-option value="1">
                Option 1
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-layout style="background:#fff" class="plan-content">
      <!-- 左侧未计划站点 -->
      <a-layout-sider style="background:#fff">
        <div class="tab-bar">
          <a-popover>
            <template slot="content">
              这是提示
            </template>
            <div>
              <span v-margin:right="5" v-margin:left="10" class="tip"
                >未计划站点列表</span
              >
              <a-icon type="question-circle" />
            </div>
          </a-popover>
        </div>
        <div
          ref="listGroup"
          :style="{ height: listHight, overflowY: 'scroll' }"
        >
          <draggable
            class="list-group"
            :list="readyPlan"
            group="people"
            @change="log"
          >
            <div
              class="list-group-item"
              :class="{ 'no-ellpsis': ellipsisFlag == false }"
              v-for="(element, index) in readyPlan"
              :key="index"
              :title="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </a-layout-sider>
      <!-- 中间表格 -->
      <a-layout-content v-margin:left="20">
        <div class="tab-bar ">
          <span class="tip">任务日历看板</span>
          <a-button
            :type="listType == 'week' ? 'primary' : ''"
            size="small"
            icon="table"
            @click="listType = 'week'"
            >周计划</a-button
          >
          <a-button
            :type="listType == 'month' ? 'primary' : ''"
            v-margin:left="5"
            size="small"
            icon="table"
            @click="listType = 'month'"
            >月计划</a-button
          >
          <a-checkbox class="toggle-station" v-model="ellipsisFlag"
            >省略显示站点名</a-checkbox
          >
        </div>
        <div
          :style="{ height: listHight, overflowY: 'scroll' }"
          v-if="listType == 'week'"
        >
          <!-- 周计划 -->
          <week-drag-list :list="weekListData"></week-drag-list>
        </div>
        <!-- 月计划 -->
        <month-drag-list
          :list="monthListData"
          v-if="listType == 'month'"
        ></month-drag-list>
      </a-layout-content>
    </a-layout>
  </a-card>
</template>
<script>
import draggable from "vuedraggable";
import weekDragList from "@/components/i-maintain/plan/week-drag-list";
import monthDragList from "@/components/i-maintain/plan/month-drag-list";
export default {
  name: "plan",
  components: {
    draggable,
    weekDragList,
    monthDragList
  },
  data() {
    return {
      listType: "week", //week,month
      ellipsisFlag: true,
      readyPlan: ["A", "B"],
      weekListData: [],
      monthListData: [],
      listHight: "" //各列表的高度
    };
  },
  methods: {
    log(e) {
      console.log(e);
    },
    getReadyPlan() {
      //获取未分配的任务
      let params = {
        type: ""
      };
      this.$api.iMaintain.maintainPlan(params).then(res => {
        this.readyPlan = res.data.data;
      });
    },
    getWeekPlan() {
      //获取周任务
      this.$api.iMaintain.getWeekPlan().then(res => {
        this.weekListData = res.data.data;
      });
    },
    getMonthPlan() {
      //获取月任务
      this.$api.iMaintain.getMonthPlan().then(res => {
        this.monthListData = res.data.data;
        this.monthListData[0].list.splice(0, 2);
      });
    },

    getListHeight() {
      //获取list的最大高度
      const offsetTop = this.$refs.listGroup.getBoundingClientRect().top;
      const box =
        document.documentElement || document.body || window.pageYOffset;
      const height = box.offsetHeight - offsetTop - 80;
      return height + "px";
    }
  },
  mounted() {
    this.getReadyPlan();
    this.getWeekPlan();
    this.getMonthPlan();
    this.$nextTick(() => {
      this.listHight = this.getListHeight();
    });
  }
};
</script>
<style lang="less" scoped></style>
