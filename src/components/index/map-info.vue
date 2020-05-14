<template>
  <a-modal
    :title="title"
    :style="style"
    :visible="modelData.show"
    @cancel="handleCancel"
    :mask="false"
    :footer="null"
    class="map-modal"
  >
    <div v-margin:bottom="25">
      <a-descriptions :column="2">
        <a-descriptions-item label="监控点名称">
          {{ list.name }}
        </a-descriptions-item>
        <a-descriptions-item label="所属企业">
          {{ list.enterpriseName }}
        </a-descriptions-item>
        <a-descriptions-item label="MN号">
          {{ list.mn }}
        </a-descriptions-item>
        <a-descriptions-item label="监测因子数">
          {{ list.divisorCount }}
        </a-descriptions-item>
        <a-descriptions-item label="是否在线">
          <a-tag color="green" v-if="list.state == 0">
            在线
          </a-tag>
          <a-tag color="red" v-else>
            离线
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="是否异常">
          <a-tag color="green" v-if="list.isNormal == 0">
            正常
          </a-tag>
          <a-tag color="red" v-else>
            异常
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="是否超标">
          <a-tag color="green" v-if="list.overFlag == 0">
            正常
          </a-tag>
          <a-tag color="red" v-else>
            超标
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="最后通迅时间">
          {{ list.communicationTime }}
        </a-descriptions-item>
      </a-descriptions>
      <div v-if="!(JSON.stringify(realData) == '{}')">
        <a-descriptions :title="'数据时间：' + realData.dataTime" :column="2">
          <a-descriptions-item
            v-for="(item, index) in realData.list"
            :key="index"
            :label="item.codeName"
          >
            <span v-if="item.Avg == '-'">{{ item.Avg }}</span>
            <span v-else>
              {{ item.Avg }}{{ item.unit }}
              <a-tooltip placement="top">
                <template slot="title">
                  <p>上限：{{ item.ceilval }}</p>
                  <p>下限：{{ item.floorval }}</p>
                  <p>倍数：{{ item.multiple }}</p>
                </template>
                <a-icon
                  type="question-circle"
                  theme="filled"
                  style="color: rgba(0, 0, 0, 0.25);"
                />
              </a-tooltip>
            </span>
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
  </a-modal>
</template>
<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      loading: false,
      title: "",
      list: {},
      realData: {},
      style: ""
    };
  },
  computed: {
    modelData() {
      return this.value;
    }
  },
  methods: {
    handleCancel() {
      this.modelData.show = false;
    }
  },
  mounted() {},
  watch: {
    "value.show"() {
      this.list = {};
      this.realData = {};
      if (this.value.show == true) {
        this.title = this.value.data.name;
        this.list = this.value.data;
        this.style =
          "top:" +
          (this.value.position.y + 10) +
          "px;left:" +
          (this.value.position.x - 330) +
          "px";
        if (!(JSON.stringify(this.value.data.realData) == "{}")) {
          this.realData = this.list.realData;
          let num = Math.ceil(this.realData.list.length / 2) + 1;
          this.style =
            "top:" +
            (this.value.position.y - num * 35) +
            "px;left:" +
            (this.value.position.x - 330) +
            "px";
        }
      }
    }
  }
};
</script>
<style lang="less">
.map-modal {
  .ant-modal-header {
    background: #3792f7;
    padding: 8px 20px;
    font-size: 14px;
    .ant-modal-title {
      color: #fff;
    }
  }
  .ant-modal-body {
    padding-bottom: 10px !important;
    & > div {
      margin: 0 !important;
    }
  }
  .ant-descriptions-title {
    font-weight: initial;
    font-size: 14px;
  }
  .ant-modal-close-x {
    height: 42px;
    line-height: 42px;
    color: #fff;
  }
}
</style>
