<template>
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-100 md-size-70 df">
      <!-- <md-card class="md-medium-size-100 md-size-66"> -->
      <md-card>
        <md-table>
          <md-table-row>
            <md-table-head class="text-left table-head-background">
              <label class="toggleButton toggleButtonMargin">
                <input
                  type="checkbox"
                  @click="checkAll()"
                  v-model="isCheckAll"
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
            </md-table-head>
            <!-- <md-table-head class="text-left">
          <lable
            ><input type="checkbox" @click="checkAll()" v-model="isCheckAll"
          /></lable>
          Выбрать все</md-table-head
        > -->
            <md-table-head
              class="text-left table-head-background"
              style=" width: 20%;"
              >Название филиала</md-table-head
            >
            <md-table-head
              class="text-left table-head-background"
              style=" width: 30%;"
              >Название ТМЦ</md-table-head
            >
            <md-table-head class="text-left table-head-background"
              >Количество</md-table-head
            >
            <md-table-head class="text-left table-head-background"
              >Стоимость позиции</md-table-head
            >
            <md-table-head class="text-left table-head-background"
              >Стоимость единицы списания</md-table-head
            >
          </md-table-row>
          <ItemTable
            ref="itemTable"
            v-for="(item, index) in this.storage"
            :key="index"
            :storage_item="item"
            :idx="index"
            @isCritical="isCritical"
            @deleteStorage="deleteStorageItem(index)"
          />
          <!-- @updateParent="onUpdateSalary" -->
        </md-table>
      </md-card>
      <router-link
        :to="{
          name: 'home',
        }"
        class="btn-margin"
      >
        <md-button class="md-danger md-raised">Назад</md-button>
      </router-link>
    </div>
    <div class="md-layout-item md-medium-size-100 md-size-30">
      <md-field :class="messageClass">
        <label>Прикрепить счёт</label>
        <md-file @md-change="SelectFile($event)" />
        <span class="md-error">There is an error</span>
      </md-field>
      <md-button :class="messageClass" class="md-raised" @click="Checkout()"
        >Заказать
      </md-button>
      <md-field :class="messageTaxearea" v-if="this.critical.length">
        <label>Комментарий к ЗРС</label>
        <md-textarea v-model="textarea" required></md-textarea>
        <span class="md-error">Цена привышает одобренную, потому что</span>
      </md-field>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/storage";

import ItemTable from "@/components/ItemTable";
export default {
  components: { ItemTable },
  name: "AppTableOrder",
  data: () => ({
    //  checked: [],
    selectedNew: [],
    parentSalary: null,
    hasMessages: false,
    score: null,
    textarea: "",
    isCheckAll: false,
    critical: [],
    items: [],
  }),
  computed: {
    ...mapState({
      storage: (state) => state.storage.storage,
      isLoading: (state) => state.storage.isLoading,
    }),

    messageClass() {
      return {
        "md-danger": this.critical.length,
        "md-primary": !this.critical.length,
      };
    },
    messageTaxearea() {
      return {
        "md-invalid": this.critical.length,
      };
    },
  },

  methods: {
    changeCount(value) {
      this.count = value;
    },
    SelectFile(evet) {
      this.score = evet[0];
    },
    changeCost(value) {
      this.cost = value;
    },
    //Выбранный файл
    onSelect(items) {
      this.selectedNew = items;
      if (this.number)
        this.selectedNew.push({
          cost: this.number,
        });
    },
    //Watch из дочерней компоненты для опредления критической цены
    isCritical(data) {
      if (data.critical === true) {
        this.critical.push(data); //Работа с пришедшими данными
      } else {
        this.critical.splice(data.index, 1); //Работа с пришедшими данными
      }
    },

    //Checkbox удалить все
    checkAll() {
      this.$store.dispatch(actionTypes.deleteStorage);
    },
    //Для добавления множественного числа слова
    getAlternateLabel(count) {
      let plural = "";

      if (count > 1) {
        plural = "s";
      }

      return `${count} user${plural} selected`;
    },
    //Отправление заказа
    Checkout() {
      console.log("Отправить заказ");
      this.$refs.itemTable.forEach((element) =>
        this.items.push({
          count: Number(element.count),
          cost: element.cost,
          countUtin: element.countUtin,
          product_data: element.$props.storage_item,
        })
      );

      console.log(this.items);
      let formData = new FormData();
      formData.append("file", this.score);
      formData.append("comment", this.textarea);
      formData.append("product_data", this.items);
      console.log(...formData);
      this.$store
        .dispatch(actionTypes.order, formData)
        .then(() => {
          console.log("Отправил");
          this.$router.push({ name: "home" });
        })
        .catch((er) => {
          console.log("Ошибка", er);
        });
      // this.$store
      //   .dispatch(actionTypesOrder.order, {
      //     comment: this.textarea,
      //     file: this.score,
      //     items: this.items,
      //   })
      //   .then(() => {
      //     console.log("Отправил");
      //   })
      //   .catch((er) => {
      //     console.log("Ошибка", er);
      //   });
    },
    //Удаление отпределенного checkbox по index
    deleteStorageItem(index) {
      this.$store.dispatch(actionTypes.deleteItemToStorage, index);
    },
  },
};
</script>

<style lang="scss" scoped>
.md-table + .md-table {
  margin-top: 16px;
}
.btn-margin {
  margin: 15px 0px 0px 0px;
}
.table-head-background {
  background: #f5f5f5;
}
.df {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
