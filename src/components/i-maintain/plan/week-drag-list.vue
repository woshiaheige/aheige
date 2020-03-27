<template>
  <div class="week-drag-list">
    <div
      v-for="(item, index) of list"
      :key="index"
      class="list-group"
      :class="{ 'empty-list': item.list.length === 0 }"
    >
      <div class="list-group-item">
        {{ item.week }}
        <a-tag v-margin:left="10" color="#87d068">{{ item.list.length }}</a-tag>
      </div>
      <draggable :list="item.list" group="people" @change="log">
        <div
          class="list-group-item"
          :title="element.name"
          v-for="(element, key) in item.list"
          :key="key"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "plan",
  props: {
    list: {
      default: function() {
        return [];
      },
      required: true
    }
  },
  components: {
    draggable
  },
  methods: {
    log(e) {
      console.log(e);
    }
  }
};
</script>
