import { onMounted, watch } from "vue";

const useAsteroids = (dispatch, page, startDate, endDate) => {
  // fetch Neo browse
  const neoBrowseAsteroids = () =>
    dispatch("fecthNeoBrowseAsteroids", {
      page: page.value,
      startDate: startDate.value,
      endDate: endDate.value,
    });

  const neoFeedAsteroids = () =>
    dispatch("fecthNeoFeedAsteroids", {
      startDate: startDate.value,
      endDate: endDate.value,
    });

  onMounted(neoFeedAsteroids);
  onMounted(neoBrowseAsteroids);

  watch([startDate, endDate], neoFeedAsteroids);
  watch([page, startDate, endDate], neoBrowseAsteroids);
};

export default useAsteroids;
