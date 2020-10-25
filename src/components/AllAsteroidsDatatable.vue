<template>
  <Notification
    v-if="asteroidsStatus.message"
    :message="asteroidsStatus.message"
    :type="asteroidsStatus.type"
  />
  <table class="table">
    <thead class="data-table-header">
      <tr class="data-table-row header-row">
        <th class="data-table-content table-content-header">Name</th>
        <th class="data-table-content table-content-header">Reference ID</th>
        <th class="data-table-content table-content-header">
          Absolute Magnitude
        </th>
        <th class="data-table-content table-content-header">
          Estimated Avg Diameter
        </th>
        <th class="data-table-content table-content-header">
          Potential Hazards
        </th>
        <th class="data-table-content table-content-header">
          Aphelion Distance
        </th>
        <th class="data-table-content table-content-header">
          Close Approach Date
        </th>
        <th class="data-table-content table-content-header">Actions</th>
      </tr>
    </thead>
    <tbody class="data-table-body">
      <div
        v-if="
          asteroidsLoading.isLoading &&
          (asteroidsLoading.type === 'fetchingNeoBrowse' ||
            asteroidsLoading.type === 'fetchingNeoFeed')
        "
      >
        Loading ...
      </div>
      <tr
        v-else
        v-for="asteroid in asteroids.asteroids"
        :key="asteroid.refId"
        class="data-table-row body-row"
        id="show-modal"
        @mouseover="fecthAsteroid(asteroid.refId)"
      >
        <td class="data-table-content table-content-body" @click="setShowModal">
          {{ asteroid.name }}
        </td>
        <td class="data-table-content table-content-body" @click="setShowModal">
          {{ asteroid.refId }}
        </td>
        <td class="data-table-content table-content-body" @click="setShowModal">
          {{ asteroid.absMag }}
        </td>
        <td class="data-table-content table-content-body" @click="setShowModal">
          {{ asteroid.estD }}
        </td>
        <td class="data-table-content table-content-body" @click="setShowModal">
          {{ asteroid.potHaz }}
        </td>
        <td class="data-table-content table-content-body" @click="setShowModal">
          {{ asteroid.aphelionD }}
        </td>
        <td class="data-table-content table-content-body" @click="setShowModal">
          {{ asteroid.closeApproach }}
        </td>
        <td class="data-table-content table-content-body">
          <div
            v-if="
              asteroidsLoading.isLoading &&
              asteroidsLoading.type === 'savingAsteroid' &&
              asteroidsLoading.extraIdentifier === asteroid.refId
            "
            class="loading-wrapper"
          >
            <LoadingButton />
          </div>
          <button
            v-else
            @click="saveFavouriteAsteroid(asteroid)"
            class="save-btn"
            type="button"
            :disabled="savedAsteroidsRefs[asteroid.refId]"
          >
            {{ savedAsteroidsRefs[asteroid.refId] ? "Saved" : "Save" }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { mapGetters, mapActions, useStore } from "vuex";

import {
  useAsteroids,
  useAsteroidsRefIdSearch,
  useSavedAsteroids,
} from "../composables";
import Notification from "@/components/Notification";
import LoadingButton from "@/components/LoadingButton";

export default {
  name: "AllAsteroidsDatatable",
  components: { Notification, LoadingButton },
  props: {
    page: {
      type: Number,
      required: true,
      default: () => 1,
    },
    searchInput: {
      type: String,
      required: true,
      default: () => "",
    },
    setShowModal: {
      type: Function,
      required: true,
    },
    startDate: {
      validator: (value) => value === null || typeof value === "string",
      required: true,
    },
    endDate: {
      validator: (value) => value === null || typeof value === "string",
      required: true,
    },
  },
  setup(props) {
    const { page, searchInput, startDate, endDate } = toRefs(props);

    const asteoidsData = reactive({ asteroids: {} });
    // store to access getters and dispatch actions
    const store = useStore();

    const { dispatch, getters, commit } = store;

    // fetch saved records to block saved asteroids
    useSavedAsteroids(getters, dispatch);

    // dispatch action to get asteroids
    useAsteroids(dispatch, page, startDate, endDate);

    // get fetched asteroids
    asteoidsData.asteroids = computed(() => getters.allAsteroids);

    // search fetched asteroids
    useAsteroidsRefIdSearch(commit, searchInput);

    // return
    return {
      ...toRefs(asteoidsData),
    };
  },
  methods: {
    ...mapActions(["fecthAsteroid", "saveAsteroid"]),
    saveFavouriteAsteroid(asteroid) {
      if (this.isAuthenticated) {
        this.saveAsteroid({ ...asteroid, userId: this.getCurrentUser.uid });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
  },
  computed: mapGetters([
    "asteroidsLoading",
    "getCurrentUser",
    "asteroidsStatus",
    "savedAsteroidsRefs",
    "isAuthenticated",
  ]),
};
</script>

<style scoped>
.table {
  display: table;
  width: 100%;
  border-collapse: collapse;
  border-color: grey;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.875rem;
}

.data-table-header {
  color: #f03b7a;
  display: table-header-group;
}

.header-row {
  color: inherit;
  height: 4rem;
  display: table-row;
  vertical-align: middle;
}

.data-table-content {
  display: table-cell;
  text-align: left;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  font-size: 1rem;
  padding: 1rem 0.8rem;
  font-weight: 300;
  line-height: 1.42857143;
  vertical-align: middle;
}

.data-table-body {
  display: table-row-group;
}

.table-content-body {
  color: rgba(0, 0, 0, 0.87);
}
.loading-wrapper {
  background-color: #f03b7a;
  padding: 0.4rem 1rem;
  border-radius: 5px;
}
.save-btn {
  background-color: #f03b7a;
  border: none;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  width: 100%;
  padding: 0.4rem 1rem;
  border-radius: 5px;
  letter-spacing: 2px;
  transition: all 0.2s;
}

.save-btn:hover {
  transform: translateY(-2px);
}

.save-btn:focus {
  outline: none;
}
.save-btn:disabled {
  pointer-events: none;
  background-color: rgba(240, 59, 122, 0.7);
}
.body-row {
  cursor: pointer;
  transition: all 0.2s;
}

.body-row:hover {
  background-color: rgba(0, 0, 0, 0.075);
}
</style>