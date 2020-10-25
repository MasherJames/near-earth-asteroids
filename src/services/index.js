class HttpService {
  static fecthNeoBrowseAsteroids(page) {
    return fetch(
      `${process.env.VUE_APP_URL}/neo/browse?page=${page}&size=10&api_key=${process.env.VUE_APP_NASA_API_KEY}`
    );
  }
  static fecthNeoFeedAsteroids(start_date, end_date) {
    return fetch(
      `${process.env.VUE_APP_URL}/feed?start_date=${start_date}&end_date=${end_date}&detailed=true&api_key=${process.env.VUE_APP_NASA_API_KEY}`
    );
  }
  static fecthAsteroid(refId) {
    return fetch(
      `${process.env.VUE_APP_URL}/neo/${refId}?api_key=${process.env.VUE_APP_NASA_API_KEY}`
    );
  }
}

export default HttpService;
