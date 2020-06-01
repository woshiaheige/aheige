<template>
  <a-modal
    :title="modelData.type == 'out' ? '出库' : '入库'"
    :visible="modelData.show"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
    :maskClosable="false"
  >
    <a-form-model
      ref="formData"
      :validateOnRuleChange="true"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-model-item label="物品名称" prop="goodsId">
        <a-select
          placeholder="物品名称"
          @change="changeName"
          v-model="formData.goodsId"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="item in goodsOptions"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        v-if="modelData.type == 'out'"
        label="企业"
        prop="enterpriseId"
      >
        <a-select
          v-model="formData.enterpriseId"
          placeholder="企业"
          showSearch
          :filterOption="filterOptions"
          @change="changeEnterprise"
        >
          <a-select-option
            v-for="(item, index) in companyOptions"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        v-if="modelData.type == 'out'"
        label="站点"
        prop="pointId"
      >
        <a-select
          v-model="formData.pointId"
          placeholder="站点"
          showSearch
          :filterOption="filterOptions"
          @change="changeStation"
        >
          <a-select-option
            v-for="(item, index) in stationOptions"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        v-if="modelData.type == 'out'"
        label="设备"
        prop="devId"
      >
        <a-select
          v-model="formData.devId"
          placeholder="设备"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="(item, index) in deviceOptions"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        v-if="modelData.type == 'out'"
        label="领用人"
        prop="receiverUserId"
      >
        <a-select
          v-model="formData.receiverUserId"
          placeholder="领用人"
          showSearch
          :filterOption="filterOptions"
        >
          <a-select-option
            v-for="(item, index) in userOptions"
            :key="index"
            :value="item.id"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="库存余量" prop="goodsCount">
        <a-input placeholder="库存余量" v-model="list.goodsCount" disabled />
      </a-form-model-item>
      <a-form-model-item label="库存单位" prop="unit">
        <a-input placeholder="库存单位" v-model="list.unit" disabled />
      </a-form-model-item>
      <a-form-model-item
        :label="modelData.type == 'in' ? '入库数量' : '出库数量'"
        prop="stockCount"
      >
        <a-input-number
          placeholder="数量"
          v-model="formData.stockCount"
          v-width="350"
        />
      </a-form-model-item>
      <a-form-model-item label="备注" prop="remark">
        <a-input
          placeholder="备注"
          type="textarea"
          :maxLength="300"
          v-model="formData.remark"
        />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" v-preventReClick @click="handleOk">
        保存
      </a-button>
    </template>
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
    let that = this;
    const validateNumber = (rule, value, callback) => {
      if (
        that.modelData.type == "out" &&
        Number(value) > Number(that.list.goodsCount)
      ) {
        callback("库存不足");
      } else if (!/^[1-9]\d*$/.test(value)) {
        callback("请输入正整数");
      } else if (value > 99999999) {
        callback("最多只能输入8位数");
      } else {
        callback();
      }
    };
    return {
      companyOptions: [],
      deviceOptions: [],
      stationOptions: [],
      goodsOptions: [],
      userOptions: [],
      formData: {
        goodsId: undefined,
        enterpriseId: undefined,
        pointId: undefined,
        devId: undefined,
        receiverUserId: undefined,
        stockCount: "",
        remark: ""
      },
      list: {},
      rules: {
        goodsId: [
          {
            required: true,
            message: "请选择物品",
            trigger: "change"
          }
        ],
        stockCount: [
          {
            required: true,
            message: "请输入数量",
            trigger: "blur"
          },
          { validator: validateNumber, trigger: "blur" }
        ],
        enterpriseId: [
          {
            required: true,
            message: "请选择企业",
            trigger: "change"
          }
        ],
        pointId: [
          {
            required: true,
            message: "请选择站点",
            trigger: "change"
          }
        ],
        receiverUserId: [
          {
            required: true,
            message: "请选择领用人",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    modelData() {
      return this.value;
    }
  },
  mounted() {},
  methods: {
    handleOk() {
      this.$refs.formData.validate(valid => {
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
        //验证通过
        this.formData.type = this.modelData.type == "out" ? 1 : 2;
        this.$api.product
          .addStock(this.formData)
          .then(res => {
            if (res.data.state == 0) {
              this.$message.success(
                this.modelData.type == "out" ? "出库成功" : "入库成功"
              );
              this.$emit("refresh");
              this.handleCancel();
            }
          })
          .catch(() => {
            this.handleCancel();
          });
      });
    },
    handleCancel() {
      this.modelData.show = false;
      this.$refs.formData.resetFields();
    },
    getSelect() {
      this.$api.product.getGoodsSelect().then(res => {
        this.goodsOptions = res.data.data;
      });
    },
    changeName(value) {
      console.log(value);
      this.goodsOptions.forEach(item => {
        if (item.id == value) {
          this.list = item;
        }
      });
    },
    //企业下拉
    getCompany() {
      this.$api.common.selectEnterprise().then(res => {
        if (res.data.state == 0) {
          this.companyOptions = res.data.data;
        }
      });
    },
    changeEnterprise(value) {
      this.formData.pointId = undefined;
      this.getStation(value);
    },
    //站点下拉
    getStation(value) {
      this.stationOptions = [];
      this.$api.common
        .selectStationByEnterpriseId({ enterpriseId: value })
        .then(res => {
          if (res.data.state == 0) {
            this.stationOptions = res.data.data;
          }
        });
    },
    changeStation(value) {
      this.formData.devId = undefined;
      this.getDevice(value);
    },
    //设备下拉
    getDevice(value) {
      this.deviceOptions = [];
      this.$api.common
        .selectStationByStationId({
          cusPointId: value
        })
        .then(res => {
          if (res.data.state == 0) {
            let result = res.data.data;
            for (var i in result) {
              let temp = {};
              temp.id = result[i].sysInstrument.id;
              temp.name = result[i].sysInstrument.name;
              this.deviceOptions.push(temp);
            }
          }
        });
    },
    //领用人下拉
    getUser() {
      this.$api.common.selectUser().then(res => {
        if (res.data.state == 0) {
          this.userOptions = res.data.data;
        }
      });
    }
  },
  watch: {
    "value.show"() {
      if (this.value.show == true) {
        this.list = {
          goodsCount: "",
          unit: ""
        };
        this.stationOptions = [];
        this.deviceOptions = [];
        this.getSelect();
        if (this.value.type == "out") {
          this.getCompany();
          this.getUser();
        }
      }
    }
  }
};
</script>
<style lang="less" scoped></style>
