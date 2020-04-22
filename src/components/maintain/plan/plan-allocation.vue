<template>
  <div>
    <a-drawer
      title="配置站点运维方案"
      :placement="placement"
      :closable="false"
      @close="onClose"
      :width="1150"
      :visible="visible"
    >
      <a-card :bordered="false">
        <a-form-model ref="form" :model="form" :rules="rules" layout="inline">
          <a-form-model-item label="计划类别" prop="type">
            <a-select v-model="form.type">
              <a-select-option :value="1">周计划</a-select-option>
              <a-select-option :value="2">月计划</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="计划日期">
            <a-select v-model="form.date" v-width="80">
              <a-select-option v-for="item in dateList" :key="item.value">{{
                item.name
              }}</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="计划名称" prop="name">
            <a-input v-model="form.name" placeholder="请输入"></a-input>
          </a-form-model-item>
          <a-form-model-item label="运维期限" prop="range">
            <a-range-picker v-model="form.range"></a-range-picker>
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
        <a-button type="primary" @click="handleOk">配置方案</a-button>
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
    }
  },
  data() {
    return {
      placement: "right",
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
    visible(newVal) {
      if (newVal) {
        this.getScheme();
      }
    },
    "form.type"(newVal) {
      this.getScheme();
      if (newVal == 1) {
        this.form.date = 0;
      } else if (newVal == 2) {
        this.form.date = 1;
      }
    }
  },
  computed: {
    dateList() {
      if (this.form.type == 1) {
        return [
          { name: "星期一", value: 0 },
          { name: "星期二", value: 1 },
          { name: "星期三", value: 2 },
          { name: "星期四", value: 3 },
          { name: "星期五", value: 4 },
          { name: "星期六", value: 5 },
          { name: "星期日", value: 6 }
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
    }
  },
  methods: {
    onClose() {
      this.$emit("update:visible", false);
    },
    handleOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
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
            gmtEnd: this.$moment(this.form.range[1]).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            name: this.form.name,
            pointId: this.stationId,
            planPoints: planArr,
            type: this.form.type
          };

          this.$api.maintain.addPlan(data).then(res => {
            if (res.data.state == 0) {
              this.$message.success("配置成功");
              this.onClose();
            }
          });
        }
      });
    },
    getScheme() {
      let data = {
        type: this.stationType
      };
      this.schemeList = [];
      this.$api.maintain.getScheme(data).then(res => {
        res.data.data.forEach(item => {
          if (this.form.type == item.type) {
            this.schemeList.push({
              key: item.id,
              title: `${item.name}`,
              description: item.type == 1 ? "周计划" : "月计划"
            });
          }
        });

        console.log(this.schemeList);
      });
    },
    handleChange(nextTargetKeys) {
      this.targetKeys = nextTargetKeys;
    },
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    }
  }
};
</script>
