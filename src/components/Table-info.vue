<template>
  <div>
    <div class="md-layout" style="min-height: 48px;">
      <div class="md-layout-item button-order">
        <router-link
          :to="{
            name: 'order',
          }"
        >
          <md-button
            class="md-raised md-primary"
            v-if="selected.length"
            @click="OrderBy()"
            >Добавить в заказ</md-button
          >
        </router-link>
        <router-link
          :to="{
            name: 'order',
          }"
        >
          <md-button class="md-raised md-primary" v-if="storage.length"
            >Вернуться к заказу</md-button
          >
        </router-link>
      </div>
    </div>

    <div class="container-loader" v-if="isLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
      <div class="circle circle-4"></div>
      <div class="circle circle-5"></div>
    </div>
    <md-card class="marginTable" v-if="this.companieItem">
      <!-- v-for="companieItem in this.companieItem" :key="companieItem.id" -->
      <md-card-header data-background-color="blue">
        <h4 class="title">{{ this.companieItem.company_title }}</h4>
      </md-card-header>
      <md-table
        :value="this.companieItem.product_data"
        md-sort="product_title"
        md-sort-order="desc"
      >
        <md-table-row>
          <md-table-head
            class="text-left table-head-background"
            @click="checkAll()"
            v-model="isCheckAll"
          >
            <div class="checkbox toggleButtonMargin">
              <input
                type="checkbox"
                id="checkbox_1"
                @click="checkAll()"
                v-model="isCheckAll"
              />
              <label for="checkbox_1"></label>
            </div>
          </md-table-head>
          <md-table-head
            class="text-left table-head-background"
            style="width: 45%"
            sortBy="product_title"
            label="Название ТМЦ"
          ></md-table-head>
          <md-table-head
            class="text-left table-head-background"
            sortBy="amount"
            label="Количество на складе в ед.списания"
          ></md-table-head>
          <md-table-head
            class="text-left table-head-background"
            sortBy="avg_consumption"
            label="Средний расход в день"
          ></md-table-head>
          <md-table-head
            class="text-left table-head-background"
            sortBy="days_left"
            md-sort-by="days_left"
            label="Когда закончится"
          ></md-table-head>
          <md-table-head
            class="text-left table-head-background"
            sortBy="for_order"
            label="Необходимо заказать на 30 дней"
          ></md-table-head>
          <md-table-head
            class="text-left table-head-background"
            label="Критическая цена за ед.списания"
          ></md-table-head>
        </md-table-row>
        <TableInfoItem
          v-for="(item, index) in this.companieItem.product_data"
          :key="index"
          :storage_item="item"
          :idx="index"
          @onSelect="onSelect"
          v-model="selected"
        />
      </md-table>
    </md-card>
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/storage";
import TableInfoItem from "@/components/Table-info-item";
import { mapState } from "vuex";

export default {
  name: "AppTableMultiple",
  data: () => ({
    selected: [],
    isCheckAll: false,
    //  :md-sort.sync="currentSort"
    //       :md-sort-order.sync="currentSortOrder"
    // currentSort: "product_title",
    // currentSortOrder: "asc",
    isPrice: "",
  }),
  props: {
    tableHeaderColor: {
      type: String,
      default: "",
    },
  },

  components: {
    TableInfoItem,
  },
  computed: {
    ...mapState({
      // companieItem: (state) => state.storage.companieItem,
      storage: (state) => state.storage.storage,
      isLoading: (state) => state.storage.isLoading,
    }),
    companieItem() {
      return this.$store.state.storage.companieItem;
    },
  },

  methods: {
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selected = [];
      if (this.isCheckAll) {
        this.companieItem.product_data.forEach((company) => {
          this.selected.push(company);
        });
      }
    },
    watchs() {
      this.selected = [];
      this.companieItem.product_data.forEach((itemId) => {
        this.storage.forEach((itemIdExample) => {
          itemId.product_title === itemIdExample.product_title &&
          itemId.company_title === itemIdExample.company_title
            ? this.selected.push(itemIdExample)
            : "";
        });
      });
    },

    onSelect() {
      this.$store
        .dispatch(actionTypes.getCompanieItem, this.companieItem.company_id)
        .then(() => {
          // console.log("Таблица по ID", resp);
        })
        .catch((er) => {
          console.log("Ошибка", er);
        });
    },
    OrderBy() {
      this.selected.forEach((selected) =>
        this.$store.dispatch(actionTypes.addToStorage, {
          amount: selected.amount,
          avg_consumption: selected.avg_consumption,
          company_id: selected.company_id,
          company_title: selected.company_title,
          critical: selected.critical,
          days_left: selected.days_left,
          for_order: selected.for_order,
          product_title: selected.product_title,
          unit: selected.unit,
        })
      );
    },

    getAlternateLabel(count) {
      let plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} product ${plural} selected`;
    },
  },
  watch: {
    companieItem() {
      if (this.companieItem != null) {
        this.watchs();
      }
    },
  },
  mounted() {
    if (this.companieItem != null) {
      this.watchs();
    }
  },
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
.md-app-container {
  overflow: initial !important;
}
</style>
