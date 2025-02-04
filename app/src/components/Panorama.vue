<template>
  <div class="Panorama">
    <LMap
      ref="map"
      :minZoom="this.$route.name === 'DrieLuik' ? 1: 1"
      :maxZoom="6"
      :zoom="this.$route.name === 'DrieLuik' ? 1 : 3"
      :crs="crs"
      :center="center"
      :options="{
        attributionControl: false,
        zoomControl: false,
      }"
      @ready="onLoad"
    >
      <l-iiif :url="iiifUrl" :options="iiifOpts" />
      <l-control-zoom position="topright"></l-control-zoom>
      <l-rectangle
        v-for="(gebouw, name) in this.gebouwen"
        :interactive="true"
        :bounds="gebouw.bounds"
        v-bind:fillColor=" name === gekozenGebouwId ?  'rgb(255,0,0)'  : 'rgb(0,176,240)' "
        v-bind:fillOpacity=" name === gekozenGebouwId ?  0.1  : 0.05 "
        :stroke="gebouw.style.stroke"
        :key="name"
        @click="handleClick(gebouw.properties.name)"
        @mouseover="mouseover"
        @mouseout="mouseout"
      >
        <l-tooltip :content="gebouw.properties.label" :options="{sticky: true}" />
      </l-rectangle>
    </LMap>
  </div>
</template>

<script>
import { CRS } from "leaflet";
import { LMap, LRectangle, LControlZoom, LTooltip } from "vue2-leaflet";
import LIiif from "vue2-leaflet-iiif";
import "leaflet/dist/leaflet.css";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";

export default {
  name: "Panorama",
  components: {
    LMap,
    LRectangle,
    LTooltip,
    LControlZoom,
    LIiif,
  },
  data() {
    return {
      center: [-30, 156.3],
      crs: CRS.Simple,
      opacity: 0.8,
      touchZoom: true,
      inertia: true,
      fadeAnimation: true,
      iiifOpts: {
        tileFormat: "jpg",
        tileSize: 512,
        fitBounds: false,
        setMaxBounds: true,
      },
    };
  },
  mounted() {
    const map = this.$refs.map.mapObject;
    map.addControl(new window.L.Control.Fullscreen({ position: "topright" }));
  },
  created() {},
  computed: {
    gebouwen() {
      return this.$store.getters["data/getGebouwen"];
    },
    iiifUrl() {
      return this.$store.getters["data/getPanormaUrl"];
    },
    gekozenGebouwId() {
      if (this.$route.name !== "HomePage") {
        return this.$store.getters["data/getGekozenGebouwId"];
      } else {
        return "";
      }
    },
    gekozenGebouw() {
      if (this.$route.name !== "HomePage") {
          return this.$store.getters["data/getGekozenGebouw"];
      } else {
        return "";
      }
    },
  },
  watch: {
    iiifUrl() {
      this.center = [-22, 98];
    },
    gekozenGebouw() {
      if (this.$route.name !== "HomePage") {
        this.$refs.map.fitBounds(this.gekozenGebouw.bounds);
      }
    },
  },
  methods: {
    onLoad(event) {
      this.map = event.map;
      // On Drieluik zoom in to chosen building
      if (this.$route.name !== "HomePage") {
        if (this.gekozenGebouw.bounds) {
          this.$refs.map.fitBounds(this.gekozenGebouw.bounds);
        }
      }
    },
    handleClick(name) {
      // Prevent from routing when chosenbuilding is same as click.
      if (name && name !== this.gekozenGebouwId) {
        this.$store.commit("data/setGekozenGebouwId", name);
        this.$store.commit("data/setGekozenGebouw", name);
      }
    },
    mouseover: function (e) {
      this.doHighlight(e.target);
    },
    mouseout: function (e) {
      this.doReset(e.target);
    },
    doHighlight(layer) {
      if (layer.options.className !== this.gekozenGebouwId) {
        layer.setStyle({
          fillColor: "rgb(0,176,240)",
          fillOpacity: 0.35,
        });
      }
    },
    doReset(layer) {
      if (layer.options.className !== this.gekozenGebouwId) {
        layer.setStyle({
          fillColor: "rgb(0,176,240)",
          fillOpacity: 0.05,
        });
      }
    },
  },
};
</script>

<style>
.Panorama {
  color: #fff;
  background-color: var(--wit);
}
path {
  stroke-width: 2px;
  outline:0;
  stroke:var(--wit);
}

.leaflet-container {
  background: var(--wit);
}

.leaflet-bar {
  box-shadow: none;
}
.leaflet-bar a,
.leaflet-bar a:hover {
  background: none repeat scroll 0 0 var(--blauw);
  color: var(--wit);
  border-radius: 0px;
  box-shadow: none;
  width: 39px !important;
  height: 39px !important;
  line-height: 35px !important;
}
.leaflet-bar a:hover {
  background: var(--blauw);
}

.leaflet-control-fullscreen a {
  background: var(--blauw)
    url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzkiIGhlaWdodD0iNzgiIHZpZXdCb3g9IjAgMCAzOSA3OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41IDUwLjVIMTEuNVY1Mi41VjU2LjVIMTMuNVY1Mi41SDE3LjVWNTAuNUgxMy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41IDYwLjVIMTEuNVY2NC41VjY2LjVIMTMuNUgxNy41VjY0LjVIMTMuNVY2MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy41IDYwLjVIMjUuNVY2NC41SDIxLjVWNjYuNUgyNS41SDI3LjVWNjQuNVY2MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS41IDUwLjVWNTIuNUgyNS41VjU2LjVIMjcuNVY1Mi41VjUwLjVIMjUuNUgyMS41WiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTYuNSIgeT0iNTUuNSIgd2lkdGg9IjYiIGhlaWdodD0iNiIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNSAxMS41SDExLjVWMTMuNVYxNy41SDEzLjVWMTMuNUgxNy41VjExLjVIMTMuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNSAyMS41SDExLjVWMjUuNVYyNy41SDEzLjVIMTcuNVYyNS41SDEzLjVWMjEuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjcuNSAyMS41SDI1LjVWMjUuNUgyMS41VjI3LjVIMjUuNUgyNy41VjI1LjVWMjEuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjEuNSAxMS41VjEzLjVIMjUuNVYxNy41SDI3LjVWMTMuNVYxMS41SDI1LjVIMjEuNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=")
    no-repeat 0 0 !important;
  background-size: 39px 78px;
}
.leaflet-fullscreen-on .leaflet-control-fullscreen a {
  background-position: 0 -39px !important;
}

.leaflet-control-fullscreen a:hover {
  background: var(--blauw)
    url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzkiIGhlaWdodD0iNzgiIHZpZXdCb3g9IjAgMCAzOSA3OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41IDUwLjVIMTEuNVY1Mi41VjU2LjVIMTMuNVY1Mi41SDE3LjVWNTAuNUgxMy41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy41IDYwLjVIMTEuNVY2NC41VjY2LjVIMTMuNUgxNy41VjY0LjVIMTMuNVY2MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNy41IDYwLjVIMjUuNVY2NC41SDIxLjVWNjYuNUgyNS41SDI3LjVWNjQuNVY2MC41WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMS41IDUwLjVWNTIuNUgyNS41VjU2LjVIMjcuNVY1Mi41VjUwLjVIMjUuNUgyMS41WiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTYuNSIgeT0iNTUuNSIgd2lkdGg9IjYiIGhlaWdodD0iNiIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNSAxMS41SDExLjVWMTMuNVYxNy41SDEzLjVWMTMuNUgxNy41VjExLjVIMTMuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTMuNSAyMS41SDExLjVWMjUuNVYyNy41SDEzLjVIMTcuNVYyNS41SDEzLjVWMjEuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjcuNSAyMS41SDI1LjVWMjUuNUgyMS41VjI3LjVIMjUuNUgyNy41VjI1LjVWMjEuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjEuNSAxMS41VjEzLjVIMjUuNVYxNy41SDI3LjVWMTMuNVYxMS41SDI1LjVIMjEuNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=")
    no-repeat 0 0 !important;
  background-size: 39px 78px;
}

.leaflet-fullscreen-on .leaflet-control-fullscreen a:hover {
  background-position: 0 -39px !important;
}
/*
path.leaflet-interactive:nth-child(5) {
  animation: blinkingBorder 15s;
  animation-delay: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

path.leaflet-interactive:nth-child(16) {
  animation: blinkingBorder 15s;
  animation-delay: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes blinkingBorder {
  0% {
    stroke: var(--wit);
  }
  24% {
    stroke: var(--wit);
  }
  25% {
    stroke:var(--bruin);
  }
  30% {
    stroke: var(--wit);
  }
  35% {
    stroke: var(--bruin)
  }
  40% {
    stroke: var(--wit);
  }
  100% {
    stroke: var(--wit);
  }
}
*/
.leaflet-tooltip {
  font-family: 'Source Sans Pro', sans-serif !important;
  background: var(--lichtgrijs);
  padding:10x 30px;
  font-size:1.4em;
}
.leaflet-tooltip-left:before {
  border-left-color:var(--lichtgrijs);
}
.leaflet-tooltip-left {

}
/* ,.leaflet-tooltip-right:before */
</style>
