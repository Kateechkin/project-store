<template>
  <footer class="footer">
    <div class="copyright text-center">
      &copy; {{ new Date().getFullYear() }}
      <a href="" target="_blank">Creative Lumerty</a>, made with
      <i class="fa fa-heart heart"></i>
    </div>
    <!-- </div> -->
  </footer>
</template>
<script>
export default {
  name: "AppFooter",
};
</script>
<style>
.footer {
  width: 100%;
  padding-right: 30px;
  padding-left: 30px;
}
</style>
