<template>
  <base-card class="parent">
    <h2>Find Your Coach</h2>
    <div>
      <span class="filter-option">
        <input type="checkbox" id="frontend" checked @change="setFilter">
        <label for="frontend">Frontend</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="backend" checked @change="setFilter">
        <label for="backend">Backend</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="career" checked @change="setFilter">
        <label for="career">Career</label>
      </span>
    </div>
    <span class="filter-option">
      <label for="name">Search By Text:</label>
      <input type="text" id="name" @change="setFilter" v-model.trim="checkboxes.name">
    </span>
    <span class="slide-container">
      <label for="price">Up to: ${{ checkboxes.price }}/hour</label>
      <input id="price" type="range" @change="setFilter" min="0" max="100" v-model="checkboxes.price">
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  data() {
    return {
      checkboxes: {
        frontend: true,
        backend: true,
        career: true,
        name: '',
        price: 100
      }
    };
  },
  // watch: {
  //   checkboxes() {
  //     if (this.checkboxes.name === false) {
  //       this.checkboxes.name = '';
  //     }
  //   }
  // },
  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isPriceOrName = inputId === 'name' || inputId === 'price';
      const value = isPriceOrName ? event.target.value : event.target.checked;
      const updatedCheckboxes = {
        ...this.checkboxes,
        [inputId]: value
      };
      this.checkboxes = updatedCheckboxes;
      this.$emit('change-filter', updatedCheckboxes);
    },
  }
}
</script>

<style scoped>
.parent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}

.slide-container {
  width: 100%; /* Width of the outside container */
}
</style>