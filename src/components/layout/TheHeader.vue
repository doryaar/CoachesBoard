<template>
  <header>
    <nav>
      <router-link to="/">
        <h1>Find A Coach</h1>
      </router-link>
      <ul>
        <li><router-link to="/coaches">All Coaches</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/requests">Requests</router-link></li>
        <li v-if="isLoggedIn && isCoach"><router-link :to="coachProfileLink">{{ coachName }}</router-link></li>
        <li v-else><router-link to="/auth">Login</router-link></li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      coachName: '',
      coachId: ''
    };
  },
  computed: {
    coachProfileLink() {
      return '/profile/' + this.coachId;
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isCoach() {
      const isCoach = this.$store.getters['coaches/isCoach'];
      if ( isCoach ) {
        this.updateCoachData();
      }
      return isCoach;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/coaches');
    },
    updateCoachData() {
      const coaches = this.$store.getters['coaches/coaches'];
      const userId = this.$store.getters.userId;
      const coach = coaches.find(coach => coach.id === userId);
      this.coachName = coach.firstName;
      this.coachId = userId;
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>