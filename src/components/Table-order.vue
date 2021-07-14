<template>
  <div>
    <md-table v-model="storage" md-card @md-selected="onSelect">
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="multiple"
        md-auto-select
      >
        <md-table-cell
          md-label="Название филиала"
          md-sort-by="name"
          class="text-left"
          >{{ item.name }}</md-table-cell
        >
        <md-table-cell
          md-label="Название ТМЦ"
          md-sort-by="email"
          class="text-left"
          >{{ item.email }}</md-table-cell
        >
        <md-table-cell md-label="Количество" md-sort-by="gender" class="left">
          <TableOrderItem v-on:userchange="changeCount" />
          <!-- v-for="item in this.storage"
            :key="item.id"
            :storage_item="item" -->
        </md-table-cell>
        <md-table-cell
          md-label="Стоимость позиции"
          md-sort-by="gender"
          class="left"
        >
          <ItemCost v-on:userChangeCost="changeCost" />
        </md-table-cell>
        <md-table-cell
          md-label="Стоимость единицы списания"
          md-sort-by="title"
          class="text-left"
        >
          ₽</md-table-cell
        >
      </md-table-row>
    </md-table>
    <!-- {{ countUtin }} -->

    <p>Selected:</p>
    {{ selectedNew }}
    count: {{ this.count }} cost: {{ this.cost }}
  </div>
</template>

<script>
import { mapState } from "vuex";
import TableOrderItem from "@/components/Table-order-item";
import ItemCost from "@/components/ItemCost";
export default {
  components: { TableOrderItem, ItemCost },
  name: "AppTableOrder",
  data: () => ({
    selectedNew: [],
    count: "",
    cost: "",
  }),
  computed: {
    countUtin() {
      return Number(this.count) / Number(this.cost);
    },
    ...mapState({
      storage: (state) => state.storage.storage,
    }),
  },
  methods: {
    changeCount(value) {
      this.count = value;
    },
    changeCost(value) {
      this.cost = value;
    },
    onSelect(items) {
      this.selectedNew = items;
      if (this.number)
        this.selectedNew.push({
          cost: this.number,
        });
    },
    getAlternateLabel(count) {
      let plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} user${plural} selected`;
    },
  },
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
</style>
