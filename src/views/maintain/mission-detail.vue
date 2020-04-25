<template>
  <div>
    <a-card :bordered="false" class="maintain" v-margin:top="16">
      <div class="card-header">
        <div class="title">任务列表</div>
        <div class="extra">
          <a-form layout="inline" :model="formInline">
            <a-form-item>
              <a-radio-group v-model="formInline.type">
                <a-radio-button value="1">例行任务</a-radio-button>
                <a-radio-button value="2">突发任务</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <!-- 例行任务 -->
      <template v-if="formInline.type == 1">
        <mission-daily />
      </template>

      <!-- 突发任务 -->
      <template v-if="formInline.type == 2">
        <mission-outburst />
      </template>
    </a-card>
  </div>
</template>
<script>
import missionDaily from "@/components/maintain/mission/mission-daily";
import missionOutburst from "@/components/maintain/mission/mission-outburst";
export default {
  components: { missionDaily, missionOutburst },
  data() {
    return {
      formInline: {
        type: "1"
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped></style>
