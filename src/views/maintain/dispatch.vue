<template>
  <div class="dispatch">
    <a-card v-margin:top="16">
      <div class="card-header">
        <div class="title">任务列表</div>
        <div class="extra">
          <span>本日任务数：{{ this.data.length }}</span>
        </div>
      </div>
      <a-radio-group
        v-model="week"
        v-margin:bottom="16"
        @change="changeWeek"
        buttonStyle="solid"
      >
        <a-radio-button value="this">本周任务</a-radio-button>
        <a-radio-button value="next">下周任务</a-radio-button>
      </a-radio-group>
      <a-tabs tabPosition="left" v-model="selectedDay" @change="changeDay">
        <a-tab-pane v-for="item in tabList" :tab="item.tab" :key="item.key">
          <a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
            :loading="loading"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a
                slot="actions"
                @click="toDispatch(item)"
                v-if="item.status == 1"
                >调度</a
              >
              <a-list-item-meta>
                <span slot="title"
                  >{{ item.enterpriseName }} {{ item.pointName }}</span
                >
                <div slot="description">
                  <p>
                    {{ item.groupName }}
                    <a-tag color="blue">{{ item.handleName }}</a-tag>
                    运维任务：
                    <a-tag color="red">{{ item.name }}</a-tag>
                    <a-badge
                      v-margin:left="5"
                      status="default"
                      text="待处理"
                      v-if="item.status == 1"
                    />
                    <a-badge
                      v-margin:left="5"
                      status="processing"
                      text="处理中"
                      v-if="item.status == 2"
                    />
                    <a-badge
                      v-margin:left="5"
                      status="success"
                      text="已完成"
                      v-if="item.status == 3"
                    />
                    <a-badge
                      v-margin:left="5"
                      status="warning"
                      text="已延期"
                      v-if="item.status == 4"
                    />
                    <a-badge
                      v-margin:left="5"
                      status="success"
                      text="已关闭"
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
      :mission-detail="selectedMission"
      :week="week"
      :day="selectedDay"
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
      loading: false,
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
      selectedDay: Number(this.$moment().format("d")),
      selectedMission: {}
    };
  },
  computed: {
    today() {
      return Number(this.$moment().format("d"));
    }
  },
  watch: {
    editModal(newVal) {
      if (!newVal) {
        if (this.week === "this") {
          this.getMissionThisWeek();
        } else {
          this.getMissionNextWeek();
        }
      }
    }
  },
  mounted() {
    this.getMissionThisWeek();
  },
  methods: {
    toDispatch(item) {
      this.editModal = true;
      this.selectedMission = item;
    },
    async changeWeek(e) {
      if (e.target.value == "this") {
        this.selectedDay = this.today;
        await this.selectedDay;
        this.getMissionThisWeek();
      } else {
        this.selectedDay = 0;
        await this.selectedDay;
        this.getMissionNextWeek();
      }
    },
    changeDay(activeKey) {
      this.selectedDay = activeKey;

      if (this.week === "this") {
        this.getMissionThisWeek();
      } else {
        this.getMissionNextWeek();
      }
    },
    getMissionThisWeek() {
      this.loading = true;
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
        if (res.data.state == 0) {
          this.data = res.data.data;
          this.loading = false;
        }
      });
    },
    getMissionNextWeek() {
      this.loading = true;
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
        if (res.data.state == 0) {
          this.data = res.data.data;
          this.loading = false;
        }
      });
    }
  }
};
</script>

<style></style>
