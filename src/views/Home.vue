<template>
  <div class="home">
    <h1>Meet-a-geek.com</h1>
    <p>Are you a geek? Can't get laid? Look no further!</p>
    <p>Sign in or create an account to continue.</p>
    <div v-if="loginPending">
      <p><center>Logging in...</center></p>
    </div>
    <form v-else>
      <div v-if="invalidInput" class="error">{{ errorMessage }}</div>
      <div class="inputField">
        <label for="username">Username</label>
        <input
          @keyup="checkInputValues"
          type="text"
          id="username"
          v-model="username"
          placeholder="Username"
        />
      </div>

      <div class="inputField">
        <label for="password">Password</label>
        <input
          @keyup="checkInputValues"
          type="password"
          id="password"
          v-model="password"
          placeholder="Password"
        />
      </div>
      <div class="fix-padding">
        <button
          class="login"
          @click.prevent="login"
          :disabled="!validInputData"
        >
          Log in
        </button>
        <button class="create" @click.prevent="$router.push('/create-account')">
          Create account
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      navigated: false,
      loginPending: false,
      username: "",
      password: "",
      invalidInput: false,
      errorMessage: "",
      validInputData: false,
    };
  },
  methods: {
    checkInputValues() {
      return (this.validInputData =
        this.username.length > 0 && this.password.length > 0);
    },
    async checkCredentials() {
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.access === true && !this.navigated) {
            this.navigated = true;
            this.$router.push(`/eventid?id=${data.id}`);
          } else {
            this.loginPending = false;
            this.errorMessage = "Login credentials are incorrect";
            this.invalidInput = true;
          }
        });
    },

    login() {
      this.loginPending = true;
      if (!this.checkInputValues()) {
        this.errorMessage = "Username and password fields cannot be empty";
        this.invalidInput = true;
      } else {
        this.checkCredentials();
      }
    },
  },
};
</script>

<style scoped>
.home {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 50px;
}

h1 {
  border-bottom: 2px solid #ccc;
}
 
.error {
  border: 1px solid red;
  background-color: rgb(253, 212, 212);
  color: red;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.inputField {
  text-align: left;
  width: 100%;
  padding: 0 10px;
}

.inputField label {
  font-size: 10pt;
  display: block;
  margin-left: 10px;
}

.inputField input[type="text"],
.inputField input[type="password"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #bbb;
  font-size: 12pt;
}

button + button {
  margin-top: 10px;
}

button {
  outline: 0;
  width: 100%;
  padding: 10px;
  border: 0;
  border-radius: 5px;
}
.fix-padding {
  padding: 0 10px;
}

button:not(:disabled).login {
  background: green;
}

button.create {
  background: blue;
}

button:not(:disabled) {
  color: white;
}

button:disabled {
  background: lightgrey;
  color: darkgrey;
}

button:not(:disabled):hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
