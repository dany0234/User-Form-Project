<template>
  <div class="user-form-container">
    <form @submit.prevent="handleSubmit" class="user-form">
      <div class="form-group">
        <label for="username">שם משתמש:</label>
        <input type="text" id="username" v-model="username" required @invalid="setCustomMessage($event)"
          @input="clearCustomMessage($event)">
      </div>
      <div class="form-group">
        <label for="email">אימייל:</label>
        <input type="email" id="email" v-model="email" required @invalid="setCustomMessage($event)"
          @input="clearCustomMessage($event)">
      </div>
      <div class="form-group">
        <label for="dob">תאריך לידה:</label>
        <input type="date" id="dob" v-model="dob" required @invalid="setCustomMessage($event)"
          @input="clearCustomMessage($event)">
      </div>
      <div class="form-group">
        <label for="image">תמונה:</label>
        <input type="file" id="image" @change="handleImageUpload" required @invalid="setCustomMessage($event)"
          @input="clearCustomMessage($event)">
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Image Preview">
        </div>
      </div>
      <button type="submit">שלח</button>
    </form>
  </div>
</template>

<script>
import imageCompression from 'browser-image-compression';
import { createUser } from '../services/api';

export default {
  data() {
    return {
      username: '',
      email: '',
      dob: '',
      image: null,
      imagePreview: null
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.image = file;
      this.imagePreview = URL.createObjectURL(file);
    },
    async handleSubmit() {
      try {
        const compressedImage = await imageCompression(this.image, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
        });

        const formData = new FormData();
        formData.append('username', this.username);
        formData.append('email', this.email);
        formData.append('dob', new Date(this.dob).toISOString().split('T')[0]);
        formData.append('image', compressedImage);

        console.log('Sending payload:', {
          username: this.username,
          email: this.email,
          dob: this.dob,
          image: compressedImage,
        });

        await createUser(formData);
        this.$emit('formSubmitted');
        this.clearForm();
      } catch (error) {
        console.error('Error submitting form:', error);
        this.$emit('notification', 'שגיאה ביצירת המשתמש.');
      }
    },
    clearForm() {
      this.username = '';
      this.email = '';
      this.dob = '';
      this.image = null;
      this.imagePreview = null;
    },
    setCustomMessage(event) {
      const input = event.target;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (input.validity.valueMissing) {
        input.setCustomValidity('נא למלא שדה זה');
      } else if (input.type === 'email' && !emailPattern.test(input.value)) {
        input.setCustomValidity('נא להזין כתובת אימייל חוקית');
      } else if (input.validity.typeMismatch) {
        input.setCustomValidity('נא להזין ערך חוקי');
      } else {
        input.setCustomValidity('');
      }
    },
    clearCustomMessage(event) {
      const input = event.target;
      input.setCustomValidity('');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.user-form-container {
  font-family: 'Roboto', sans-serif;
  color: #333;
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.user-form {
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

.form-group input {
  /* width: calc(100% - 22px); */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button {
  background-color: #00ADEF;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #008fc1;
}

.image-preview {
  margin-top: 10px;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
}</style>
