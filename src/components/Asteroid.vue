<template>
  <div class="modal" :class="[showModal ? show : hide]">
    <button @click="setShowModal" class="close">&times;</button>
    <div class="modal-dialog">
      <div class="modal-content">
        <div v-if="!asteroid.refId">Loading ...</div>
        <template v-else>
          <div class="left-content content">
            <p><span class="bold">Name</span> - {{ asteroid.name }}</p>
            <p><span class="bold">Magnitude</span> - {{ asteroid.absMag }}</p>
            <p>
              <span class="bold">Potential Hazardous</span> -
              {{ asteroid.potHaz }}
            </p>
            <p>
              <span class="bold">Close Approach Date</span> -
              {{ asteroid.closeApproach }}
            </p>
          </div>
          <div class="right-content content">
            <p><span class="bold">Reference ID</span> - {{ asteroid.refId }}</p>
            <p>
              <span class="bold">Estimated Diameter</span> -
              {{ asteroid.estD ?? "" }}
            </p>
            <p>
              <span class="bold">Aphelion Distance</span> -
              {{ asteroid.aphelionD }}
            </p>
            <p>
              <span class="bold">Designation</span> - {{ asteroid.designation }}
            </p>
            <button class="save-btn" type="button">Save</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Asteroid",
  props: ["showModal", "setShowModal"],
  data() {
    return {
      show: "show",
      hide: "hide",
    };
  },
  computed: mapGetters(["asteroid"]),
};
</script>

<style scoped>
.show {
  display: block;
}
.hide {
  display: none;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.close {
  position: absolute;
  right: 1.5rem;
  top: 2rem;
  color: #f03b7a;
  border: none;
  height: 2rem;
  width: 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.6rem;
  background-color: transparent;
  z-index: 3;
}

.close:focus {
  outline: none;
}

.modal-dialog {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #fefefe;
  padding: 10rem;
}

.modal-content {
  vertical-align: middle;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  height: 100%;
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.right-content {
  padding-left: 1rem;
}

.left-content {
  border-right: 1px dashed #ccc;
  padding-right: 1rem;
}

.bold {
  font-weight: bold;
}

p {
  letter-spacing: 0.1rem;
  line-height: 1.2rem;
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
}

.save-btn {
  background-color: #f03b7a;
  border-radius: 5px;
  border: none;
  color: #fff;
  padding: 0.4rem 2rem;
  margin-top: 1rem;
  float: right;
  text-transform: uppercase;
  cursor: pointer;
  letter-spacing: 2px;
  transition: all 0.2s;
}

.save-btn:hover {
  transform: translateY(-2px);
}

.save-btn:focus {
  outline: none;
}
</style>