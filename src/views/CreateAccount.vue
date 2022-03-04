<template>
  <div class="createContainer">
    <h1>Create a new account</h1>
    <div v-if="formComplete">
      <h2>Woho! Your account is created!</h2>
      <p>You will be directed to the login page shortly.</p>
    </div>
    <form v-else>
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
        <label for="fullname"
          >Your name
          <span style="color: red" v-if="!fullname.valid">{{
            fullname.errorMsg
          }}</span>
        </label>
        <input
          autocomplete="off"
          @mousedown="checkFullname"
          @keyup="checkFullname"
          @change="checkFullname"
          :class="{
            form_valid: fullname.valid,
            form_invalid: !fullname.valid && !fullname.empty,
          }"
          type="text"
          id="fullname"
          v-model="fullname.value"
          placeholder="Your name"
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

      <div class="inputField">
        <label for="gender"
          >Gender
          <span style="color: red" v-if="!gender.valid">{{
            gender.errorMsg
          }}</span></label
        >
        <select
          name="gender"
          :class="{
            form_valid: gender.valid,
            form_invalid: !gender.valid && !gender.empty,
          }"
          @mousedown="checkGender"
          @change="checkGender"
          v-model="gender.value"
        >
          <option value="" disabled selected>Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="centaur">Centaur</option>
        </select>
      </div>

      <div class="inputField">
        <label for="picture"
          >Picture
          <span style="color: red" v-if="!picture.valid">{{
            picture.errorMsg
          }}</span></label
        >
        <input type="file" disabled />
      </div>

      <button
        class="create"
        @click.prevent="createAccount"
        :disabled="
          !username.valid ||
          !password.valid ||
          !fullname.valid ||
          !language.valid ||
          !wow.valid ||
          !gender.valid
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
      formComplete: false,
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
      fullname: {
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
      gender: {
        valid: false,
        errorMsg: "",
        value: "",
        empty: true,
      },
      picture: {
        valid: false,
        errorMsg: "This is a VIP only feature",
        value: "",
        empty: false,
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
        this.password.valid = false;
        this.password.errorMsg =
          "The password has to be at least eight characters long";
      } else {
        this.password.valid = true;
      }
    },
    checkFullname() {
      this.fullname.empty = false;
      if (this.fullname.value.length < 1) {
        this.fullname.valid = false;
        this.fullname.errorMsg = "Add your name";
      } else {
        this.fullname.valid = true;
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
      this.wow.empty = false;

      if (this.wow.value == "") {
        this.wow.valid = false;
      } else {
        this.wow.valid = true;
      }
    },
    checkGender() {
      this.gender.empty = false;

      if (this.gender.value == "") {
        this.gender.valid = false;
      } else if (this.gender.value == "centaur") {
        this.gender.errorMsg = "How did you get in here?";
        this.gender.valid = false;
      } else {
        this.gender.valid = true;
      }
    },
    createAccount() {
      fetch("http://localhost:3000/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username.value,
          password: this.password.value,
          fullname: this.fullname.value,
          language: this.language.value,
          wow: this.wow.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data["created"] == true) {
            this.formComplete = true;
            setTimeout(() => {
              this.$router.push("/");
            }, 4000);
          }
        });
    },
  },
};
</script>

<style scoped>
.createContainer {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 50px;
}

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
.inputField select,
.inputField input[type="file"] {
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