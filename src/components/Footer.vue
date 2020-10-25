<template>
  <footer class="footer">
    <ul class="footer-links">
      <li>About Us</li>
      <li>Privacy Policy</li>
      <li>Terms Of Use</li>
    </ul>
    <div class="copyright">
      <p>&copy; {{ currentYear() }} Key. All Rights Reserved | James</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.footer {
  min-height: 10vh;
  background-color: #1b1b43;
  display: flex;
  justify-content: space-between;
  padding: 0 6rem;
  color: #ccc;
  font-weight: 300;
  text-transform: capitalize;
  font-size: 0.9rem;
  letter-spacing: 1px;
  word-spacing: 2px;
  padding-top: 1.2rem;
}

.footer-links {
  list-style: none;
  display: flex;
}
.footer-links > * {
  margin-right: 1rem;
}
</style>