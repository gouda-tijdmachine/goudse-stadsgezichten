<template>
  <div class="home">
    <Header></Header>
    <div class="colofonbutton">
      <router-link :to="{name: 'Colofon', params:{ id: this.$route.params.id}}">
        <button v-if="this.$route.name !== 'Colofon'" class="button"><img src="../assets/images/icon_info.svg"/></button>
      </router-link>
    </div>
    <Panorama></Panorama>
    <Footer></Footer>
  </div>
</template>

<script>
import Panorama from "../components/Panorama.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import gebouwen_1669 from '../assets/data/gebouwen_1641.json';

export default {
  name: "HomePage",
  components: {
    Panorama,
    Header,
    Footer,
  },
  created() {
    this.$store.commit("data/setGekozenGebouwId", "");
    this.$store.commit("data/setGekozenGebouw", {});
    this.$store.commit("data/setPanorama", "https://www.goudatijdmachine.nl/data/iiif/2/93730/info.json");
    this.$store.commit("data/setDataset", gebouwen_1669);
  },
  watch: {
    gekozenGebouwId() {
      if (this.gekozenGebouwId) {
        this.$store.dispatch("data/getGekozenGebouwWiki");
        this.$store.dispatch("data/getGekozenGebouwImages");
        this.$router.push({
          name: "DrieLuik",
          params: { gebouw: `${this.gekozenGebouwId}` },
        });
      }
    },
  },
  computed: {
    gekozenGebouwId() {
      if (this.$store.getters["data/getGekozenGebouwId"]) {
        return this.$store.getters["data/getGekozenGebouwId"];
      } else {
        return "";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  height: 100vh;
  display: grid;
  grid-template-rows: 96px 24px auto 24px 96px;
  grid-template-columns: 1fr 960px 1fr;
}

.Panorama {
  grid-row: 1 / span 5;
  grid-column: 1 / span 3;
  z-index: 1;
}
.Header {
  grid-row: 1 / 1;
  grid-column: 2 / span 1;
  z-index: 500;
  justify-content: center;
  padding: 0px;
  position: relative;
  box-shadow: 0 2px 6px var(--bijnazwart);
}
.Footer {
  grid-row: 5 / 5;
  grid-column: 2 / span 1;
  position: relative;
  z-index: 500;
  box-shadow: 0 -2px 6px var(--bijnazwart);
}

.colofonbutton {
  grid-row: 1 / 1;
  grid-column: 3 / 3;
  z-index: 2;
  display: flex;
  justify-content: right;
  padding-top: 20px;
  padding-right: 20px;
}

.button {
  background-color: var(--blauw);
  margin: 0 5px 5px 5px;
}

.button:hover {
  background-color: var(--rood);
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  #stylingBalk1,
  #stylingBalk2 {
      opacity: 0.5;
  } 
}
@supports (-ms-ime-align:auto) {
  #stylingBalk1,
  #stylingBalk2 {
      opacity: 0.3;
  } 
}

</style>