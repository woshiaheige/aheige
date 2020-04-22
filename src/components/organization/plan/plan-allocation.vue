<template>
  <div>
    <a-drawer
      title="配置站点运维方案"
      :placement="placement"
      :closable="false"
      @close="onClose"
      :width="1100"
      :visible="visible"
    >
      <a-card :bordered="false">
        <a-form-model ref="form" :model="form" :rules="rules" layout="inline">
          <a-form-model-item label="计划名称" prop="name">
            <a-input v-model="form.name" placeholder="请输入"></a-input>
          </a-form-model-item>
          <a-form-model-item label="运维期限" prop="range">
            <a-range-picker v-model="form.range"></a-range-picker>
          </a-form-model-item>
          <a-form-model-item label="计划类别" prop="type">
            <a-select v-model="form.type">
              <a-select-option :value="1">周计划</a-select-option>
              <a-select-option :value="2">月计划</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="计划日期">
            <a-select v-model="form.date">
              <a-select-option v-for="item in dateList" :key="item.value">{{
                item.name
              }}</a-select-option>
            </a-select>
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
        />
        <a-divider></a-divider>
        <a-button type="primary">配置方案</a-button>
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
        group: 1,
        type: 1,
        date: 1
      },
      schemeList: []
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.getScheme();
      }
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
          { name: "星期日", value: 7 }
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
    // onChange(e) {
    //   this.placement = e.target.value;
    // }
    getScheme() {
      let data = {
        type: this.stationType
      };
      this.$api.maintain.getScheme(data).then(res => {
        res.data.data.forEach(item => {
          this.schemeList.push({
            key: item.id,
            title: `${item.name}`,
            description: item.type == 1 ? "周计划" : "月计划"
          });
        });

        console.log(this.schemeList);
      });
    }
  }
};
</script>
