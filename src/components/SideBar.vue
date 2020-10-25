<template>
  <section class="side-bar">
    <nav class="side-bar__nav">
      <ul class="side-bar__links">
        <li class="side-bar__link">
          <router-link to="/saved_asteroids" class="link">
            Saved Asteroids
          </router-link>
        </li>
        <li class="side-bar__link">
          <router-link to="/all_asteroids" class="link">
            All Asteroids
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  name: "SodeBar",
};
</script>

<style scoped>
.side-bar {
  background-color: rgba(27, 27, 67, 0.9);
  position: fixed;
  height: 100%;
  left: -10rem;
  transition: all 0.2s;
  width: 15%;
}

.side-bar:hover {
  transform: translateX(10rem);
}

.side-bar__nav {
  padding: 1rem;
}

.side-bar__links {
  list-style: none;
}

.side-bar__link {
  font-size: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s;
}

.link:hover {
  color: #f03b7a;
}
</style>