<template>
  <div class="station-base-data">
    <a-row type="flex" justify="end">
      <a-col>
        <a-button type="primary">保存</a-button>
      </a-col>
    </a-row>
    <a-form
      ref="formModal"
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-row>
        <a-col :span="12">
          <a-form-item label="站点名称">
            <a-input
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入站点名称' }] }
              ]"
              placeholder="请输入站点名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="站点编号">
            <a-input v-decorator="['order']" placeholder="请输入站点编号" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item>
            <span slot="label">
              负责人&nbsp;
              <a-tooltip title="What do you want others to call you?">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <a-select
              v-decorator="['response']"
              placeholder="请选择客户方的站点负责人"
            >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="数采仪编号" prop="machineNum">
            <a-input v-decorator="['machineNum']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="站点地址" prop="name">
            <a-input
              v-decorator="['address']"
              placeholder="请输入站点所在的地址"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="站点标签">
            <a-input v-decorator="['tag']" placeholder="请添加标签" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="维护小组">
            <a-select v-decorator="['fixGroup']" placeholder="请选择维护小组">
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="第三方平台">
            <a-select v-decorator="['table']" placeholder="请选择第三方平台">
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="站点经度">
            <a-input v-decorator="['lng']" placeholder="请添加站点经度">
              <a-icon slot="prefix" type="environment" @click="showModal()" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="站点纬度">
            <a-input v-decorator="['lat']" placeholder="请添加站点纬度">
              <a-icon slot="prefix" type="environment" @click="showModal()" />
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item label="维护时间" :label-col="{ span: 3 }">
            <a-range-picker
              v-decorator="['range-time-picker']"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item label="站点说明" :label-col="{ span: 3 }">
        <a-input v-decorator="['detail']" type="textarea" />
      </a-form-item>
    </a-form>
    <div v-if="activekey">
      <maps :obj="obj" @getModal="getModal"></maps>
    </div>
  </div>
</template>
<script>
import maps from "@/components/common/search-map.vue";
export default {
  components: { maps },
  data() {
    return {
      rules: {},
      form: this.$form.createForm(this, { name: "stationBaseData" }),
      formValidate: {},
      obj: {},
      InfoIndexdata: {},
      activekey: false
    };
  },
  methods: {
    showModal() {
      this.activekey = true;
      this.obj = {
        show: true,
        lnglat: this.InfoIndexdata.lng
          ? [this.InfoIndexdata.lng, this.InfoIndexdata.lat]
          : "",
        address: this.InfoIndexdata.address
      };
    },
    getModal(msg) {
      // 地图弹框返回的经纬度和地址信息
      console.log(msg);
      console.log(this.InfoIndexdata);
      if (msg && msg.lnglat.length > 0) {
        // this.$refs.formValidate.validateField("lat");
        this.InfoIndexdata.lat = msg.lnglat[1];
        this.InfoIndexdata.lng = msg.lnglat[0];
        this.InfoIndexdata.address = msg.address;
      }
    }
  }
};
</script>
>
