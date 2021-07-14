<template>
  <div class="container">
    <div class="row">
      <div class="df">
        <h1>404</h1>
        <h2>UH OH! You're lost.</h2>
        <p>
          The page you are looking for does not exist. How you got here is a
          mystery. But you can click the button below to go back to the
          homepage.
        </p>
        <router-link
          :to="{
            name: 'home',
          }"
          ><button class="btn green">HOME</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppError",
};
</script>

<style></style>
