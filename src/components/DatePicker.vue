<template>
  <div class="date-filters-wrapper">
    <div class="date-picker-text">
      <p>Filter with date</p>
      <button
        @click="filterWithDate"
        class="dates-btn"
        type="button"
        :disabled="!startDate || !endDate"
      >
        Filter
      </button>
      <button
        @click="clearDates"
        class="dates-btn"
        type="button"
        :disabled="!startDate || !endDate"
      >
        Clear
      </button>
    </div>
    <div class="date-filters">
      <div class="start-date">
        <label for="start-date">Start: </label>
        <input v-model="startDate" type="date" class="input" id="start-date" />
      </div>
      <div class="end-date">
        <label for="end-date">End: </label>
        <input
          v-model="endDate"
          type="date"
          class="input"
          id="end-date"
          :disabled="!startDate"
          :min="minEndDate"
          :max="maxEndDate"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  emits: {
    "filter-with-date"(payload) {
      if (Object.keys(payload).length === 2) {
        return true;
      }

      return false;
    },
  },
  data() {
    return {
      startDate: null,
      endDate: null,
    };
  },
  methods: {
    filterWithDate() {
      this.$emit("filter-with-date", {
        startDate: this.startDate,
        endDate: this.endDate,
      });
    },
    clearDates() {
      this.startDate = null;
      this.endDate = null;
      this.$emit("filter-with-date", {
        startDate: null,
        endDate: null,
      });
    },
  },
  computed: {
    maxEndDate() {
      if (this.startDate) {
        const date = new Date(this.startDate);
        date.setDate(date.getDate() + 7);
        return date.toISOString().split("T")[0];
      }
      return null;
    },
    minEndDate() {
      if (this.startDate) {
        const date = new Date(this.startDate);
        date.setDate(date.getDate() - 7);
        return date.toISOString().split("T")[0];
      }
      return null;
    },
  },
};
</script>

<style scoped>
.date-filters-wrapper {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
}
.dates-btn {
  border: none;
  padding-bottom: 1rem;
  background-color: transparent;
  font-size: inherit;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 2px;
}

.dates-btn:disabled {
  pointer-events: none;
}

.dates-btn:hover {
  color: #f03b7a;
}

.dates-btn:focus {
  outline: none;
}

.date-picker-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-filters-wrapper p {
  padding-bottom: 1rem;
  color: #f03b7a;
}

label {
  color: #555;
  font-size: 0.9rem;
  padding-right: 0.5rem;
}

.date-filters {
  display: flex;
}

.start-date {
  margin-right: 2rem;
}
.input {
  background-color: transparent;
  border: none;
  color: #555;
  border-bottom: 1px solid #dcdee0;
}
</style>