<template>
  <div class="search-wrapper">
    <input
      type="text"
      class="search-input"
      :value="searchInput"
      @keyup="filterByRefId"
      placeholder="Search by id ..."
    />
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  emits: ["filter-by-ref-id"],
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    filterByRefId(event) {
      this.searchInput = event.target.value;
      this.$emit("filter-by-ref-id", { refId: this.searchInput });
    },
  },
};
</script>

<style scoped>
.search-wrapper {
  width: 30%;
}

.search-input {
  width: 100%;
  background-color: transparent;
  border: none;
  color: #555;
  border-bottom: 1px solid #dcdee0;
}

.search-input:focus {
  outline: none;
}
</style>