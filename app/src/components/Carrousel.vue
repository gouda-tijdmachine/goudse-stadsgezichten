<template>
  <div class="Carrousel">
    <div id="left">
      <h1>{{gebouw.properties.label}}</h1>
      <p>{{gebouw.properties.description}}</p>
      <!--
      <ul v-if="gebouw.properties.types" id="gebouwfuncties">
        <li v-for="type in gebouw.properties.types" :key="type">{{ type }}</li>
      </ul>
      <p>Gebouwd in {{gebouw.properties.built_in}}</p>
      <p v-if="gebouw.properties.demolished_in">Verdwenen in {{gebouw.properties.demolished_in}}</p>
      <p v-if="gebouw.properties.users">Gebruikt door {{gebouw.properties.users}}</p>
      <p v-if="gebouw.properties.uses">Gebruikt voor {{gebouw.properties.uses}}</p>-->

      <!-- <router-link v-if="wiki" :to="{name: 'Detail', params:{ id:$route.params.id}}">
        <button class="button" id="meer">Ontdek meer over dit gebouw</button>
      </router-link> -->
      <p v-if="gebouw.properties.wikipedia" class="wikilink"><a :href="gebouw.properties.wikipedia" target="_blank" >Meer info ...</a></p>
    </div>
    <div id="right">
      <CoolLightBox
        :items="imagesList"
        :fullScreen="true"
        :index="index"
        @close="index = null"
        srcName="src"
      ></CoolLightBox>

      <Carousel
        class="images-wrapper"
        v-if="images.length >=1"
        :scrollPerPage="true"
        :perPageCustom="[[480, 2], [768, 3], [1000,4]]"
        paginationActiveColor="#3991b1"
        paginationColor="#ffffff"
        :centerMode="false"
        :paginationPadding="2"
      >
        <Slide
          v-for="(item, itemIndex) in images"
          :key="'slide'+itemIndex"
          :data-index="item.id"
          :data-name="item.id"
          :src="item.img"
        >
          <img
            class="image"
            :src="item.img"
            :key="itemIndex"
            :alt="item.title"
            v-tooltip.top="item.title"
            @click="setIndex(itemIndex)"
          />
        </Slide>
      </Carousel>
      <div v-else class="replacement">Nog geen afbeeldingen beschikbaar</div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  name: "Carrousel",
  components: {
    Carousel,
    Slide,
    CoolLightBox,
  },
  data() {
    return {
      index: null,
    };
  },
  computed: {
    gebouw() {
      return this.$store.getters["data/getGekozenGebouw"];
    },
    images() {
      return this.$store.getters["data/getImages"];
    },
    imagesList() {
      // Specific list for CoolLightBox
      let list = [];

      if (this.$store.getters["data/getImages"].length >= 1) {
        let all = this.$store.getters["data/getImages"];
        all.forEach((element) => {
          list.push({
            src: element.img.replace("original", "large").replace("png", "jpg"),
            title: element.title,
          });
        });
      }

      return list;
    },
    wiki() {
      return this.$store.getters["data/getGekozenGebouwWiki"];
    },
  },
  methods: {
    setIndex(index) {
      this.index = index;
    },
  },
  watch: {},
};
</script>

<style scoped>

.wikilink {
  line-height: 24px;
  padding-top: 10px;
}

.wikilink a,
.wikilink a:visited,
.wikilink a:hover,
.wikilink a:active  {
  color: #fff;
  font-weight: bold;
  background-color: var(--blauw);
  padding: 10px;
}

.Carrousel {
  display: grid;
  grid-template-columns: 35vw 65vw;
  grid-template-rows: 1fr;
  color: var(--wit);
  background-color: var(--bruin);
  overflow-y: hidden;
  overflow-x: hidden;
}

#left {
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  margin: 15px; 
  text-align: left;
}

#right {
  color: var(--blauw);
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
  justify-self: stretch;
  align-self: stretch;
}

h1 {
  color: var(--wit);
  font-size:2em;  /* 4vw klein */
}

p {
  margin-top: 10px;
  margin-bottom: 20px;
}

@media (max-width:700px) {
  h1 {
    color: var(--wit);
    font-size:5vw;
  }
  p {
    display:none;

  }
  p.wikilink {
    position:absolute;
    bottom:20px;
    display:block;
    font-size:4vw;
    }
}

.images-wrapper {
  margin-top: 8px !important;
}

.VueCarousel-pagination {
  bottom: 0;
}
.VueCarousel-dot-container {
  margin-top: 0 !important;
}
.VueCarousel-dot {
  margin: 0px !important;
}

.VueCarousel-slide {
  text-align: center;
  height: 25vh;
}
.images-wrapper{
  padding: 0;
  margin:0;
}

img {
  margin: 8px 8px 0px 0px;
  height: 25vh;
  width: auto;
}

.replacement { padding:90px; color: var(--wit)}
</style>