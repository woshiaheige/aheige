<template>
  <a-modal
    width="60%"
    title="例行任务详情"
    :visible="visible"
    @cancel="closeModal"
  >
    <a-steps :current="missionStatus" size="small" v-margin:bottom="40">
      <a-step title="待处理" :description="detail.gmtCreate" />
      <a-step title="处理中" />
      <a-step
        title="已完成"
        :description="detail.gmtComplete"
        v-if="statusType == 'finish'"
      />
      <a-step
        title="已关闭"
        v-if="statusType == 'close'"
        :description="detail.gmtClose"
      />
    </a-steps>
    <div class="description-wrapper">
      <a-descriptions :column="1" bordered>
        <a-descriptions-item label="运维小组">{{
          detail.groupName
        }}</a-descriptions-item>
        <a-descriptions-item label="运维人员" v-if="detail.handleName">{{
          detail.handleName
        }}</a-descriptions-item>
        <a-descriptions-item label="运维时间">{{
          this.$moment(detail.gmtExecution).format("YYYY-MM-DD")
        }}</a-descriptions-item>
        <a-descriptions-item label="运维项目">
          <template v-if="detail.taskItemVos">
            <div
              v-for="(item, index) of detail.taskItemVos"
              :key="index"
              v-margin.bottom="10"
            >
              <span
                >{{ item.name }}
                <span v-if="statusType == 'finish'" style="float:right">
                  <a-tag color="green" v-if="item.isState == 1">是</a-tag>
                  <a-tag v-if="item.isState == 0">否</a-tag>
                </span>
              </span>
            </div>
          </template>
        </a-descriptions-item>
        <a-descriptions-item label="附件" v-if="detail.fileIds">
          <img
            v-for="(item, index) of detail.fileIds"
            :key="index"
            v-image-preview
            :src="fileViewOnline + item"
            alt=""
            style="width:100px;height:100px;object-fit:cover;margin:5px"
          />
          <div v-if="playerOptions.length > 0">
            <video-player
              v-for="(item, index) of playerOptions"
              class="video-player vjs-custom-skin"
              :ref="'videoPlayer' + index"
              v-margin:bottom="16"
              :playsinline="true"
              :key="index"
              :options="item"
            ></video-player>
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </div>

    <template slot="footer">
      <a-button key="back" @click="closeModal">关闭</a-button>
    </template>
  </a-modal>
</template>
<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    detail: {
      required: false
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.playerOptions = [];
        if (this.detail.fileIds && this.detail.fileIds.length > 0) {
          this.detail.fileIds.forEach(item => {
            this.playerOptions.push({
              playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
              autoplay: false, //如果true,浏览器准备好时开始回放。
              muted: false, // 默认情况下将会消除任何音频。
              loop: false, // 导致视频一结束就重新开始。
              preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
              language: "zh-CN",
              aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
              fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: [
                {
                  type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                  src: this.fileViewOnline + item //url地址
                }
              ],
              notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true //全屏按钮
              }
            });
          });
        }
      }
    }
  },
  computed: {
    missionStatus() {
      if (this.detail.status == 3) {
        //已完成
        return this.detail.status + 1;
      } else if (this.detail.status == 4) {
        //已关闭
        return this.detail.status - 1;
      } else {
        //待处理，处理中
        return this.detail.status - 1;
      }
    },
    statusType() {
      //关闭流程还是正常的完成流程
      if (this.detail.status == 3) {
        //已完成
        return "finish";
      } else if (this.detail.status == 4) {
        //已关闭
        return "close";
      } else {
        //待处理，处理中
        return "finish";
      }
    }
  },
  data() {
    return {
      fileViewOnline: this.$api.common.fileViewOnline,
      playerOptions: []
    };
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
    handleOk() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style lang="less" scoped></style>
