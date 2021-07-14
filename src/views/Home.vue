<template>
  <div class="page-container">
    <!-- <div class="index-content md-large">
      <div class="md-layout md-gutter">
        <div class="md-layout-item first-block">
          <Comment />
        </div>
        <div class="md-layout-item second-block">
          <ListBranch />
        </div>
      </div> -->
    <Table-info />
    <!-- <ContentFooter /> -->
    <!-- </div> -->
  </div>
</template>

<script>
// import Comment from "@/components/Comment";
// import ListBranch from "@/components/List-branch";
import { actionTypes } from "@/store/modules/auth";
import TableInfo from "@/components/Table-info";
// import ContentFooter from "@/components/ContentFooter.vue";
import { mapState } from "vuex";
// import axios from "@/api/axios";
export default {
  name: "PersistentMini",
  data() {
    return {
      menuVisible: false,
      TOKEN:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJFZ29yIiwiaWF0IjoxNjE5NjMxMDk5LCJleHAiOjE3MDYwMzEwOTl9.QisU1shBzL1ggxIc7lLTYc_Qi7JUHA_CeO6EgJRg6l9vJ-DjCNOGIPXp-YbZ49SRdx5SR5sszEdHulHRTT_ltQ",
    };
  },
  props: {
    sidebarItemColor: {
      type: String,
      default: "green",
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      companies: (state) => state.storage.companies,
    }),
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    exit() {
      this.$store
        .dispatch(actionTypes.exitLogin)
        .then(() => {})
        .catch((er) => {
          console.log("Ошибка", er);
        });
    },
  },
  components: {
    // ListBranch,
    TableInfo,
    // Comment,
    // ContentFooter,
  },
  mounted() {
    this.$store
      .dispatch(actionTypes.getCurrentUser)
      .then(() => {})
      .catch((er) => {
        console.log("Ошибка", er);
      });
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
