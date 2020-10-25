import db from "../../firebase";

import HttpService from "../../services";

const state = {
  asteroids: {},
  savedAsteroids: { asteroids: [], count: 0 },
  savedAsteroidsRefs: {},
  asteroid: {},
  asteroidsToSearchFrom: {},
  cachedAsteroid: {},
  cachedAsteroids: {},
  asteroidsStatus: { message: "", type: null },
  asteroidsLoading: { isLoading: false, type: null, extraIdentifier: null },
};
const mutations = {
  setAsteroidsStatus: (state, asteroidsStatus) => {
    state.asteroidsStatus = asteroidsStatus;
  },
  setAsteroidsLoading: (state, asteroidsLoading) => {
    state.asteroidsLoading = asteroidsLoading;
  },
  setSavedAsteroids: (state, savedAsteroids) => {
    state.savedAsteroids = savedAsteroids;
  },
  setSavedAsteroidsRef: (state, refId) => {
    state.savedAsteroidsRefs[refId] = true;
  },
  setAsteroid: (state, asteroid) => {
    state.asteroid = asteroid;
  },
  setAsteroidsToSearchFrom: (state, asteroids) => {
    state.asteroidsToSearchFrom = asteroids;
  },
  setAsteroids: (state, asteroids) => {
    state.asteroids = asteroids;
  },
  setAsteroidsFilterdByRefId: (state, refId) => {
    const refIdLength = refId.length;

    const filteredAsteroids = state.asteroidsToSearchFrom.asteroids?.filter(
      (asteroid) => {
        const asteroidRefId = asteroid.refId.toString().slice(0, refIdLength);

        return asteroidRefId === refId;
      }
    );
    state.asteroids = {
      ...state.asteroids,
      asteroids: filteredAsteroids,
      count: filteredAsteroids?.length,
    };
  },
  setAsteroidsToCache: (state, { asteroidsData, page }) => {
    state.cachedAsteroids[page] = asteroidsData;
  },
  setAsteroidToCache: (state, { asteroid, refId }) => {
    state.cachedAsteroid[refId] = asteroid;
  },
  clearCacheOnLogout: (state) => {
    state.savedAsteroidsRefs = {};
  },
};
const actions = {
  fecthNeoBrowseAsteroids: (
    { commit, state },
    { page, startDate, endDate }
  ) => {
    // give priority to neo feed if there are date filters
    if (startDate && endDate) return;

    // else clear exisiting asteroids to avoid showing both loading and prev data
    commit("setAsteroids", {
      asteroids: [],
      total: 0,
      page: 0,
    });

    // Check if the asteroid is already fetched
    if (state.cachedAsteroids[page]) {
      commit("setAsteroids", state.cachedAsteroids[page]);
      commit("setAsteroidsToSearchFrom", state.cachedAsteroids[page]);
      return;
    }

    // set loading to true
    commit("setAsteroidsLoading", {
      isLoading: true,
      type: "fetchingNeoBrowse",
    });

    // trigger fetch
    HttpService.fecthNeoBrowseAsteroids(page)
      .then((response) => response.json())
      .then((data) => {
        // Handle on success
        const asteroids = data.near_earth_objects.map((near_earth_object) => ({
          closeApproach:
            near_earth_object.close_approach_data[0]?.close_approach_date ?? "",
          name: near_earth_object.name ?? "",
          refId: near_earth_object.neo_reference_id ?? "",
          absMag: near_earth_object.absolute_magnitude_h ?? "",
          estD: `${Math.round(
            (near_earth_object.estimated_diameter.feet.estimated_diameter_max +
              near_earth_object.estimated_diameter.feet
                .estimated_diameter_max) /
              2
          )} feet`,
          potHaz: near_earth_object.is_potentially_hazardous_asteroid ?? "",
          aphelionD: `${Math.round(
            near_earth_object.orbital_data.aphelion_distance
          )} AU`,
          designation: data.designation ?? "DESIGNATION",
        }));

        const asteroidsData = {
          asteroids,
          total: data.page.total_elements ?? 0,
          page: data.page.number ?? 0,
        };

        commit("setAsteroids", asteroidsData);
        // set data to be for seaching in a page
        commit("setAsteroidsToSearchFrom", asteroidsData);

        // cache asteroids
        commit("setAsteroidsToCache", { asteroidsData, page });
      })
      .catch((error) => {
        // Handle any errors here
        commit("setAsteroidsStatus", { type: "error", message: error.message });
      })
      .finally(() => {
        // Handle when promise is settled
        commit("setAsteroidsLoading", {
          isLoading: false,
          type: "fetchingNeoBrowse",
        });
      });
  },
  fecthNeoFeedAsteroids: ({ commit }, payload) => {
    const { startDate, endDate } = payload;

    // Halt neo feed fetching if there no filter dates
    if (!startDate || !endDate) return;

    // remove previous fetched asteroids to avoid a display of both data and loading
    commit("setAsteroids", {
      asteroids: [],
      total: 0,
      page: 0,
    });

    //  set loading to true
    commit("setAsteroidsLoading", { isLoading: true, type: "fetchingNeoFeed" });

    // trigger fetch
    HttpService.fecthNeoFeedAsteroids(startDate, endDate)
      .then((response) => response.json())
      .then((data) => {
        // Handle on success
        const spreadData = Object.values(data.near_earth_objects).flat(1);
        const asteroids = spreadData.map((near_earth_object) => ({
          closeApproach:
            near_earth_object.close_approach_data[0]?.close_approach_date ?? "",
          name: near_earth_object.name ?? "",
          refId: near_earth_object.neo_reference_id ?? "",
          absMag: near_earth_object.absolute_magnitude_h ?? "",
          estD: `${Math.round(
            (near_earth_object.estimated_diameter.feet.estimated_diameter_max +
              near_earth_object.estimated_diameter.feet
                .estimated_diameter_max) /
              2
          )} feet`,
          potHaz: near_earth_object.is_potentially_hazardous_asteroid ?? "",
          aphelionD: `${Math.round(
            near_earth_object.orbital_data.aphelion_distance
          )} AU`,
          designation: data.designation ?? "DESIGNATION",
        }));

        // sort asteroids with their closest approach date in desc order and return 10 records
        const soretdData = asteroids
          .sort(
            (first, second) =>
              new Date(second.close_approach).getTime() -
              new Date(first.close_approach).getTime()
          )
          .slice(0, 10);

        const asteroidsData = {
          asteroids: soretdData,
          total: data.element_count ?? 0,
          page: 1,
        };

        // set asteroids to display in the data table
        commit("setAsteroids", asteroidsData);
        // set the same data to be used in searching by refId
        commit("setAsteroidsToSearchFrom", asteroidsData);
      })
      .catch((error) => {
        // Handle any errors here
        commit("setAsteroidsStatus", { type: "error", message: error.message });
      })
      .finally(() => {
        // Handle when promise is settled
        commit("setAsteroidsLoading", {
          isLoading: false,
          type: "fetchingNeoFeed",
        });
      });
  },
  fecthAsteroid: ({ commit }, refId) => {
    /*
    This function fetches one asteroid
    It could be replaced by a getter to fetch single asteroid from the list of
    already fetched asteroids
    */

    // Check if asteroids was fetched before and return it
    if (state.cachedAsteroid[refId]) {
      commit("setAsteroid", state.cachedAsteroid[refId]);
      return;
    }

    // if no cached data, make request
    HttpService.fecthAsteroid(refId)
      .then((response) => response.json())
      .then((data) => {
        const asteroid = {
          closeApproach: data.close_approach_data[0]?.close_approach_date ?? "",
          name: data.name ?? "ASTEROID_NAME",
          refId: data.neo_reference_id ?? "REF_ID",
          absMag: data.absolute_magnitude_h ?? "ABSOLUTE_MAGNITUDE",
          estD: `${Math.round(
            (data.estimated_diameter.feet.estimated_diameter_max +
              data.estimated_diameter.feet.estimated_diameter_max) /
              2
          )} feet`,
          potHaz:
            data.is_potentially_hazardous_asteroid ?? "IS_POTENTIAL_HAZDROUS",
          aphelionD: `${Math.round(data.orbital_data.aphelion_distance)} AU`,
          designation: data.designation ?? "DESIGNATION",
        };

        commit("setAsteroid", asteroid);

        // cache asteroids to avoid refetching while still in session
        commit("setAsteroidToCache", { asteroid, refId });
      })
      .catch((error) => {
        // Handle any errors here
        commit("setAsteroidsStatus", { type: "error", message: error.message });
      });
  },
  saveAsteroid: ({ commit }, payload) => {
    // save asteroids to firestore
    commit("setAsteroidsLoading", {
      isLoading: true,
      type: "savingAsteroid",
      extraIdentifier: payload.refId,
    });
    db.collection("asteroids")
      .add({ ...payload })
      .then(() => {
        // record saved asteroids to avoid duplicates
        commit("setSavedAsteroidsRef", payload.refId);

        // commit status as success
        commit("setAsteroidsStatus", {
          type: "success",
          message: "Asteroid saved successfully !!",
        });
      })
      .catch((error) => {
        // Handle on error
        commit("setAsteroidsStatus", {
          type: "error",
          message: error.message,
        });
      })
      .finally(() => {
        // Handle this when promise is settled
        commit("setAsteroidsLoading", {
          isLoading: false,
          type: "savingAsteroid",
        });
      });
  },
  fetchSavedAsteroids: ({ commit }, currentUserUid) => {
    // Function that fetches saved astroids from firestore

    // only fetch this when a user is in session
    if (!currentUserUid) {
      return;
    }

    commit("setAsteroidsLoading", {
      isLoading: true,
      type: "fetchingSaveAsteroids",
    });

    db.collection("asteroids")
      .where("userId", "==", currentUserUid)
      .get()
      .then((querySnapshot) => {
        const asteroids = [];
        // Map data to the required format
        querySnapshot.forEach((doc) => {
          const {
            closeApproach,
            name,
            refId,
            absMag,
            estD,
            potHaz,
            aphelionD,
            designation,
          } = doc.data();
          // record saved asteroids to avoid duplicates
          commit("setSavedAsteroidsRef", refId);

          asteroids.push({
            closeApproach: closeApproach ?? "",
            name: name ?? "ASTEROID_NAME",
            refId: refId ?? "REF_ID",
            absMag: absMag ?? "ABSOLUTE_MAGNITUDE",
            estD: estD ?? "ESTIMATED_DIAMETER",
            potHaz: potHaz ?? "IS_POTENTIAL_HAZDROUS",
            aphelionD: aphelionD ?? "APHELLION_DISTANCE",
            designation: designation ?? "DESIGNATION",
          });
        });

        commit("setSavedAsteroids", {
          asteroids: asteroids,
          count: asteroids.length,
        });
      })
      .catch((error) => {
        commit("setAsteroidsStatus", {
          type: "error",
          message: error.message,
        });
      })
      .finally(() => {
        // Set loading to false when promise is settled
        commit("setAsteroidsLoading", {
          isLoading: false,
          type: "fetchingSaveAsteroids",
        });
      });
  },
};
const getters = {
  // get all asteroids, this data switched between neo feed and neo browse
  allAsteroids: (state) => state.asteroids,
  // get single asteroid from /neo/refId (Could also be fetched from the exisiting list)
  asteroid: (state) => state.asteroid,
  // get all saved asteroids from firestore
  savedAsteroids: (state) => state.savedAsteroids,
  // Fetch single asteredi from the saved list with reference id
  savedAsteroid: (state) => {
    return (refId) =>
      state.savedAsteroids.find((asteroid) => asteroid.refId === refId);
  },
  // return current asteroids fetching status. i.e errors, success
  asteroidsStatus: (state) => state.asteroidsStatus,
  // return loading states under asteroids fetching
  asteroidsLoading: (state) => state.asteroidsLoading,
  // return saved asteroids refs
  savedAsteroidsRefs: (state) => state.savedAsteroidsRefs,
};

export default { state, mutations, actions, getters };
