<template>
  <Asteroid :show-modal="showModal" :set-show-modal="setShowModal" />
  <main class="all-asteroids-wrapper">
    <SideBar />
    <section class="asteroids">
      <div class="asteroids-filter-count">
        <h1>
          All Asteroids
          <span>({{ allAsteroids.total || 0 }})</span>
        </h1>
        <SearchInput @filter-by-ref-id="filterByRefId" />
        <DatePicker @filter-with-date="filterWithDate" />
      </div>
      <div class="table-container">
        <AllAsteroidsDatatable
          :set-show-modal="setShowModal"
          :page="page"
          :search-input="searchInput"
          :start-date="startDate"
          :end-date="endDate"
        />
        <Paginator
          @fetch-prev-page="fetchPrevPage"
          @fetch-next-page="fetchNextPage"
          :start-date="startDate"
          :end-date="endDate"
        />
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

import SideBar from "@/components/SideBar";
import SearchInput from "@/components/SearchInput";
import DatePicker from "@/components/DatePicker";
import AllAsteroidsDatatable from "@/components/AllAsteroidsDatatable";
import Paginator from "@/components/Paginator";
import Asteroid from "@/components/Asteroid";

export default {
  name: "AllAsteroids",
  components: {
    SideBar,
    SearchInput,
    DatePicker,
    AllAsteroidsDatatable,
    Paginator,
    Asteroid,
  },
  data() {
    return {
      showModal: false,
      page: 1,
      searchInput: "",
      startDate: null,
      endDate: null,
    };
  },
  computed: mapGetters(["allAsteroids"]),
  methods: {
    setShowModal() {
      this.showModal = !this.showModal;
    },
    fetchPrevPage() {
      if (this.page === 1) {
        return;
      }
      this.page -= 1;
    },
    fetchNextPage() {
      this.page += 1;
    },
    filterByRefId(data) {
      this.searchInput = data.refId;
    },
    filterWithDate(data) {
      this.startDate = data.startDate;
      this.endDate = data.endDate;
    },
  },
};
</script>

<style scoped>
.all-asteroids-wrapper {
  width: 100%;
  min-height: 90vh;
  padding-top: 10vh;
}

.asteroids {
  margin-left: 5%;
}

h1 {
  font-weight: 300;
  font-size: 1rem;
  border-bottom: 1px solid #dcdee0;
  color: #555;
}

.asteroids-filter-count {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 1.5rem 0.5rem;
}

.table-container {
  margin-top: 1rem;
  padding: 1rem;
}
</style>