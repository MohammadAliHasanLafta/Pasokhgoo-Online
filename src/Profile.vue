<template>
  <h1 @click="showinfo()" class="onhover">👉Profile</h1>
  <form v-if="activeInfo === true && activeEdit === false">
    <label>First name:</label><br>
    <label class="label">{{ information.name }}</label><br>
    <label>Last name:</label><br>
    <label class="label">{{ information.family }}</label><br>
    <label>National number:</label><br>
    <label class="label">{{ information.n_number }}</label><br>
    <label>Phone number:</label><br>
    <label class="label">{{ information.t_number }}</label><br><br>
    <ul class="prof_ul">
      <li class="prof_li"><button @click="edit()" class="button">📝Edit</button></li>
      <li class="prof_li"><button @click="signout()" class="button">🚪Sign out</button></li>
    </ul>
    <br><br>
  </form>
  <form v-else-if="activeInfo === true && activeEdit === true">
    <label>First name:</label><br>
    <input v-model="name" type="text" :placeholder="information.name" class="input"><br>
    <label>Last name:</label><br>
    <input v-model="family" type="text" :placeholder="information.family" class="input"><br>
    <label>National number:</label><br>
    <input v-model="n_number" type="number" :placeholder="information.n_number" class="input"><br>
    <label>Phone number:</label><br>
    <input v-model="t_number" type="tel" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" class="input" :placeholder="information.t_number"/><br>
    <button @click="save()" class="button">💾Save</button>
    <br><br>
  </form>
  <p v-else-if="activeInfo === false" class="Warninglable">⚠️ You are not logged in yet</p><br>
</template>

<script>

export default{
data(){
  return {
    name : "",
    family : "",
    n_number : "",
    t_number : "",
    information : "",
    activeInfo : null,
    activeEdit : false,
  }
},
methods:{
  showinfo(){
    this.information = JSON.parse(localStorage.getItem("information"));
    if (this.information) {
        this.activeInfo = true
      }
      else{
        this.activeInfo = false
      }
  },
  edit(){
    this.activeEdit = true
  },
  signout(){
    localStorage.clear();
  },
  save(){
    localStorage.clear();
    this.information = {name : this.name, family : this.family, n_number : this.n_number, t_number : this.t_number}
    localStorage.setItem("information", JSON.stringify(this.information));
  }
},
}
</script>
<style>
.prof_ul {
  text-indent: 4px;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.prof_li{
  float: left;
}
.label{
  font-weight: bold;
  font-size: larger;  
}
</style>
