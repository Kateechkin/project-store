<template>
  <md-table-row :class="currentColor">
    <md-table-cell class="text-left">
      <div class="checkbox">
        <input
          type="checkbox"
          :id="idx"
          :value="storage_item"
          v-model="selected"
          @change="onChange()"
        />
        <label :for="idx"></label>
      </div>
    </md-table-cell>
    <md-table-cell class="text-left">{{
      storage_item.product_title
    }}</md-table-cell>
    <md-table-cell class="text-left"
      >{{ storage_item.amount }} {{ storage_item.unit }}</md-table-cell
    >
    <md-table-cell class="text-left"
      >{{ storage_item.avg_consumption }} {{ storage_item.unit }}</md-table-cell
    >
    <md-table-cell class="text-left">{{
      storage_item.days_left
    }}</md-table-cell>
    <md-table-cell class="text-left"
      >{{ storage_item.for_order }} {{ storage_item.unit }}</md-table-cell
    >
    <md-table-cell class="text-left" v-if="this.edit === false"
      ><div class="table-item-edit" v-for="role in this.role" :key="role">
        <span>{{ storage_item.critical }}P</span>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="edit"
          class="svg-inline--fa fa-edit fa-w-18"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          v-if="role === 'ROLE_ADMIN'"
          @click="editItem"
        >
          <path
            fill="currentColor"
            d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
          ></path>
        </svg>
      </div>
    </md-table-cell>
    <md-table-cell class="text-left" v-if="this.edit === true">
      <form @submit.prevent="validateUser" class="form-table-edit">
        <md-field style="width: 40%">
          <md-input
            name="critical"
            style="width: 40%"
            v-bind:value="storage_item.critical"
          ></md-input>
        </md-field>
        <div class="table-item-edit">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check"
            class="svg-inline--fa fa-check fa-w-16 table-item-edit__check"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            @click="putAxios()"
          >
            <path
              fill="green"
              d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
            ></path>
          </svg>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            class="svg-inline--fa fa-times fa-w-11"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
            @click="editItem"
          >
            <path
              fill="red"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </div>
      </form>
    </md-table-cell>
  </md-table-row>
</template>

<script>
import { actionTypes } from "@/store/modules/storage";
import { mapState } from "vuex";

// import { actionTypesAuth } from "@/store/modules/auth";
export default {
  name: "AppTableItem",
  data() {
    return {
      checkedP: false,
      edit: false,
      newcritical: [],
      // criticals: "",
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
      type: Array,
      default() {
        return {};
      },
    },
    currentSort: {
      type: Object,
      default() {
        return {};
      },
    },
    currentSortOrder: {
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
    selected: {
      get() {
        return this.value;
      },
      set(val) {
        this.checkedP = val;
      },
    },
    currentColor() {
      return {
        "tr-danger": this.storage_item.days_left <= 5 ? true : false,
        "tr-success": this.storage_item.days_left > 10 ? true : false,
        "tr-info":
          this.storage_item.days_left >= 6 && this.storage_item.days_left <= 10
            ? true
            : false,
      };
      //  "tr-info": 6 < this.storage_item.days_left < 10 ? true : false,
    },
    ...mapState({
      role: (state) => state.auth.role,
      // companieItem: (state) => state.storage.companieItem,
    }),
  },
  methods: {
    onChange() {
      this.$emit("input", this.checkedP);
    },

    editItem() {
      this.edit = !this.edit;
    },
    putAxios() {
      console.log("Меняем");
      const forms = document.forms;
      const formData = new FormData(forms[1]);
      this.newcritical = [];
      for (let [name, value] of formData) {
        this.newcritical = { ...this.newcritical, [name]: value };
        console.log(this.newcritical);
        console.log(`${name}: ${value}`);
      }
      this.$store
        .dispatch(actionTypes.putCompanieItem, {
          amount: this.storage_item.amount,
          avg_consumption: this.storage_item.avg_consumption,
          critical: Number(this.newcritical.critical),
          days_left: this.storage_item.days_left,
          for_order: this.storage_item.for_order,
          // id: this.storage_item.id,
          company_id: this.storage_item.company_id,
          product_title: this.storage_item.product_title,
          unit: this.storage_item.unit,
        })
        .then(() => {
          console.log("Put");
          this.$emit("onSelect");
          this.edit = !this.edit;
        })
        .catch((er) => {
          console.log("Ошибка", er);
        });
    },
  },
};
</script>

<style>
.td-danger {
  color: #f44336;
}
.td-success {
  color: #4caf50;
}
.tr-danger {
  background: rgba(244, 67, 54, 0.1);
}
.tr-success {
  background: rgb(76, 175, 80, 0.1);
}
.tr-info {
  background: rgb(254, 142, 60, 0.2);
}
</style>
