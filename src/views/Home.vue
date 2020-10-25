<template>
  <main class="home">
    <section class="landing-section">
      <div class="landing-section__cont">
        <h1 class="heading-text">
          <span class="heading-text__main">Small Solar System Bodies</span>
          <span class="heading-text__sub"
            >View NEOs whose orbits around the Sun, brings it to proximity with
            Earth.
          </span>
        </h1>
        <router-link to="/all_asteroids" class="landing-section__btn"
          >View All Asteroids</router-link
        >
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.landing-section {
  min-height: 90vh;
  background-image: linear-gradient(
      to right bottom,
      rgba(22, 25, 70, 0.8),
      rgba(20, 22, 62, 0.8)
    ),
    url("../assets/bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
}

.landing-section__cont {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.landing-section__btn {
  text-transform: uppercase;
  background-color: #f03b7a;
  color: #fff;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 4rem;
  display: inline-block;
  transition: all 0.2s;
}

.landing-section__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px #0b0c2b;
}

@keyframes MoveInLeft {
  0% {
    opacity: 0;
    transform: translate(-10rem);
  }
  80% {
    transform: translate(1.2rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes MoveInRight {
  0% {
    opacity: 0;
    transform: translate(10rem);
  }
  80% {
    transform: translate(-1.2rem);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

.heading-text {
  color: #fff;
  margin-bottom: 1rem;
}

.heading-text__main {
  display: block;
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5rem;
  animation: MoveInLeft 1.5s ease-out;
}

.heading-text__sub {
  display: block;
  font-size: 1rem;
  letter-spacing: 0.3rem;
  animation: MoveInRight 1.5s ease-out;
}
</style>