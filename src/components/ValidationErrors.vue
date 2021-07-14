<template>
  <ul class="error-messages">
    <li>
      {{ validationErrors.error }}
    </li>
    <li>
      {{ validationErrors.message }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "AppValidationErrors",
  props: {
    validationErrors: {
      type: Object,
      required: true, //без него ничего не будет работать
    },
  },
  computed: {},
};
</script>
