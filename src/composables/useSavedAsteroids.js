import { onMounted, watch, ref } from "vue";

const useSavedAsteroid = (getters, dispatch) => {
  const currentUserId = getters.getCurrentUser.uid;
  const savedAsteroidsLen = Object.keys(getters.savedAsteroidsRefs).length;

  // create a ref to be watched from the current user id
  const savedAsteroidsVar = ref(savedAsteroidsLen);
  // dispatch the fetching action
  const savedAsteroids = () => dispatch("fetchSavedAsteroids", currentUserId);

  // dispatch on mount
  onMounted(savedAsteroids);

  // refetch when dependancy changes
  watch(savedAsteroidsVar, savedAsteroids);
};

export default useSavedAsteroid;
