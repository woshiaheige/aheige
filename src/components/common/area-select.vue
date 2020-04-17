<template>
  <a-cascader
    :value="regionName"
    :options="options"
    :displayRender="displayRender"
    expandTrigger="hover"
    @change="onChange"
    placeholder="所属区域"
    allowClear
  />
</template>
<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      options: [],
      regionName: []
    };
  },
  computed: {
    regionId: {
      get() {
        return this.value;
      },
      set() {}
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.common.getTreeByName().then(res => {
        if (res.data.state == 0) {
          this.options = res.data.data;
        }
      });
    },
    onChange(value) {
      if (value.length > 0) {
        console.log(value);
        this.regionName = JSON.parse(JSON.stringify(value));
        this.regionId = this.regionName[this.regionName.length - 1];
      } else {
        this.regionId = "";
        this.regionName = [];
      }
      console.log(this.regionId);
    },
    displayRender({ labels }) {
      return labels[labels.length - 1];
    }
  }
};
</script>
