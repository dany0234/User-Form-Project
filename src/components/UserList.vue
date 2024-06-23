<template>
    <div class="user-list">
      <h2>רשימת משתמשים</h2>
      <table>
        <thead>
          <tr>
            <th>שם משתמש</th>
            <th>אימייל</th>
            <th>תאריך לידה</th>
            <th>תמונה</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" @click="selectUser(user)" class="clickable-row">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ formatDate(user.dateOfBirth) }}</td>
            <td>
              <img :src="user.image" alt="User Image" class="user-image">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      users: Array
    },
    methods: {
      selectUser(user) {
        this.$emit('selectUser', user);
      },
      formatDate(date) {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .user-list {
    margin-top: 30px;
    text-align: -webkit-center;
  }
  
  .user-list h2 {
    margin-bottom: 15px;
    color: #00ADEF;
  }
  
  .user-list table {
    width: 70%;
    border-collapse: collapse;
  }
  
  .user-list th,
  .user-list td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  .user-list th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  .user-image {
    height: 50px;
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .clickable-row {
    cursor: pointer;
  }
  
  .clickable-row:hover {
    background-color: #f1f1f1;
  }
  </style>
  