import lijst41 from '../../assets/data/gebouwen_1641.json';
import lijst44 from '../../assets/data/gebouwen_1644.json';

import Wais1641 from "../../assets/data/kaart_blaeu_1649.json";
import Wais1644 from "../../assets/data/kaart_hollandiae_oppidum_gouda_1612_1648.json";

let datas = {
  "Wais1641": lijst41,
  "Wais1644": lijst44
}
let styles = {
  "Wais1641": Wais1641,
  "Wais1644": Wais1644
}
let panoramas = {
  "Wais1641": "https://www.goudatijdmachine.nl/data/iiif/2/93730/info.json",
  "Wais1644": "https://www.goudatijdmachine.nl/data/iiif/2/93732/info.json"
}
export default {
  namespaced: true,
  state: {
    data: datas["Wais1641"],
    panorama:  panoramas["Wais1641"],
    mapStyle: styles["Wais1641"],
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
      if (state.mapStyle === styles["Wais1644"]) {
        commit("setMapStyle", styles["Wais1641"])
        commit("setPanorama", panoramas["Wais1641"])
        commit("setDataset", datas["Wais1641"])

      } else if (state.mapStyle === styles["Wais1641"]) {
        commit("setMapStyle", styles["Wais1644"])
        commit("setPanorama", panoramas["Wais1644"])
        commit("setDataset", datas["Wais1644"])

      }
    },
    getGekozenGebouwImages({ commit, state }) {
      
      let sparqlQuery = `
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX dct: <http://purl.org/dc/terms/>
        PREFIX dct: <http://purl.org/dc/terms/>   
        PREFIX wd: <http://www.wikidata.org/entity/> 
        SELECT DISTINCT * WHERE {
          <https://hetutrechtsarchief.nl/id/utrecht-in-perspectief> <https://schema.org/hasPart> ?bb .
          ?bb dct:spatial wd:${state.gekozenGebouw.properties.wdid} .
          ?bb foaf:depiction ?img .
          ?bb rdfs:label ?description .
          ?bb dct:identifier ?catnr .
          ?bb dct:date ?date .

        }
        ORDER BY ?date
        LIMIT 15
      `
      
      fetch("https://data.netwerkdigitaalerfgoed.nl/hetutrechtsarchief/Dataset/sparql/Dataset?query=" + encodeURIComponent(sparqlQuery) ,
        {
          "headers": { "accept": "application/sparql-results+json" }, "method": "GET"
        })
        .then(response => response.json())
        .then(json => {
          if (json.results) {
            commit('fillImageList', json.results.bindings)
          }
        })
    },
    getGekozenGebouwWiki({ commit, state }) {
      // Get wikipedia page from wikidata id
      fetch(
        `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${state.gekozenGebouw.properties.wdid}&sitefilter=nlwiki&props=sitelinks/urls&origin=*&format=json`,
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
    }
  }
}
