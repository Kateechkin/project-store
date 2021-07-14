<template>
  <md-table-row>
    <md-table-cell class="text-left"
      ><label class="toggleButton">
        <input
          type="checkbox"
          :value="storage_item"
          @click="onChange(storage_item)"
        />
        <div>
          <svg viewBox="0 0 44 44">
            <path
              d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758"
              transform="translate(-2.000000, -2.000000)"
            ></path>
          </svg>
        </div>
      </label>
    </md-table-cell>
    <md-table-cell class="text-left">{{
      storage_item.company_title
    }}</md-table-cell>
    <md-table-cell class="text-left">{{
      storage_item.product_title
    }}</md-table-cell>
    <md-table-cell class="text-left"
      ><md-field> <md-input v-model="count"> </md-input> </md-field
    ></md-table-cell>
    <md-table-cell class="text-left"
      ><md-field> <md-input v-model="cost"> </md-input> </md-field
    ></md-table-cell>
    <md-table-cell class="text-left">{{ countUtin }} </md-table-cell>
  </md-table-row>
</template>

<script>
export default {
  name: "ItemTable",
  data() {
    return {
      checkedP: false,
      count: "",
      cost: "",
    };
  },
  props: {
    storage_item: {
      type: Object,
      default() {
        return {};
      },
    },
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    idx: {
      type: Number,
      default() {
        return {};
      },
    },
  },
  computed: {
    countUtin() {
      return this.count.length && this.cost.length
        ? Number(this.count) / Number(this.cost)
        : 1;
    },
    checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.checkedP = val;
      },
    },
    Finish() {
      return this.count.length && this.cost.length ? true : false;
    },
    isCritical() {
      return this.countUtin >= this.storage_item.critical ? true : false;
    },
  },
  methods: {
    onChange() {
      this.$emit("deleteStorage");
    },
  },
  watch: {
    isCritical() {
      this.$emit("isCritical", {
        index: this.idx,
        critical: this.isCritical,
        count: this.count,
        cost: this.cost,
      });
    },
  },
  mounted() {
    //анимация checkbox
    var toggle = document.querySelector(".toggleButton input");
    var animate = setInterval(() => {
      toggle.checked = !toggle.checked;
    }, 3000);

    document.querySelector("body").addEventListener("click", () => {
      clearInterval(animate);
    });
  },
};
</script>

<style></style>
