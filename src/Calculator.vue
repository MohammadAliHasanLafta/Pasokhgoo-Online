<template>
    <h1 @click="isInfo()" class="onhover">👉Calculator</h1>
    <p v-if="active === true">
      <input v-model="number1" type="number" class="input"/>
      <ul class="prof_ul">
        <li class="prof_li"><button @click="sum()" class="button">➕</button></li>
        <li class="prof_li"><button @click="sub()" class="button">➖</button></li>
        <li class="prof_li"><button @click="mul()" class="button">❌</button></li>
        <li class="prof_li"> <button @click="div()" class="button">➗</button></li>
      </ul>
      <input v-model="number2" type="number" class="input"/>
      <button @click="equal()" class="button">=</button>
      <p class="label">{{ show }}</p>
      <div><button @click="clear()" class="button">Clear</button></div>
    </p>
    <p v-else-if="active === false" class="Warninglable">⚠️ You are not logged in yet</p><br>
</template>

<script>
export default{
  data(){
    return {
      number1 : null,
      number2 : null,
      answer : null,
      mark : null,
      show : null,
      active : null,
    }
  },
  methods:{
    sum(){
       this.mark = "+"
     },
     sub(){
       this.mark = "-"
     },
     mul(){
       this.mark = "*"
     },
     div(){
       this.mark = "/"
     },
     equal(){
        switch (this.mark) {
          case "+" :
            this.answer = this.number1 + this.number2;
            break;
          case "-" :
            this.answer = this.number1 - this.number2;
            break;
          case "*" :
            this.answer = this.number1 * this.number2;
            break;
          case "/" :
            this.answer = this.number1 / this.number2;
            break;
          default:
            break;
       }
       this.show = this.answer
     },
     clear(){
       this.number1 = null
       this.number2 = null
       this.answer = null
       this.mark = null
       this.show = null
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
