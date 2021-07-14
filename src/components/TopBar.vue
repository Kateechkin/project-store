<template>
  <md-toolbar
    class="md-primary"
    md-elevation="0"
    :data-color="sidebarItemColor"
  >
    <!-- <md-app-toolbar
      class="md-primary"
      md-elevation="0"
      :data-color="sidebarItemColor"
    > -->
    <!-- <md-button
          class="md-icon-button"
          @click="toggleMenu"
          v-if="!menuVisible"
        >
          <md-icon>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="grip-lines"
              class="svg-inline--fa fa-grip-lines fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M496 288H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-128H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16z"
              ></path></svg
          ></md-icon>
        </md-button> -->
    <div class="topbar">
      <div class="toopbar__title">
        <router-link
          :to="{
            name: 'home',
          }"
        >
          <span class="md-title title">Storage</span>
        </router-link>
      </div>
      <div class="topbar__settings">
        <div class="topbar__click" @click="exit">
          <md-icon
            ><svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="sign-out-alt"
              class="svg-inline--fa fa-sign-out-alt fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="white"
                d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
              ></path></svg
          ></md-icon>
          <span class="md-title" style="cursor: pointer">Выход</span>
        </div>
        <div class="topbar__click" v-for="role in role" :key="role">
          <md-icon
            ><svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="user"
              class="svg-inline--fa fa-user fa-w-14"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="white"
                d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
              ></path></svg
          ></md-icon>

          <span class="md-title" v-if="role === 'ROLE_ADMIN'"
            >Администратор</span
          >
          <span class="md-title" v-if="role === 'ROLE_MODERATOR'"
            >Модератор</span
          >
        </div>
      </div>
    </div>
  </md-toolbar>

  <!-- <md-app-drawer
        :md-active.sync="menuVisible"
        md-persistent="mini"
        :data-color="sidebarItemColor"
      >
        <md-toolbar class="md-transparent md-primary" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon class="svg-close"
                ><svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="arrow-left"
                  class="svg-inline--fa fa-arrow-left fa-w-14 "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="black"
                    d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
                  ></path></svg
              ></md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon
              ><svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                class="svg-inline--fa fa-caret-down fa-w-10"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path></svg
            ></md-icon>

            <p class="md-list-item-text menu-text">Inbox</p>
          </md-list-item>

          <md-list-item>
            <md-icon
              ><svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                class="svg-inline--fa fa-caret-down fa-w-10"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path></svg
            ></md-icon>

            <p class="md-list-item-text">Sent Mail</p>
          </md-list-item>

          <md-list-item>
            <md-icon
              ><svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                class="svg-inline--fa fa-caret-down fa-w-10"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path></svg
            ></md-icon>

            <p class="md-list-item-text">Trash</p>
          </md-list-item>

          <md-list-item>
            <md-icon
              ><svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                class="svg-inline--fa fa-caret-down fa-w-10"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path></svg
            ></md-icon>

            <p class="md-list-item-text">Spam</p>
          </md-list-item>
        </md-list>
      </md-app-drawer> -->
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/auth";
export default {
  name: "AppTopBar",
  data() {
    return {
      menuVisible: false,
    };
  },
  computed: {
    ...mapState({
      role: (state) => state.auth.role,
      // companieItem: (state) => state.storage.companieItem,
    }),
  },

  props: {
    sidebarItemColor: {
      type: String,
      default: "green",
    },
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
};
</script>

<style></style>
