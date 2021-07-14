<template>
  <div class="md-comment">
    <form class="form-comment">
      <div class="heigth">
        <md-field class="field-textarea" v-if="this.companieItem">
          <label>Комментарий</label>

          <md-textarea
            v-bind:value="this.companieItem.comment"
            name="comment"
          ></md-textarea>
        </md-field>
        <md-button class="md-raised md-primary" @click="editComment"
          >Изменить</md-button
        >
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/storage";
export default {
  name: "AppComments",
  data() {
    return {
      textarea: "",
    };
  },
  computed: {
    ...mapState({
      companieItem: (state) => state.storage.companieItem,
    }),
  },
  methods: {
    editComment() {
      const forms = document.forms;
      const formData = new FormData(forms[0]);
      this.newprod = [];
      for (let [name, value] of formData) {
        this.newprod = { ...this.newprod, [name]: value };
        console.log(this.newprod);
        console.log(`${name}: ${value}`);
      }

      this.$store
        .dispatch(actionTypes.putComment, {
          company_id: this.companieItem.company_id,
          comment: this.newprod.comment,
        })
        .then((resp) => {
          console.log("Put", resp);
        })
        .catch((er) => {
          console.log("Ошибка", er);
        });
    },
  },
};
</script>

<style>
.md-comment {
  width: 660px !important;
}
.form-comment {
  width: 100%;
  height: 160px;
}
.heigth {
}
</style>
