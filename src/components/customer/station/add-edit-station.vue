<template>
  <a-modal
    :title="title + '监测点'"
    :visible="modelData.show"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
    :maskClosable="false"
  >
    <a-form-model
      ref="ruleForm"
      :validateOnRuleChange="true"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="所属企业" prop="enterpriseId">
        <a-select
          placeholder="所属企业"
          v-model="formData.enterpriseId"
          :disabled="isDisabled"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="item in enterpriseList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="监测点名称" prop="name">
        <a-input
          v-model.trim="formData.name"
          :maxLength="30"
          placeholder="监测点名称"
        />
      </a-form-model-item>
      <a-form-model-item label="MN号" prop="mn">
        <a-input
          v-model.trim="formData.mn"
          :maxLength="30"
          placeholder="MN号"
          :disabled="modelData.type == 'edit'"
        />
      </a-form-model-item>
      <a-form-model-item label="所属小组" prop="groupId">
        <a-select
          placeholder="所属小组"
          v-model="formData.groupId"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="item in groupOptions"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="经纬度" prop="lngandlat">
        <a-input
          placeholder="请选择经纬度"
          @click="onLnglat()"
          v-model.trim="formData.lngandlat"
        >
          <a-tooltip slot="suffix">
            <a-icon type="environment" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="监测点类型" prop="type">
        <a-select
          placeholder="监测点类型"
          v-model="formData.type"
          showSearch
          :filterOption="filterOptions"
          :disabled="modelData.type == 'edit'"
        >
          <a-select-option
            v-for="item in pointOptions"
            :key="item.value"
            :value="Number(item.value)"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="传输类型" prop="transferType">
        <a-select
          v-model="formData.transferType"
          placeholder="传输类型"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="item in transferList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="传输协议" prop="protocolType">
        <a-select
          v-model="formData.protocolType"
          placeholder="传输协议"
          showSearch
          :filterOption="filterOptions"
          :disabled="modelData.type == 'edit'"
        >
          <a-select-option
            v-for="item in protocolList"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" v-preventReClick @click="handleOk">
        保存
      </a-button>
    </template>
    <search-map :obj="mapModel" @getModal="getModal"></search-map>
  </a-modal>
</template>
<script>
import searchMap from "@/components/common/search-map";
export default {
  components: { searchMap },
  props: {
    pointOptions: Array,
    value: Object
  },
  data() {
    return {
      title: "新建",
      enterpriseList: [],
      mapModel: {
        show: false,
        lnglat: []
      },
      transferList: [
        {
          name: "有线传输",
          id: 2
        },
        {
          name: "无线传输",
          id: 1
        }
      ],
      protocolList: [
        // {
        //   name: "扩展协议",
        //   id: "0"
        // },
        {
          name: "05协议",
          id: "05"
        },
        {
          name: "17协议",
          id: "17"
        }
      ],
      formData: {
        id: "",
        enterpriseId: undefined,
        name: "",
        mn: "",
        groupId: undefined,
        lngandlat: undefined,
        type: undefined,
        transferType: undefined,
        protocolType: undefined
      },
      rules: {
        enterpriseId: [
          {
            required: true,
            message: "请选择所属企业",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入监测点名称",
            trigger: "blur"
          }
        ],
        mn: [
          {
            required: true,
            message: "请输入MN号",
            trigger: "blur"
          }
        ],
        groupId: [
          {
            required: true,
            message: "请选择所属小组",
            trigger: "change"
          }
        ],
        protocolType: [
          {
            required: true,
            message: "请选择传输协议",
            trigger: "change"
          }
        ],
        lngandlat: [
          {
            required: true,
            message: "请选择经纬度",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "请选择监测点类型",
            trigger: "change"
          }
        ]
      },
      isDisabled: false,
      groupOptions: [],
      deviceOptions: []
    };
  },
  computed: {
    modelData: {
      get() {
        return this.value;
      },
      set() {}
    }
  },
  methods: {
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
        let data = {
          enterpriseId: this.formData.enterpriseId,
          name: this.formData.name,
          mn: this.formData.mn,
          groupId: this.formData.groupId,
          latitude: this.formData.latitude,
          longitude: this.formData.longitude,
          type: this.formData.type,
          transferType: this.formData.transferType,
          protocolType: this.formData.protocolType,
          address: this.formData.address
        };
        if (this.modelData.type == "edit") {
          data.id = this.formData.id;
          data.isStarted = this.formData.isStarted;
          this.$api.customer
            .editStation(data)
            .then(res => {
              if (res.data.state == 0) {
                this.$message.success("编辑成功");
                this.$emit("refresh");
                this.handleCancel();
              }
            })
            .catch(() => {
              this.handleCancel();
            });
        } else {
          data.isStarted = 1;
          this.$api.customer
            .addStation(data)
            .then(res => {
              if (res.data.state == 0) {
                this.$message.success("新建成功");
                this.$emit("refresh");
                this.handleCancel();
              }
            })
            .catch(() => {
              this.handleCancel();
            });
        }
      });
    },
    handleCancel() {
      this.modelData.show = false;
      this.$refs.ruleForm.resetFields();
    },
    getEditData() {
      this.$api.customer
        .getStationById({ id: this.modelData.row.id })
        .then(res => {
          if (res.data.state == 0) {
            let result = res.data.data;
            this.formData = result;
            if (result.longitude != null && result.latitude != null)
              this.formData.lngandlat =
                result.longitude + "," + result.latitude;
          }
        });
    },
    enterpriseOptions() {
      this.$api.common.selectEnterprise().then(res => {
        this.enterpriseList = res.data.data;
      });
    },
    //经纬度
    onLnglat() {
      this.mapModel.show = true;
      this.mapModel.address = this.formData.address;
      if (this.formData.lngandlat) {
        this.mapModel.lnglat = this.formData.lngandlat.split(",");
      } else {
        this.mapModel.lnglat = [];
      }
    },
    getModal(data) {
      this.formData.address = data.address;
      this.formData.longitude = data.lnglat[0];
      this.formData.latitude = data.lnglat[1];
      this.formData.lngandlat = data.lnglat.join(",");
      this.$forceUpdate();
    },
    getGroup() {
      this.$api.common.selectGroup().then(res => {
        if (res.data.state == 0) {
          this.groupOptions = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.isDisabled = false;
    if (this.$route.query.id) {
      this.formData.enterpriseId = this.$route.query.id;
      this.isDisabled = true;
    }
  },
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.enterpriseOptions();
        this.getGroup();
        if (this.value.type == "edit") {
          this.title = "编辑";
          this.getEditData();
        } else {
          this.title = "新建";
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
