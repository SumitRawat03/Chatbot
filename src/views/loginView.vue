<template>
    <h1>Sign in to an account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="register">Submit</button></p>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from 'vue-router';
  
  const email = ref("");
  const password = ref("");
  const errMsg = ref();
  const router = useRouter();
  
  const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        console.log("Successfully signed in !");
        router.push('/feed');
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Invalid email";
            break;
          case "auth/wrong-password":
            errMsg.value = "Incorrect password";
            break;
          default:
            errMsg.value = "Email or password was incorrect";
            break;
        }
        alert(error.message);
      });
  };
  </script>
  