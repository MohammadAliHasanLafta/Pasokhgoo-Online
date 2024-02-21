<template>
    <h1 @click="isInfo()" class="onhover">👉Sign in</h1>
    <form v-if="active === false">
      <label>First name:</label><br>
      <input v-model="name" type="text" placeholder="Your name.." class="input"><br>
      <label>Last name:</label><br>
      <input v-model="family" type="text" placeholder="Your last name.." class="input"><br>
      <label>National number:</label><br>
      <input v-model="n_number" type="number" pattern="[0-9]{10}" placeholder="Your national number.." class="input"><br>
      <label>Phone number:</label><br>
      <input v-model="t_number" type="tel" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" placeholder="09**-***-****" class="input"><br>
      <button @click="submit()" class="button">📨Submit</button>
    </form>
    <p v-else-if="active === true" class="Warninglable">⚠️ You are already logged in</p><br>
</template>

<script>

export default{
  data(){
    return {
      name : "",
      family : "",
      n_number : "",
      t_number : "",
      active : null,
    }
  },
  methods:{
    submit(){
      const information = {name : this.name, family : this.family, n_number : this.n_number, t_number : this.t_number}
      localStorage.setItem("information", JSON.stringify(information));
    },
    isInfo(){
      const information = JSON.parse(localStorage.getItem("information"));
      if (information) {
        this.active = true
      }
      else{
        this.active = false
      }
    }
  },
}
</script>
<style>
.input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #3CBC8D;
  border-radius: 4px;
  box-sizing:unset;
}
.button{
  color:white;
  background-color: #3CBC8D;
  padding: 8px 10px;
  font-size:larger;
  font-family: 'Times New Roman', Times, serif;
  display: inline-block;
  border:0 solid;
  border-radius: 4px;
  box-sizing:unset;
}
.button:hover{
  background-color:#333;
}
.onhover:hover{
  color:#3CBC8D;
}
</style>
