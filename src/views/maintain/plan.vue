<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6">
        <a-card :bordered="false" title="未配置监测点" extra="54">
          <a-radio-group defaultValue="a" buttonStyle="solid">
            <a-radio-button value="a">水类站点</a-radio-button>
            <a-radio-button value="b">气类站点</a-radio-button>
            <a-radio-button value="c">其他站点</a-radio-button>
          </a-radio-group>
          <a-list>
            <a-list-item slot="renderItem">
              XX污水处理厂废水排口
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card :bordered="false" title="配置站点运维方案">
          <a-form layout="inline">
            <a-form-item label="运维期限">
              <a-range-picker></a-range-picker>
            </a-form-item>
            <a-form-item label="运维小组">
              <a-select defaultValue="jack" style="width: 120px">
                <a-select-option value="jack">运维1组</a-select-option>
                <a-select-option value="lucy">运维2组</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
          <a-divider dashed></a-divider>
          <a-transfer
            :titles="['所有方案', '已配置方案']"
            :listStyle="{
              width: '300px',
              height: '300px'
            }"
          />
          <a-divider dashed></a-divider>
          <a-button type="primary">配置方案</a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped></style>
