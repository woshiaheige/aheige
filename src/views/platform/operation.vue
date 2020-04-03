<template>
  <a-card :bordered="false" class="contract" title="设置运维参数">
    <a-form
      ref="formModal"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="签到验证">
        <a-radio-group v-decorator="['verify', { initialValue: 0 }]">
          <a-radio
            :value="item.id"
            v-for="(item, index) of verifyList"
            :key="index"
            >{{ item.label }}</a-radio
          >
        </a-radio-group>
      </a-form-item>
      <a-form-item label="验证距离">
        <counter v-model="distance">
          <span slot="uni">米</span>
        </counter>
      </a-form-item>
      <a-form-item label="警报记录问题设置"> </a-form-item>
      <a-form-item label="最小间隔时间">
        <counter v-model="spaceMin">
          <span slot="uni">分</span>
        </counter>
      </a-form-item>
      <a-form-item label="合同到期提醒设置"> </a-form-item>
      <a-form-item label="到期提醒天数">
        <counter v-model="remind">
          <span slot="uni">天</span>
        </counter>
      </a-form-item>
      <a-row type="flex" justify="center">
        <a-col>
          <a-button type="primary" html-type="submit">
            保存设置
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
import counter from "@/components/platform/operation/counter";
export default {
  components: { counter },
  data() {
    return {
      form: this.$form.createForm(this, { name: "templateEdit" }),
      verifyList: [
        {
          label: "不验证",
          id: 0
        },
        {
          label: "计算距离但不强制验证",
          id: 1
        },
        {
          label: "签到必须满足设置距离",
          id: 2
        }
      ],
      distance: 10, //验证距离
      spaceMin: 500, //最小间隔时间
      remind: 3 //到期提醒天数
    };
  },
  methods: {}
};
</script>
