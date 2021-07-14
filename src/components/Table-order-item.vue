<template>
  <md-field>
    <md-input v-model="count" v-on:input="onUserChange"> </md-input>
  </md-field>
</template>

<script>
export default {
  name: "InputCount",
  data() {
    return {
      selectedNew: [],
      count: "10",
      // cost: "10",
    };
  },
  //   props: {
  //     storage_item: {
  //       type: Object,
  //       default() {
  //         return {};
  //       },
  //     },
  //   },
  methods: {
    onUserChange() {
      this.$emit("userchange", this.count);
    },
    onSelect(items) {
      this.selectedNew = items;
    },
  },
};
</script>

<style></style>
