<template>
  <div>
    <a-drawer
      :title="title"
      placement="right"
      @close="onClose"
      :width="1150"
      :visible="visible"
    >
      <a-card :bordered="false">
        <a-form-model ref="form" :model="form" :rules="rules" layout="inline">
          <a-form-model-item label="计划类别" prop="type">
            <a-select
              v-model="form.type"
              @change="handleChangeType"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option :value="1">周计划</a-select-option>
              <a-select-option :value="2">月计划</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="计划日期">
            <a-select
              v-model="form.date"
              v-width="80"
              showSearch
              :filterOption="filterOptions"
            >
              <a-select-option v-for="item in dateList" :key="item.value">{{
                item.name
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="计划名称" prop="name">
            <a-input v-model="form.name" placeholder="请输入"></a-input>
          </a-form-model-item>
          <a-form-model-item label="运维期限" prop="range">
            <a-range-picker
              v-model="form.range"
              :disabledDate="disabledDate"
              :showTime="false"
            ></a-range-picker>
          </a-form-model-item>
        </a-form-model>
        <a-divider></a-divider>
        <a-transfer
          :dataSource="schemeList"
          :render="item => item.title + '(' + item.description + ')'"
          :titles="['所有方案', '已配置方案']"
          :listStyle="{
            width: '300px',
            height: '300px'
          }"
          :targetKeys="targetKeys"
          :selectedKeys="selectedKeys"
          @change="handleChange"
          @selectChange="handleSelectChange"
        />
        <a-divider></a-divider>
        <a-button type="primary" @click="handleOk">{{ okText }}</a-button>
      </a-card>
    </a-drawer>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      required: true,
      type: Boolean
    },
    stationId: {
      required: true
    },
    stationType: {
      required: true
    },
    planDetail: {
      required: false
    }
  },
  data() {
    return {
      form: {
        name: "",
        range: [],
        type: 1,
        date: 0
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入计划名称",
            trigger: "blur"
          }
        ],
        range: [
          {
            required: true,
            message: "请输入运维期限",
            trigger: "change"
          }
        ]
      },
      schemeList: [],
      targetKeys: [],
      selectedKeys: []
    };
  },
  watch: {
    async visible(newVal) {
      if (newVal) {
        this.targetKeys = [];
        if (this.planDetail.id) {
          this.form = {
            name: this.planDetail.name,
            range: [
              this.$moment(this.planDetail.gmtBegin),
              this.$moment(this.planDetail.gmtEnd)
            ],
            type: this.planDetail.type,
            date: this.planDetail.programmes[0].planDay
          };
          await this.getScheme();
          this.planDetail.programmes.forEach(item => {
            this.targetKeys.push(item.id);
          });
        } else {
          await this.getScheme();
        }
      }
    },
    targetKeys(newVal) {
      console.log(newVal);
    }
  },
  computed: {
    dateList() {
      if (this.form.type == 1) {
        return [
          { name: "星期一", value: 1 },
          { name: "星期二", value: 2 },
          { name: "星期三", value: 3 },
          { name: "星期四", value: 4 },
          { name: "星期五", value: 5 },
          { name: "星期六", value: 6 },
          { name: "星期日", value: 0 }
        ];
      } else {
        let arr = [];
        for (let i = 1; i <= 31; i++) {
          arr.push({
            name: i + "号",
            value: i
          });
        }
        return arr;
      }
    },
    title() {
      if (this.planDetail.id) {
        return "修改站点运维计划";
      } else {
        return "配置站点运维计划";
      }
    },
    okText() {
      if (this.planDetail.id) {
        return "修改计划";
      } else {
        return "配置计划";
      }
    }
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
      this.$refs.form.resetFields();
    },
    disabledDate(current) {
      return current && current < this.$moment().endOf("day");
    },
    handleOk() {
      if (this.targetKeys.length <= 0) {
        this.$message.warning("请选择方案");
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.planDetail.id) {
              this.editPlan();
            } else {
              this.addPlan();
            }
          }
        });
      }
    },
    async getScheme() {
      let data = {
        maintainType: this.stationType
      };
      this.schemeList = [];
      await this.$api.maintain.getScheme(data).then(res => {
        res.data.data.forEach(item => {
          if (this.form.type == item.type) {
            this.schemeList.push({
              key: item.id,
              title: `${item.name}`,
              description: item.type == 1 ? "周计划" : "月计划"
            });
          }
        });
      });
    },
    handleChange(nextTargetKeys) {
      this.targetKeys = nextTargetKeys;
    },
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    },
    handleChangeType(value) {
      this.selectedKeys = [];
      this.getScheme();
      if (value == 1) {
        this.form.date = 0;
      } else if (value == 2) {
        this.form.date = 1;
      }
    },
    addPlan() {
      let planArr = [];

      this.targetKeys.forEach(item => {
        planArr.push({
          planDay: this.form.date,
          programmeId: item
        });
      });

      let data = {
        gmtBegin: this.$moment(this.form.range[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        gmtEnd: this.$moment(this.form.range[1]).format("YYYY-MM-DD HH:mm:ss"),
        name: this.form.name,
        pointId: this.stationId,
        planPoints: planArr,
        type: this.form.type
      };

      this.$api.maintain.addPlan(data).then(res => {
        if (res.data.state == 0) {
          this.$message.success("配置成功");
          this.$emit("check", this.stationId);
          this.onClose();
        }
      });
    },
    editPlan() {
      let planArr = [];

      this.targetKeys.forEach(item => {
        planArr.push({
          planDay: this.form.date,
          programmeId: item
        });
      });

      let data = {
        id: this.planDetail.id,
        gmtBegin: this.$moment(this.form.range[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        planPointId: this.planDetail.planPointId,
        gmtEnd: this.$moment(this.form.range[1]).format("YYYY-MM-DD HH:mm:ss"),
        name: this.form.name,
        pointId: this.stationId,
        planPoints: planArr,
        type: this.form.type
      };

      this.$api.maintain.addPlan(data).then(res => {
        if (res.data.state == 0) {
          this.$message.success("修改成功");
          this.$emit("check", this.stationId);
          this.onClose();
        }
      });
    }
  }
};
</script>
