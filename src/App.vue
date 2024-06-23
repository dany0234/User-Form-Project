<template>
  <div id="app">
    <div class="logo-container" @click="resetView">
      <img class="summa-logo" alt="Summa-Logo" src="./assets/Summa-Logo.png">
    </div>
    <div v-if="notification" class="notification">{{ notification }}</div>
    <UserForm v-if="showForm" @formSubmitted="handleFormSubmitted"/>
    <UserList v-if="!selectedUser && !showForm" :users="users" @selectUser="handleUserSelection"/>
    <UserDetails v-if="selectedUser" :user="selectedUser" @back="handleBack"/>
  </div>
</template>

<script>
import UserForm from './components/UserForm.vue';
import UserList from './components/UserList.vue';
import UserDetails from './components/UserDetails.vue';
import { fetchUsers } from './services/api';

export default {
  name: 'App',
  components: {
    UserForm,
    UserList,
    UserDetails
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      notification: '',
      showForm: true
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const users = await fetchUsers();
        this.users = users;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    handleFormSubmitted() {
      this.notification = 'משתמש נוצר בהצלחה!';
      this.fetchUsers();
      this.showForm = false;
      setTimeout(() => {
        this.notification = '';
      }, 3000);
    },
    handleUserSelection(user) {
      this.selectedUser = user;
      this.showForm = false;
    },
    handleBack() {
      this.selectedUser = null;
      this.showForm = false;
    },
    resetView() {
      this.selectedUser = null;
      this.showForm = true;
      this.notification = '';
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo-container {
  background-color: #092b47;
  cursor: pointer;
}

.summa-logo {
  max-height: 100px;
  width: auto;
  transition: transform 0.3s ease;
  padding-block: 1%;
}

.logo-container:hover .summa-logo {
  transform: scale(1.1);
}

.notification {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
  background-color: #dff0d8;
  color: #3c763d;
  z-index: 1000; /* Ensure the notification is above other content */
}
</style>
