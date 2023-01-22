import gebouwen41 from '../../assets/data/gebouwen_1641.json';
import gebouwen44 from '../../assets/data/gebouwen_1644.json';

import kaart1648 from "../../assets/data/kaart_blaeu_1649.json";
import kaart1649 from "../../assets/data/kaart_hollandiae_oppidum_gouda_1612_1648.json";

let datas = {
  "stadsgezicht1641": gebouwen41,
  "stadsgezicht1644": gebouwen44
}
let styles = {
  "stadsgezicht1641": kaart1649,
  "stadsgezicht1644": kaart1648
}
let panoramas = {
  "stadsgezicht1641": "https://www.goudatijdmachine.nl/data/iiif/2/93732/info.json",
  "stadsgezicht1644": "https://www.goudatijdmachine.nl/data/iiif/2/93730/info.json"
}
export default {
  namespaced: true,
  state: {
    data: datas["stadsgezicht1644"],
    panorama:  panoramas["stadsgezicht1644"],
    mapStyle: styles["stadsgezicht1644"],
    gekozenGebouwId: "",
    gekozenGebouw: {
      properties: ""
    },
    gekozenGebouwWiki: {
      "images": []
    },
    imageList: {}
  },

  mutations: {

    setGekozenGebouw(state, gekozen) {
      state.gekozenGebouw = state.data[gekozen];
    },
    setGekozenGebouwId(state, gekozen) {
      state.gekozenGebouwId = gekozen;
    },
    GET_WIKI(state, opgehaald) {
      state.gekozenGebouwWiki = opgehaald
    },
    fillImageList(state, list) {
      state.imageList = list
    }
    ,
    setMapStyle(state, mapStyle) {
      state.mapStyle = mapStyle
    },
    setPanorama(state,panorama){
      state.panorama = panorama
    },
    setDataset(state,data){
      state.data = data
    }
  },
  getters: {
    getDataSet : state => {
      return state.data
    },
    getPanormaUrl: state =>{
      return state.panorama
    },
    getMapStyle: state => {
      return state.mapStyle
    },
    getGekozenGebouwId: state => {
      return state.gekozenGebouwId
    },
    getGekozenGebouw: state => {
      return state.gekozenGebouw
    },
    getGekozenGebouwWiki: state => {
      return state.gekozenGebouwWiki
    },
    getImages: state => {
      return state.imageList
    }
  },
  actions: {
    toggleMapStyle({ state, commit }) {
      if (state.mapStyle === styles["stadsgezicht1641"]) {
        commit("setMapStyle", styles["stadsgezicht1644"])
        commit("setPanorama", panoramas["stadsgezicht1644"])
        commit("setDataset", datas["stadsgezicht1644"])

      } else if (state.mapStyle === styles["stadsgezicht1644"]) {
        commit("setMapStyle", styles["stadsgezicht1641"])
        commit("setPanorama", panoramas["stadsgezicht1641"])
        commit("setDataset", datas["stadsgezicht1641"])

      }
    },
     getGekozenGebouwImages({ commit, state }) {
 
      let sparqlQuery = `
        PREFIX o: <http://omeka.org/s/vocabs/o#>
        PREFIX dcterms: <http://purl.org/dc/terms/>

        SELECT * WHERE {
            <${state.gekozenGebouw.properties.pid}> o:media ?o .
            ?o o:original_url ?img .
            ?o o:id ?catnr .
            ?o dcterms:title ?description .
            OPTIONAL { ?o dcterms:date ?date . }
            OPTIONAL { ?o dcterms:source ?source. }
        } limit 15
      `

      fetch("https://www.goudatijdmachine.nl/sparql/repositories/gtm?query=" + encodeURIComponent(sparqlQuery) ,
        {
          "headers": { "accept": "application/sparql-results+json" }, "method": "GET"
        })
        .then(response => response.json())
        .then(json => {
          if (json.results) {
//            console.log(json);
            commit('fillImageList', json.results.bindings)
          }
        })
    },
    getGekozenGebouwWiki({ commit, state }) {
      commit('GET_WIKI', state.gekozenGebouw.properties.wikipedia)

      // Get wikipedia page from wikidata id
      /*
      fetch(
        `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${state.gekozenGebouw.properties.pid}&sitefilter=nlwiki&props=sitelinks/urls&origin=*&format=json`,
        {
          referrerPolicy: "origin-when-cross-origin",
          method: "GET",
          mode: "cors",
          cache: "default"
        }
      )
        .then(response => response.json())
        .then(data => {
          let url = data.entities[Object.keys(data.entities)[0]].sitelinks.nlwiki;
          if (url) {
            fetch(
              `https://nl.wikipedia.org/w/api.php?action=query&format=json&uselang=nl&prop=extracts|description|images&titles=${url.title}&redirects=1&origin=*`,
              {
                referrerPolicy: "origin-when-cross-origin",
                method: "GET",
                mode: "cors",
                cache: "default"
              }
            )
              .then(response => response.json())
              .then(data => {
                commit('GET_WIKI', data.query.pages[Object.keys(data.query.pages)[0]])
              });
          } else {
            commit('GET_WIKI', "")

          }

        });
        */
    }
  }
}
