<template>
  <div class="loader"></div>
</template>

<script>
export default {
  name: "LoadingButton",
};
</script>

<style  scoped>
.loader {
  border: 0.1rem solid #f3f3f3;
  border-radius: 50%;
  border-top: 0.1rem solid #f03b7a;
  margin: 0 auto;
  width: 1rem;
  height: 1rem;
  animation: spin 1s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>