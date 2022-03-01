<template>
  <div>
    <h1>Create a new account</h1>
    <form>
      <div class="inputField">
        <label for="username"
          >Username
          <span style="color: red" v-if="!username.valid">{{
            username.errorMsg
          }}</span>
        </label>
        <input
          autocomplete="off"
          @mousedown="checkUsername"
          @keyup="checkUsername"
          @change="checkUsername"
          :class="{
            form_valid: username.valid,
            form_invalid: !username.valid && !username.empty,
          }"
          type="text"
          id="username"
          v-model="username.value"
          placeholder="Username"
        />
      </div>

      <div class="inputField">
        <label for="password"
          >Password
          <span style="color: red" v-if="!password.valid">{{
            password.errorMsg
          }}</span>
        </label>
        <input
          @mousedown="checkPassword"
          @keyup="checkPassword"
          @change="checkPassword"
          :class="{
            form_valid: password.valid,
            form_invalid: !password.valid && !password.empty,
          }"
          type="password"
          id="password"
          v-model="password.value"
          placeholder="Password"
        />
      </div>

      <div class="inputField">
        <label for="language"
          >Favorite Language
          <span style="color: red" v-if="!language.valid">{{
            language.errorMsg
          }}</span></label
        >
        <select
          name="language"
          id=""
          :class="{
            form_valid: language.valid,
            form_invalid: !language.valid && !language.empty,
          }"
          @mousedown="checkLanguage"
          @change="checkLanguage"
          v-model="language.value"
        >
          <option value="" disabled selected>Favorite Language</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="english">English</option>
          <option value="haskell">Haskell</option>
        </select>
      </div>

      <div class="inputField">
        <label for="wow"
          >World of Warcraft Item Level
          <span style="color: red" v-if="!wow.valid">{{
            wow.errorMsg
          }}</span></label
        >
        <select
          name="wow"
          id=""
          :class="{
            form_valid: wow.valid,
            form_invalid: !wow.valid && !wow.empty,
          }"
          @mousedown="checkWow"
          @change="checkWow"
          v-model="wow.value"
        >
          <option value="" disabled selected>Item Level</option>
          <option value="1">99 or less</option>
          <option value="2">100-299</option>
          <option value="3">300-899</option>
          <option value="4">900 or more</option>
        </select>
      </div>
      <button
        class="create"
        @click.prevent="createAccount"
        :disabled="
          !username.valid || !password.valid || !language.valid || !wow.valid
        "
      >
        Create account
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: {
        valid: false,
        errorMsg: "",
        value: "",
        empty: true,
      },
      password: {
        valid: false,
        errorMsg: "",
        value: "",
        empty: true,
      },
      language: {
        valid: false,
        errorMsg: "",
        value: "",
        empty: true,
      },
      wow: {
        valid: false,
        errorMsg: "",
        value: "",
        empty: true,
      },
      occupiedUsers: ["viktor", "jonas", "oscar", "albin", "ian", "bigboy"],
    };
  },
  methods: {
    checkUsername() {
      this.username.empty = false;
      if (this.username.value.length <= 2) {
        this.username.valid = false;
        this.username.errorMsg =
          "The username has to be at least three characters long";
      } else if (
        this.occupiedUsers.includes(this.username.value.toLowerCase())
      ) {
        this.username.valid = false;
        this.username.errorMsg = "The username is taken";
      } else {
        this.username.valid = true;
      }
    },
    checkPassword() {
      this.password.empty = false;
      if (this.password.value.length <= 7) {
        console.log(this.password.value.length);
        this.password.valid = false;
        this.password.errorMsg =
          "The password has to be at least eight characters long";
      } else {
        this.password.valid = true;
      }
    },
    checkLanguage() {
      this.language.empty = false;

      if (this.language.value == "") {
        this.language.valid = false;
      } else if (this.language.value == "haskell") {
        this.language.errorMsg = "This is not a valid option";
        this.language.valid = false;
      } else {
        this.language.valid = true;
      }
    },
    checkWow() {
      console.log("wow");
      this.wow.empty = false;

      if (this.wow.value == "") {
        this.wow.valid = false;
      } else {
        this.wow.valid = true;
      }
    },
    createAccount() {
      this.$router.push("/login");
      fetch("http://localhost:3000/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          language: this.language,
          wow: this.wow,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // handle data
          console.log(data);
          let wasCreated = true;
          if (wasCreated) {
            // Account was created
            this.$router.push("/eventid");
          }
        });
    },
  },
};
</script>

<style scoped>
.form_valid {
  border: 1px solid darkgreen !important;
  background-color: rgb(177, 224, 177);
}

.form_invalid {
  border: 1px solid darkred !important;
  background-color: rgb(236, 176, 176);
}

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
.inputField input[type="password"],
.inputField select {
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