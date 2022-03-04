<template>

  <div class="background">
  <div class="geekreview" >
    <h1 class="header">Geek Review</h1>
    <div style="padding: 20px">
      <UserCard></UserCard>
    </div>
    <div class="inputField">
      <label for="meet">
        Did the geek have sufficient carisma skill?
      </label>
      <select
        name="q1">
        <option value="" disabled selected> </option>
      <option value="YES" >YES</option>
      <option value="NO"> NO</option>
      </select>
    </div>

    <div class="inputField">
      <label for="q1">
        Did the geek have sufficient carisma skill?
      </label>
      <select
          name="q1">
        <option value="" disabled selected> </option>
        <option value="YES" >YES</option>
        <option value="NO">NO</option>
        <option value="Maybe">MAYBE/DONT KNOW</option>
      </select>
    </div>

    <div class="inputField">
      <label for="q2">
        Did the geek have a satisfactory main programing language?
      </label>
      <select
          name="q2">
        <option value="" disabled selected> </option>
        <option value="YES" >YES</option>
        <option value="NO">NO</option>
        <option value="Maybe">MAYBE/DONT KNOW</option>
      </select>
    </div>

    <div class="inputField">
      <label for="q3">
        Did the geek have sufficient knowlege in Emacs shortcuts?
      </label>
      <select
          name="q3">
        <option value="" disabled selected> </option>
        <option value="YES" >YES</option>
        <option value="NO">NO</option>
        <option value="Maybe"> MAYBE/DONT KNOW</option>
      </select>
    </div>

    <div class="inputField">
      <label for="q4">
        Did the geek seem to have showered in the last day?
      </label>
      <select
          name="q4">
        <option value="" disabled selected> </option>
        <option value="YES" >YES</option>
        <option value="NO"> NO</option>
        <option value="Maybe"> MAYBE/DONT KNOW</option>
      </select>
    </div>

    <div class="inputField">
      <label for="q5">
        Did the geek behave, and look, in accordance with his profile?
      </label>
      <select
          name="q5">
        <option value="" disabled selected> </option>
        <option value="YES" >YES</option>
        <option value="NO"> NO</option>
        <option value="Maybe"> MAYBE/DONT KNOW</option>
      </select>
    </div>
    <div style="padding: 10px">
      <standard_button @click="onDone" >Submit!</standard_button>
    </div>
    <br>
  </div>
  </div>
</template>

<script>
import standard_button from "@/components/standard_button";
import UserCard from "@/components/UserCard";
export default {
  name: "GeekReview",
  components: {standard_button,UserCard},
  methods: {
    onDone(){
      //Server push information...
      this.$router.push("/loading");

    },
    changeColorOnClick(){
    }

  }
}
</script>

<style scoped>

.header {
  font-size: 250%;
  margin: 20px 0  ;
}

.inputField label {
  font-size: 12pt;
  display: block;
  margin-left: 10px;
  
}

.inputField {
  text-align: center;
  font-size: 12pt;
  width: 100%;
}

.inputField input [type="text"]{
  width: 100px;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #bbb;
  font-size: 12pt;
}

.background {
  padding-top: 50px;
  margin-outside: 20px;
  padding-bottom: 20px;
}


h1 {
  border-bottom: 2px solid #ccc;
  align-self: center;
}
button:hover, a:hover {
  color: red;
}
</style>