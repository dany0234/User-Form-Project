<template>
    <div class="user-details">
      <button @click="$emit('back')" class="back-button">X</button>
      <h2>פרטי משתמש</h2>
      <div class="form-group">
        <label>שם משתמש:</label>
        <p>{{ user.username }}</p>
      </div>
      <div class="form-group">
        <label>אימייל:</label>
        <p>{{ user.email }}</p>
      </div>
      <div class="form-group">
        <label>תאריך לידה:</label>
        <p>{{ formatDate(user.dateOfBirth) }}</p>
      </div>
      <div class="form-group">
        <label>תמונה:</label>
        <img :src="user.image" alt="User Image" class="user-image">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: Object
    },
    methods: {
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
  .user-details {
    margin-top: 30px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    direction: rtl;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .user-image {
    width: 20%;
  }
  
  .back-button {
    background-color: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
    float: left;
    color: #00ADEF;
    font-weight: bold;
  }
  
  .back-button:hover {
    color: #008fc1;
  }
  </style>
  