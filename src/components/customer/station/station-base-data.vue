<template>
  <div class="station-base-data">
    <a-form
      ref="formModal"
      :model="form"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item label="站点名称" prop="name">
            <a-input v-model="form.name"  placeholder="请输入站点名称"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="站点编号" prop="order">
            <a-input v-model="form.name" placeholder="请输入站点编号"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item prop="name">
            <span slot="label">
              负责人&nbsp;
              <a-tooltip title="What do you want others to call you?">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <a-select placeholder="请选择客户方的站点负责人">
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="数采仪编号" prop="order">
            <a-input v-model="form.name" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="站点分组" prop="name">
            <a-input v-model="form.name"  placeholder="请添加站点分组"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="站点标签" prop="order">
            <a-input v-model="form.name" placeholder="请添加标签"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item prop="name" label="维护小组">
            <a-select placeholder="请选择维护小组">
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item prop="name" label="第三方平台">
            <a-select placeholder="请选择第三方平台">
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="站点经度" prop="name">
            <a-input v-model="form.name"  placeholder="请添加站点经度">
              <a-icon slot="prefix" type="environment" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="站点纬度" prop="order">
            <a-input v-model="form.name"  placeholder="请添加站点纬度">
              <a-icon slot="prefix" type="environment" />
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row >
        <a-col :span="24">
          <a-form-item label="站点地址" prop="name" :label-col="{ span: 3 }">
            <a-input v-model="form.name"  placeholder="请输入站点所在的地址"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item
          label="维护时间"
            :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
          >
            <a-date-picker style="width: 100%" />
          </a-form-item>
          <!-- <span style="display:inlineBlock;height:100%;lineHeight:100%">至</span> -->
          <a-form-item label="至" :label-col="{ span: 1,offset:-5}" :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
            <a-date-picker style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="站点说明" prop="detail" :label-col="{ span: 3 }">
        <a-input v-model="form.detail" type="textarea" />
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules:{},
      form: {}
    };
  }
};
</script>
>
