<template>
  <a-modal
    title="警报详细信息"
    :visible="visible"
    @cancel="closeModal"
    :width="600"
  >
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
      <a-row>
        <a-col :span="24">
          <a-form-item label="警报信息">
            <a-input readonly v-model="form.msg" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="警报状态">
            <a-input readonly v-model="form.status" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="任务名称">
            <a-input readonly v-model="form.mission" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="所属仪器">
            <a-input readonly v-model="form.instrument" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="所属因子">
            <a-input readonly v-model="form.factor" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="报警时间">
            <a-input readonly v-model="form.warnTime" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="报警接受次数">
            <a-input readonly v-model="form.frequency" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="首次接收时间">
            <a-input readonly v-model="form.firstTime" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-row slot="footer">
      <a-col :span="24">
        <a-button type="primary" @click="handleWarn">处理</a-button>
        <a-button type="primary" @click="ignoreWarn">忽略</a-button>
        <a-button type="danger" @click="deleteWarn">删除</a-button>
        <a-button @click="closeModal">关闭</a-button>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    }
  },
  data() {
    return {
      loading: false,
      form: {
        order: "2",
        id: "1",
        msg: "值不准",
        mission: "可口可乐（污水）自动运维任务20/02/13（#1879）",
        station: "丰华玻璃",
        status: "处理中",
        instrument: "仪器B",
        factor: "氨氮",
        frequency: "11",
        warnTime: "2019-10-15 10:20",
        firstTime: "2019-10-15 10:20"
      },
      rules: {}
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
    handleWarn() {
      this.$confirm({
        title: "处理",
        content: `处理这条警告吗？`,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    ignoreWarn() {
      this.$confirm({
        title: "忽略",
        content: `忽略这条警告吗？`,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    },
    deleteWarn() {
      this.$confirm({
        title: "删除",
        content: `删除这条警告吗？`,
        onOk() {
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        }
      });
    }
  }
};
</script>
