<template>
  <div class="dispatch">
    <a-card v-margin:top="16">
      <div class="card-header">
        <div class="title">任务列表</div>
        <div class="extra">
          <span>本日任务数：{{ this.data.length }}</span>
        </div>
      </div>
      <a-radio-group v-model="week" v-margin:bottom="16" @change="changeWeek">
        <a-radio-button value="this">本周任务</a-radio-button>
        <a-radio-button value="next">下周任务</a-radio-button>
      </a-radio-group>
      <a-tabs tabPosition="left" v-model="selectedDay" @change="changeDay">
        <a-tab-pane v-for="item in tabList" :tab="item.tab" :key="item.key">
          <a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions" @click="toDispatch">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.enterpriseName }}</span>
                <div slot="description">
                  <p>
                    {{ item.groupName }}-{{ item.handleName }}
                    运维任务：日常巡检
                    <a-badge
                      v-margin:left="5"
                      status="default"
                      text="已创建"
                      v-if="item.status == 1"
                    />
                    <a-badge
                      v-margin:left="5"
                      status="default"
                      text="已创建"
                      v-if="item.status == 2"
                    />
                    <a-badge
                      v-margin:left="5"
                      status="default"
                      text="已创建"
                      v-if="item.status == 3"
                    />
                    <a-badge
                      v-margin:left="5"
                      status="default"
                      text="已创建"
                      v-if="item.status == 4"
                    />
                    <a-badge
                      v-margin:left="5"
                      status="default"
                      text="已创建"
                      v-if="item.status == 5"
                    />
                  </p>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <dispatch-edit
      :visible="editModal"
      @close="editModal = false"
    ></dispatch-edit>
  </div>
</template>

<script>
import dispatchEdit from "@/components/maintain/dispatch/dispatch-edit";
export default {
  components: {
    dispatchEdit
  },
  data() {
    return {
      data: [],
      editModal: false,
      week: "this",
      tabList: [
        { tab: "星期日", key: 0 },
        { tab: "星期一", key: 1 },
        { tab: "星期二", key: 2 },
        { tab: "星期三", key: 3 },
        { tab: "星期四", key: 4 },
        { tab: "星期五", key: 5 },
        { tab: "星期六", key: 6 }
      ],
      selectedDay: Number(this.$moment().format("d"))
    };
  },
  computed: {
    today() {
      return Number(this.$moment().format("d"));
    }
  },
  watch: {
    selectedDay() {
      if (this.week === "this") {
        this.getMissionThisWeek();
      } else {
        this.getMissionNextWeek();
      }
    }
  },
  mounted() {
    this.getMissionThisWeek();
  },
  methods: {
    toDispatch() {
      this.editModal = true;
    },
    changeWeek() {
      if (this.week == "this") {
        this.getMissionThisWeek();
      } else {
        this.getMissionNextWeek();
      }
    },
    changeDay(activeKey) {
      this.selectedDay = activeKey;
    },
    getMissionThisWeek() {
      let data = {};
      if (this.selectedDay >= this.today) {
        data = {
          beginTime:
            this.$moment()
              .add(this.selectedDay - this.today, "d")
              .format("YYYY-MM-DD") + " 00:00:00",
          endTime:
            this.$moment()
              .add(this.selectedDay - this.today, "d")
              .format("YYYY-MM-DD") + " 23:59:59"
        };
      } else if (this.selectedDay < this.today) {
        data = {
          beginTime:
            this.$moment()
              .subtract(this.today - this.selectedDay, "d")
              .format("YYYY-MM-DD") + " 00:00:00",
          endTime:
            this.$moment()
              .subtract(this.today - this.selectedDay, "d")
              .format("YYYY-MM-DD") + " 23:59:59"
        };
      }

      this.$api.maintain.getMissionThisWeek(data).then(res => {
        this.data = res.data.data == null ? [] : res.data.data;
      });
    },
    getMissionNextWeek() {
      let data = {};
      if (this.selectedDay >= this.today) {
        data = {
          beginTime:
            this.$moment()
              .add(this.selectedDay - this.today, "d")
              .add(7, "d")
              .format("YYYY-MM-DD") + " 00:00:00",
          endTime:
            this.$moment()
              .add(this.selectedDay - this.today, "d")
              .add(7, "d")
              .format("YYYY-MM-DD") + " 23:59:59"
        };
      } else if (this.selectedDay < this.today) {
        data = {
          beginTime:
            this.$moment()
              .subtract(this.today - this.selectedDay, "d")
              .add(7, "d")
              .format("YYYY-MM-DD") + " 00:00:00",
          endTime:
            this.$moment()
              .subtract(this.today - this.selectedDay, "d")
              .add(7, "d")
              .format("YYYY-MM-DD") + " 23:59:59"
        };
      }

      this.$api.maintain.getMissionNextWeek(data).then(res => {
        this.data = res.data.data == null ? [] : res.data.data;
      });
    }
  }
};
</script>

<style></style>
