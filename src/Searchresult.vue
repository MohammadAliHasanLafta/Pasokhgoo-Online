<template>
  <div class="page-loader" v-if="!isloaded">
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
  </div>
  <div id="app">
    <main class="main">
      <ul>
        <li>
          <a>
            <div class="logo" @click="gohome()">
              <img src="./assets/Picture2.png" />
            </div>
          </a>
        </li>
        <li>
          <a>
            <div class="search-box">
              <input
                type="text"
                class="search-bar"
                placeholder="عبارت مورد نظر را تایپ کنید"
                v-model="query"
                @keypress="getData"
              />
            </div>
          </a>
        </li>
      </ul>
      <div
        class="showRes"
        v-if="result && isloaded"
        v-for="res in All_result"
        style="direction: rtl"
      >
        <i class="pi pi-comment"><div v-html="res.Q" class="fontQ"></div></i>
        <hr style="color: azure" />
        <i class="pi pi-pencil"><div v-html="res.A" class="fontA"></div></i>
        <br /><br />
        <i class="gender">{{ gender[res.gender - 1] }}</i>
        <i class="age">سن :{{ res.age }}</i>
        <i class="system">سیستم :{{ res.system }}</i>
        <i class="subject">موضوع :{{ res.subject }}</i>
      </div>
      <div class="page">
        <i>
          <Paginator
            class="paginator"
            :rows="10"
            :totalRecords="120"
            :rowsPerPageOptions="[10, 20, 30, 60]"
            :template="CurrentPageReport"
            @page="anotherPage"
          >
          </Paginator>
        </i>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
export default {
  data() {
    return {
      route: useRoute(),
      query: "",
      result: [],
      All_result: [],
      gender: ["👨", "👩", "👤"],
      isloaded: false,
      fromPage: 0,
      endOfPage: 10,
      back: 0,
      page: 1,
      rows: 10,
    };
  },
  created() {
    this.search(this.route.query.search);
  },
  methods: {
    gohome() {
      this.$router.push({
        path: "/",
      });
    },
    search(searchvalue) {
      if (searchvalue === this.route.query.search) {
        this.back--;
      }
      this.isloaded = false;
      axios
        .post("https://searchapi.pasokhgoo.ir/Search/search", {
          query: searchvalue,

          from: this.fromPage,
          to: this.endOfPage,
        })
        .then((res) => this.ChangeResult(res.data))

        .catch((err) => console.log(err));
      this.All_result = [];
      console.log(this.isloaded);
    },
    getData(e) {
      if (e.key == "Enter") {
        this.$router.push({
          path: this.$route.path,
          query: {
            search: this.query,
            page: this.page,
            RowsPerPage: this.rows,
          },
        });
        this.back--;
        this.fromPage = 0;
        this.endOfPage = 10;
        this.search(this.query);
        console.log(this.page);
      }
    },
    ChangeResult(data) {
      const systems = [
        {
          ID: 1,
          Title: " مدیریت",
        },
        {
          ID: 2,
          Title: "تلفنی",
        },
        {
          ID: 3,
          Title: "متنی",
        },
        {
          ID: 4,
          Title: " گفتگوی آنلاین",
        },
        {
          ID: 5,
          Title: "ارزیابی",
        },
        {
          ID: 6,
          Title: " پیامک",
        },
        {
          ID: 7,
          Title: "صندوق صوتی",
        },
        {
          ID: 8,
          Title: "پاسخگویی انجمن",
        },
        {
          ID: 9,
          Title: "جوامع مجازی",
        },
        {
          ID: 10,
          Title: "برگزیده",
        },
        {
          ID: 11,
          Title: "سامانه مدیریت فایلها",
        },
        {
          ID: 12,
          Title: " کیف پول",
        },
      ];
      const subjects = [
        {
          ID: 1,
          Title: "فقه و احکام",
        },
        {
          ID: 2,
          Title: "تاریخ",
        },
        {
          ID: 3,
          Title: "کلام و اعتقادات",
        },
        {
          ID: 4,
          Title: "قرآن",
        },
        {
          ID: 5,
          Title: "حدیث",
        },
        {
          ID: 6,
          Title: "اخلاق",
        },
        {
          ID: 7,
          Title: "مشاوره",
        },
        {
          ID: 8,
          Title: "فنی",
        },
        {
          ID: 9,
          Title: "اجرایی",
        },
        {
          ID: 10,
          Title: "مدیریت",
        },
        {
          ID: 11,
          Title: "سیاسی",
        },
      ];
      for (let index = 0; index < data.Results.length; index++) {
        const All_Inf = {
          id: index,
          A: data.Results[index].HighlightedText.AText,
          Q: data.Results[index].HighlightedText.QText,
          A_source: data.Results[index].Source.AText,
          Q_source: data.Results[index].Source.QText,
          gender: data.Results[index].Source.gender,
          age: data.Results[index].Source.age,
          marja: data.Results[index].Source.marja,
          system: data.Results[index].Source.systemID,
          subject: data.Results[index].Source.subjectID,
        };
        systems.forEach((element) => {
          if (All_Inf.system == element.ID) {
            All_Inf.system = element.Title;
          }
        });
        subjects.forEach((element) => {
          if (All_Inf.subject == element.ID) {
            All_Inf.subject = element.Title;
          }
        });
        this.isloaded = true;
        this.All_result.push(All_Inf);
        console.log(this.back);
      }
    },
    anotherPage(data) {
      this.$router.push({
        path: this.$route.path,
        query: {
          search: this.route.query.search,
          Page: data.page + 1,
          RowsPerPage: data.rows,
        },
      });
      this.back++;
      this.fromPage = data.page * data.rows;
      this.endOfPage = (data.page + 1) * data.rows;
      this.All_result = [];
      this.search(this.route.query.search);
    },
  },
};
</script>

<style lang="scss" scoped>
$colors: #fdd8b4c0, #ffb366c0, #fd9b3ac0, #ff8000c0;
@font-face {
  font-family: "nazanin";
  src: url("./assets/BNazanin.woff") format("woff");
}
.page-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url("./assets/Res-islamic\ \(2\).jpg");
  background-position: bottom;
  transition: 0.4s;
  z-index: 999;
}
.cube {
  width: 40px;
  height: 40px;
  margin-right: 10px;

  @for $i from 1 through length($colors) {
    &:nth-child(#{$i}) {
      background-color: nth($colors, $i);
      box-shadow: 0px 0px 8px rgb(49, 49, 40);
    }
  }

  &:first-child {
    animation: left 1s infinite;
  }
  &:last-child {
    animation: right 1s infinite 0.5s;
  }
}
@keyframes left {
  40% {
    transform: translateX(-60px);
  }
  50% {
    transform: translateX(0);
  }
}
@keyframes right {
  40% {
    transform: translateX(60px);
  }
  50% {
    transform: translateX(0);
  }
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  background-image: url("./assets/Res-islamic\ \(2\).jpg");
  background-position: bottom;
  transition: 0.4s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
.main {
  min-height: 100vh;
  padding: 25px;

  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.25)
  );
}
.showRes {
  width: 100%;
  padding: 10px;
  color: #313131;

  appearance: none;
  border: #313131;
  outline: invert;
  background: none;

  background-size: cover;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 16px 16px 16px 16px;
  transition: 0.4s;
  margin-bottom: 2%;
}
.showRes:hover {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
}
.fontQ {
  font-family: "nazanin";
  font-size: larger;
  font-weight: bold;
  color: saddlebrown;
}
.fontA {
  font-family: "nazanin";
  font-size: large;
  font-weight: bold;
}
.logo {
  display: flex;
  height: 100px;
  margin-left: 0%;
}
.logo:hover {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 20%;
}
.search-box {
  margin-top: 7%;
  margin-bottom: 2.5%;
  margin-right: 6%;
}
.search-box .search-bar {
  width: 600px;
  height: 0%;
  padding: 2%;
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
  border-radius: 16px;
  transition: 0.4s;
}
.search-box .search-bar:hover {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
li {
  float: right;
}
li a {
  position: relative;
}
.age {
  color: black;
  font-family: "nazanin";
  font-weight: bold;
  font-size: medium;
  background-color: #ffb266;
  border-radius: 6px;
  font-style: normal;
  margin-left: 2%;
}
.gender {
  margin-left: 2%;
  font-style: normal;
}
.system {
  color: black;
  font-family: "nazanin";
  font-weight: bold;
  font-size: medium;
  width: fit-content;
  background-color: #ffb266;
  border-radius: 6px;
  font-style: normal;
  margin-left: 2%;
}
.subject {
  color: black;
  font-family: "nazanin";
  font-weight: bold;
  font-size: medium;
  background-color: #ffb266;
  border-radius: 6px;
  font-style: normal;
  margin-left: 2%;
}
@media screen and (max-width: 900px) {
  .fontQ {
    font-family: "nazanin";
    font-size: medium;
    font-weight:bold;
    color: saddlebrown;
  }
  .fontA {
    font-family: "nazanin";
    font-size: medium;
    font-weight: normal;
  }
  .logo {
    display: flex;
    height: 60px;
  }
  .search-box {
    display: flex;
    justify-content: center;
    margin-top: 5%;
    margin-bottom: 5%;
    margin-right: 4.5%;
  }
  .search-box .search-bar {
    width: 300px;
    height: 0%;
    padding: 2%;
    direction: rtl;

    color: #313131;
    font-family: "nazanin";
    font-weight: bold;
    font-size: small;

    appearance: none;
    border: none;
    outline: none;
    background: none;

    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    transition: 0.4s;
  }
  .age {
    color: black;
    font-family: "nazanin";
    font-weight: bold;
    font-size: small;
    background-color: #ffb266;
    border-radius: 6px;
    font-style: normal;
    margin-left: 2%;
  }
  .gender {
    margin-left: 2%;
    font-style: normal;
  }
  .system {
    color: black;
    font-family: "nazanin";
    font-weight: bold;
    font-size: small;
    width: fit-content;
    background-color: #ffb266;
    border-radius: 6px;
    font-style: normal;
    margin-left: 2%;
  }
  .subject {
    color: black;
    font-family: "nazanin";
    font-weight: bold;
    font-size: small;
    background-color: #ffb266;
    border-radius: 6px;
    font-style: normal;
    margin-left: 2%;
  }
}
.paginator {
  display: flex;
  justify-content: center;
}
</style>
