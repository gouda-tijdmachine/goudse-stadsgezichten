<template>
  <div class="Colofon">
    <Header></Header>
    <div class="gekleurdeBalk" id="gekleurdeBalk1"></div>
    <div class="Afb"></div>
    <div class="info">
      <h1>Over dit project</h1>
      <p>De Goudse stadsgezichten is een initiatief van de <a href="https://www.goudatijdmachine.nl/" target="_blank">Gouda Tijdmachine</a>, waarin 17e eeuwse stadsgezichten, kaarten een beeldmateriaal zijn gekoppeld.</p>
      <p>Dit project is geïnspireerd en gebaseerd op <a href="https://utrechtinperspectief.nl/" target="_blank">Utrecht in Perspectief</a>. Het ontwerp en realisatie van Utrecht in Perspectief lag bij <a href="https://www.hicsuntleones.nl/" target="_blank">Hic Sunt Leones</a>, <a href="https://www.uu.nl/bijzondere-collecties" target="_blank">Marco van Egmond</a> en het <a href="https://hetutrechtsarchief.nl/" target="_blank">Het Utrechts Archief</a>. De applicatie is mede mogelijk gemaakt door het <a href="https://www.mondriaanfonds.nl/" target="_blank">Mondriaanfonds</a>.</p>

      <h2>Stadsgezichten en kaartmateriaal</h2>
      <ul>
        <li><strong>Gezicht op Gouda met op de voorgrond een pijp rokende man</strong> - Tekening met stadsaanzicht van Gouda vanuit het zuiden, vervaardigd door Aert van Waes en gepubliceerd in 1641. Herkomst: <a href="https://rkd.nl/explore/images/305233" target="_blank">RKDimages</a>.</li>
        <li><strong>>Hollandiae oppidum Gouda, accuratissimé ad vivum delineatum, et aeri incisum (bij het stadsgezicht uit 1641)</strong> - Plattegrond van Gouda, vervaardigd door Claes Jansz. Visscher (II) tussen 1612 en 1648. Herkomst: <a href="http://hdl.handle.net/10934/RM0001.COLLECT.393818" target="_blank">Rijksmuseum</a>.</li>
        <li><strong>Gezicht op Gouda vanaf de overzijde van de Hollandse IJssel</strong> - Tekening met stadsaanzicht van Gouda vanuit het zuid-oosten, vervaardigd door Aert van Waes en gepubliceerd in 1644. Herkomst: <a href="https://rkd.nl/explore/images/231532" target="_blank">RKDimages</a>.</li>
        <li><strong>Plattegrond van Gouda door Joan Blaeu (bij het stadsgezicht uit 1644)</strong> - Plattegrond van Gouda, uitgegeven door Joan Blaeu in 1649. De plattegrond steunt niet op geometrisch veldwerk en is meetkundig niet overal betrouwbaar. Herkomst: <a href="https://commons.wikimedia.org/wiki/File:BlaeuGouda.jpg" target="_blank">Wikimedia Commons</a>.</li>
      </ul>
      <h2>GitHub</h2>
      <p>Dit project is gebouwd met open source software en te bekijken op de GitHub pagina van de Gouda Tijdmachine. Op deze manier kunnen naast het archief, ook andere ontwikkelaars en erfgoedinstellingen er gebruik van maken.</p>
      <button
        class="button"
        id="github"
        type="button"
        onclick="location.href='https://github.com/gouda-tijdmachine/goudse-stadsgezichten'"
      >Bekijk op GitHub</button>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Colofon",
  components: {
    Header
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Colofon {
  height: 100vh;
  display: grid;
  grid-template-columns: 320px repeat(2, 1fr);;
  grid-template-rows: 56px repeat(2, 8px);
  overflow-x: hidden;
}
.Header {
  grid-row: 1 / span 2;
  grid-column: 1 / span 3;
}

.Colofon .Header .router-link-exact-active.router-link-active {
  display: none;
}
.gekleurdeBalk {
  grid-row: 2 / span 2;
  grid-column: 2 / span 2;
  background: var(--rood);
  z-index: 10;
  justify-self: stretch;
  align-self: stretch;
}
.Afb {
  grid-row: 3 / span 4;
  grid-column: 1 / span 1;
  background: url("../assets/images/waterpoort_1862_crop.jpg") no-repeat center;
  background-size: cover;
}
.info {
  grid-row: 4 / span 3;
  grid-column: 2 / span 2;
  text-align: left;
  padding: 40px 320px 70px 70px;
}

.info li {
  margin-left: 20px;
}

.Header a {
  color: var(--wit);
}

a {
  color: var(--blauw);
}

p, ul, table {
  margin: 10px 0px;
}
h2 {
  margin-top: 24px;
}
td {
  padding-right: 30px;
}
.text-styling, table, ul {
  margin-left: 20px;
}

.button {
  display: block;
  margin: 20px 0px;
}

#github {
  background-color: var(--blauw);
}

.logos {
  margin: 36px 20px 12px 20px;  
}

/* RESPONSIVENESS */

@media (min-width: 3000px) {

  .info {
    font-size: 2em;
    padding: 120px 320px 120px 120px;
  }
  .info li {
    margin-left: 60px;
  }

  p, ul {
    margin: 24px 0px;
  }
  h2 {
    margin-top: 48px;
  }
  .button {
    font-size: 0.9em;
    margin: 40px 0px;
  }
}
</style>