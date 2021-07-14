<template>
  <md-field>
    <md-input v-model="cost" v-on:input="onUserChange"> </md-input>
  </md-field>
</template>

<script>
export default {
  name: "InputCount",
  data() {
    return {
      cost: "10",
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
      this.$emit("userChangeCost", this.cost);
    },
    onSelect(items) {
      this.selectedNew = items;
    },
  },
};
</script>

<style></style>
