<template>
  <div class="page-container">
    <NewTable table-header-color="blue" />
  </div>
</template>

<script>
import NewTable from "@/components/NewTable";
// import TableOrder from "@/components/Table-order";
export default {
  name: "PersistentMini",
  data() {
    return {
      menuVisible: false,
    };
  },
  props: {
    sidebarItemColor: {
      type: String,
      default: "green",
    },
  },
  computed: {},
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
  },
  components: {
    NewTable,
  },
};
</script>

<style lang="scss" scoped>
.md-app {
  min-height: 100vh;
}
// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.md-button {
  background-color: initial !important;
  box-shadow: initial !important;
}
</style>
