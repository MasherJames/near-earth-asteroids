<template>
  <div v-if="allAsteroids?.asteroids?.length > 0" class="pagination">
    <div>
      Showing
      <b
        >{{ allAsteroids.count || 10 }} of
        {{ allAsteroids.total }}
      </b>
      asteroids
    </div>
    <div class="pagination-btn" v-if="!startDate && !endDate">
      <span class="btn" @click="fetchPrevPage">Prev</span>
      <span>{{ allAsteroids.page }}</span>
      <span class="btn" @click="fetchNextPage">Next</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Paginator",
  props: {
    startDate: {
      validator: (value) => value === null || typeof value === "string",
      required: true,
    },
    endDate: {
      validator: (value) => value === null || typeof value === "string",
      required: true,
    },
  },
  emits: { "fetch-prev-page": null, "fetch-next-page": null },
  computed: mapGetters(["allAsteroids"]),
  methods: {
    fetchPrevPage() {
      this.$emit("fetch-prev-page");
    },
    fetchNextPage() {
      this.$emit("fetch-next-page");
    },
  },
};
</script>

<style scoped>
.pagination {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  color: rgb(136, 136, 136);
  font-weight: 300;
  font-size: 0.9rem;
  letter-spacing: 1px;
}
.pagination-btn span {
  margin-left: 2rem;
}

.btn {
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  color: #f03b7a;
}
</style>