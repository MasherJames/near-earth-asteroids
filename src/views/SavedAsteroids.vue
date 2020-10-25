<template>
  <main class="all-asteroids-wrapper">
    <SideBar />
    <section class="asteroids">
      <div class="asteroids-filter-count">
        <h1 class="saved-header-content">
          Saved Asteroids
          <span>({{ savedAsteroids.count }})</span>
        </h1>
        <router-link to="/all_asteroids" class="saved-header-content link">
          View All Asteroids
        </router-link>
      </div>
      <div class="table-container">
        <table class="table">
          <thead class="data-table-header">
            <tr class="data-table-row header-row">
              <th class="data-table-content table-content-header">Name</th>
              <th class="data-table-content table-content-header">
                Reference ID
              </th>
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
            </tr>
          </thead>
          <tbody class="data-table-body">
            <div
              v-if="
                asteroidsLoading.isLoading &&
                asteroidsLoading.type === 'fetchingSaveAsteroids'
              "
            >
              Loading ...
            </div>
            <tr
              v-else
              v-for="asteroid in savedAsteroids.asteroids"
              :key="asteroid.refId"
              class="data-table-row body-row"
              id="show-modal"
            >
              <td class="data-table-content table-content-body">
                {{ asteroid.name }}
              </td>
              <td class="data-table-content table-content-body">
                {{ asteroid.refId }}
              </td>
              <td class="data-table-content table-content-body">
                {{ asteroid.absMag }}
              </td>
              <td class="data-table-content table-content-body">
                {{ asteroid.estD }}
              </td>
              <td class="data-table-content table-content-body">
                {{ asteroid.potHaz }}
              </td>
              <td class="data-table-content table-content-body">
                {{ asteroid.aphelionD }}
              </td>
              <td class="data-table-content table-content-body">
                {{ asteroid.closeApproach }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import { mapGetters, useStore } from "vuex";

import SideBar from "@/components/SideBar";
import { useSavedAsteroids } from "../composables";

export default {
  name: "SavedAsteroids",
  components: {
    SideBar,
  },
  setup() {
    const savedAsteroidsData = reactive({ savedAsteroids: {} });

    // store to access getters and dispatch actions
    const store = useStore();

    const { dispatch, getters } = store;
    // fetch saved records
    useSavedAsteroids(getters, dispatch);

    // get fetched saved asteroids
    savedAsteroidsData.savedAsteroids = computed(() => getters.savedAsteroids);

    return {
      ...toRefs(savedAsteroidsData),
    };
  },
  computed: mapGetters(["asteroidsLoading", "savedAsteroids"]),
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

.link {
  text-decoration: none;
  transition: all 0.2s;
}

.link:hover {
  color: #f03b7a;
}

.saved-header-content {
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
</style>