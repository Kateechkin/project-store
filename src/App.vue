<template>
  <div id="app">
    <div class="app-flex">
      <TopBar v-if="$route.meta.Auth" />
      <div class="index-content md-large">
        <div class="md-layout md-gutter" v-if="$route.meta.Auth">
          <div class="md-layout-item first-block">
            <Comment />
          </div>
          <div class="md-layout-item second-block">
            <ListBranch />
          </div>
        </div>
        <router-view />
      </div>
    </div>
    <ContentFooter />
  </div>
</template>
<script>
import TopBar from "@/components/TopBar";
import Comment from "@/components/Comment";
import ListBranch from "@/components/List-branch";
import ContentFooter from "@/components/ContentFooter.vue";
export default {
  name: "App",
  components: { TopBar, Comment, ListBranch, ContentFooter },
};
</script>
<style lang="scss">
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
