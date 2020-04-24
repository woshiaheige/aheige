<template>
  <div class="dispatch">
    <a-card v-margin:top="16">
      <div class="card-header">
        <div class="title">任务列表</div>
        <div class="extra">
          <span>本日任务数：5</span>
        </div>
      </div>
      <a-radio-group v-model="week" v-margin:bottom="16">
        <a-radio-button value="this">本周任务</a-radio-button>
        <a-radio-button value="next">下周任务</a-radio-button>
      </a-radio-group>
      <a-tabs defaultActiveKey="1" tabPosition="left">
        <a-tab-pane tab="星期一" key="1">
          <a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions" @click="toDispatch">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>
                    运维1组-张天志 运维任务：日常巡检
                    <a-badge v-margin:left="5" status="default" text="已创建" />
                  </p>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane tab="星期二" key="2">
          <a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>
                    运维1组-张天志 运维任务：日常巡检
                    <a-badge v-margin:left="5" status="default" text="已创建" />
                  </p>
                </div>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane tab="星期三" key="3"
          ><a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>
                    运维1组-张天志 运维任务：日常巡检
                    <a-badge v-margin:left="5" status="default" text="已创建" />
                  </p>
                </div>
              </a-list-item-meta>
            </a-list-item> </a-list
        ></a-tab-pane>
        <a-tab-pane tab="星期四" key="4"
          ><a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>
                    运维1组-张天志 运维任务：日常巡检
                    <a-badge v-margin:left="5" status="default" text="已创建" />
                  </p>
                </div>
              </a-list-item-meta>
            </a-list-item> </a-list
        ></a-tab-pane>
        <a-tab-pane tab="星期五" key="5"
          ><a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>
                    运维1组-张天志 运维任务：日常巡检
                    <a-badge v-margin:left="5" status="default" text="已创建" />
                  </p>
                </div>
              </a-list-item-meta>
            </a-list-item> </a-list
        ></a-tab-pane>
        <a-tab-pane tab="星期六" key="6"
          ><a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>
                    运维1组-张天志 运维任务：日常巡检
                    <a-badge v-margin:left="5" status="default" text="已创建" />
                  </p>
                </div>
              </a-list-item-meta>
            </a-list-item> </a-list
        ></a-tab-pane>
        <a-tab-pane tab="星期日" key="7"
          ><a-list
            itemLayout="horizontal"
            :dataSource="data"
            class="dispatch-list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">调度</a>
              <a-list-item-meta>
                <span slot="title">{{ item.title }}</span>
                <div slot="description">
                  <p>
                    运维1组-张天志 运维任务：日常巡检
                    <a-badge v-margin:left="5" status="default" text="已创建" />
                  </p>
                </div>
              </a-list-item-meta>
            </a-list-item> </a-list
        ></a-tab-pane>
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
const data = [
  {
    title: "广州市污水处理厂-废水排口",
    description: "任务1 运维任务：日常巡检 小组1 张三"
  },
  {
    title: "广州市污水处理厂-废水排口",
    description: "任务1 运维任务：日常巡检 小组1 张三"
  },
  {
    title: "广州市污水处理厂-废水排口",
    description: "任务1 运维任务：日常巡检 小组1 张三"
  },
  {
    title: "广州市污水处理厂-废水排口",
    description: "任务1 运维任务：日常巡检 小组1 张三"
  },
  {
    title: "广州市污水处理厂-废水排口",
    description: "任务1 运维任务：日常巡检 小组1 张三"
  }
];
export default {
  components: {
    dispatchEdit
  },
  data() {
    return {
      data,
      editModal: false,
      week: "this"
    };
  },
  mounted() {},
  methods: {
    toDispatch() {
      this.editModal = true;
    }
  }
};
</script>

<style></style>
