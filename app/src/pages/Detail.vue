<template>
  <div class="Detail">
    <Header></Header>
    <div class="info">
      <h1><a target="gtm" href="{{gekozenGebouw.properties.pid}}">{{gekozenGebouwId}}</a></h1>
      <p>
        <span v-html="wiki.extract"></span>
      </p>
      <button
        class="button"
        id="wiki"
        type="button"
        onclick="location.href='{{gekozenGebouw.properties.pid}}'"
      >Meer in de Gouda Tijdmachine</button>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Detail",
  components: {
    Header,
  },
  state: {
    wiki: {},
    gebouw: {},
  },
  computed: {
    gekozenGebouw() {
      return this.$store.getters["data/getGekozenGebouw"];
    },
    gekozenGebouwId() {
      return this.$store.getters["data/getGekozenGebouwId"];
    },
    wiki() {
      return this.$store.getters["data/getGekozenGebouwWiki"];
    },
    images() {
      return this.$store.getters["data/getImages"];
    },
  },
};
</script>

<style scoped>
.Detail {
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 50px 1fr;
}
.Header {
  grid-row: 1 / span 1;
  grid-column: 1 / span 2;
}
.Afb {
  grid-row: 2 / 2;
  grid-column: 1 / span 1;
  background-color: var(--bruin);
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
}
.info {
  grid-row: 2 / 2;
  grid-column: 2 / span 1;
  text-align: left;
  padding: 50px;
  line-height: 4em;
}
.button {
  display: block;
}

h1 {
  color: var(--blauw);
}

span {
  line-height: normal;
}

#wiki {
  background-color: var(--blauw);
}

</style>
