<template>
  <a-card :bordered="false" class="index">
    <a-form layout="inline">
      <a-row>
        <a-col :span="12">
          <a-form-item label="审批名称">
            <a-input placeholder="输入审批名称"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="选择类型">
            <a-radio-group @change="onChange" v-model="value">
              <a-radio :value="1">A</a-radio>
              <a-radio :value="2">B</a-radio>
              <a-radio :value="3">C</a-radio>
              <a-radio :value="4">D</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      value: 1
    };
  },
  methods: {
    onChange(e) {
      console.log("radio checked", e.target.value);
    }
  }
};
</script>
