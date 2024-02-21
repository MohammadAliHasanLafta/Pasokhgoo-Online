<template>
  <div id="app">
    <main>
      <div class="logo"><img src="./assets/Picture2.png" /></div>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="عبارت مورد نظر را تایپ کنید"
          v-model="query"
          @keypress="getdata_Enter"
        />
      </div>
      <div class="b-org">
        <button class="b-search" @click="getdata_Click()">
          <i class="pi pi-search"></i>جست وجو
        </button>
        <button class="b-mic" @click="startSpeechToTxt()">
          <i class="pi pi-microphone"></i>صحبت کنید
        </button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      result: {},
      runtimeTranscription_: "",
      transcription_: [],
    };
  },
  methods: {
    getdata_Enter(e) {
      if (e.key == "Enter") {
        this.$router.push({
          name: "searchresult",
          query: { search: this.query, Page: 1, RowsPerPage: 10 },
        });
      }
    },
    getdata_Click() {
      this.$router.push({
        name: "searchresult",
        query: { search: this.query, Page: 1, RowsPerPage: 10 },
      });
    },
    startSpeechToTxt() {
      // initialisation of voicereco

      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new window.SpeechRecognition();
      recognition.lang = "fa-IR";
      recognition.interimResults = true;

      // event current voice reco word
      recognition.addEventListener("result", (event) => {
        var text = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        this.runtimeTranscription_ = text;
      });
      // end of transcription
      recognition.addEventListener("end", () => {
        this.query = this.runtimeTranscription_;
        this.runtimeTranscription_ = "";
        recognition.stop();
      });
      recognition.start();
      console.log(this.query);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  background-image: url("./assets/islamic.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
main {
  min-height: 100vh;

  padding: 25px;

  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.25)
  );
}
.logo {
  display: flex;
  appearance: auto;
  justify-content: center;
  height: 250px;
}
.search-box {
  width: 100%;
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  display: flex;
  appearance: auto;
  justify-content: center;
}
.search-box .search-bar {
  width: 50%;
  padding: 15px;
  direction: rtl;

  color: #313131;
  font-family: "nazanin";
  font-weight: bolder;
  font-size: medium;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.search-box .search-bar:hover {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}
.b-org {
  display: flex;
  justify-content: center;
  direction: rtl;
  font-family: "nazanin";
  font-weight: bold;
  font-size: larger;
}
.b-search {
  font-family: "nazanin";
  font-weight: bold;
  font-size: medium;
  outline: none;
  background-color: #ffb266;
  border: #ffb266;
  transition: 0.4s;
  border-radius: 5px 5px;
  height: 30px;
  width: 100px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  margin-left: 3%;
}
.b-mic {
  font-family: "nazanin";
  font-weight: bold;
  font-size: medium;
  outline: none;
  background-color: #ffb266;
  border: #ffb266;
  transition: 0.4s;
  border-radius: 5px 5px;
  height: 30px;
  width: 100px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
}
@media screen and (max-width: 900px) {
  .logo {
    display: flex;
    appearance: auto;
    justify-content: center;
    height: 120px;
    margin-top: 25%;
  }
  .search-box {
    width: 100%;
    height: 40px;
    margin-top: 4%;
    margin-bottom: 4%;
    display: flex;
    appearance: auto;
    justify-content: center;
  }
  .search-box .search-bar {
    width: 50%;
    padding: 15px;
    direction: rtl;

    color: #313131;
    font-family: "nazanin";
    font-weight: bold;
    font-size: medium;

    appearance: none;
    border: none;
    outline: none;
    background: none;

    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 10px 0px 10px;
    transition: 0.4s;
  }
  .b-search {
    font-family: "nazanin";
    font-weight: bold;
    font-size: small;
    outline: none;
    background-color: #ffb266;
    border: #ffb266;
    transition: 0.4s;
    border-radius: 5px 5px;
    height: 25px;
    width: 70px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    margin-left: 3%;
  }
  .b-mic {
    font-family: "nazanin";
    font-weight: bold;
    font-size: small;
    outline: none;
    background-color: #ffb266;
    border: #ffb266;
    transition: 0.4s;
    border-radius: 5px 5px;
    height: 25px;
    width: 70px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  }
  .b-search:hover {
    background-color: rgba(255, 255, 255, 0.75);
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    border-radius: 0px 5px 0px 5px;
  }
  .b-mic:hover {
    background-color: rgba(255, 255, 255, 0.75);
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    border-radius: 5px 0px 5px 0px;
  }
}
.b-search:hover {
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  border-radius: 0px 16px 0px 16px;
}
.b-mic:hover {
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  border-radius: 16px 0px 16px 0px;
}
</style>
