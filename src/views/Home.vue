<template>
  <div class="home">
    <h1>Meet-a-geek.com</h1>
    <p>Are you a geek? Can't get laid? Look no further!</p>
    <p>Sign in or create an account to continue.</p>
    <form>
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
      <button class="login" @click.prevent="login" :disabled="!validInputData">
        Log in
      </button>
      <button class="create" @click.prevent="$router.push('/create-account')">
        Create account
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
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
    checkCredentials(user, pass) {
      // TODO: CHECK USER CREDENTIALS
      return user === "viktor" && pass === "wow";
    },

    login() {
      if (!this.checkInputValues()) {
        this.errorMessage = "Username and password fields cannot be empty";
        this.invalidInput = true;
      } else if (this.checkCredentials(this.username, this.password)) {
        // TODO: LOGIN CREDENTIALS ARE CORRECT -> CONTINUE
        this.$router.push("/eventid");
      } else {
        this.errorMessage = "Login credentials are incorrect";
        this.invalidInput = true;
      }
    },
  },
};
</script>

<style scoped>
.home {
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