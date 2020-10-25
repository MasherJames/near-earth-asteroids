import { watch } from "vue";

const useAsteroidsRefIdSearch = (commit, searchInput) => {
  watch(searchInput, () =>
    commit("setAsteroidsFilterdByRefId", searchInput.value)
  );
};

export default useAsteroidsRefIdSearch;
