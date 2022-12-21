<template>
  <div class="App">
    <router-view />
  </div>
</template>

<style>

@font-face {
  font-family: 'Source Sans Pro';
  src: url("assets/fonts/SourceSansPro-Regular.otf") format("opentype"),
    url("assets/fonts/SourceSansPro-Regular.ttf") format("truetype"),
    url("assets/fonts/SourceSansPro-Regular.woff") format("woff"),
    url("assets/fonts/SourceSansPro-Regular.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}

:root {
  --rood: #d12929;
  --blauw: #3991b1;
  --wit: #ffffff;
  --lichtgrijs: #ebebeb;
  --bruin: #543b3b;
  --bijnazwart: #111111;
  --grijs: #666666;
  --lichtgroen: #dff0d8;
  --lichtrood: #f2dede;
	--lichtblauw: #3991b133;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  padding: 0;
  margin: 0;
  background-color:var(--lichtgrijs);
  color:var(--bijnazwart);
}

.App {
  height: 100vh;
  width: 100vw;
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--lichtgrijs);
  margin: 0;
  padding: 0;
}

button {
  text-align: center;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 0.9em;
  border: none;
  cursor: pointer;
  padding: 15px;
  margin: 5px 5px 5px 0px;
  color: var(--lichtgrijs);
}

a {
  color: var(--lichtgrijs);
  text-decoration: none;
}

.home .Panorama .leaflet-control-container {
  display: none;
}
.home .Header button {
  display: none;
}
.home .Header .role-selector {
  display: none;
}
.Colofon .Header .role-selector {
  display: none;
}
.Detail .Header .role-selector {
  display: none;
}

.tooltip {
  display: block !important;
  z-index: 10000;
  width: 30vw;
  font-family: 'Source Sans Pro', sans-serif;
  color:var(--bijnazwart);
  box-shadow: 2px 2px 5px var(--bijnazwart);
}

.tooltip .tooltip-inner {
  background: var(--lichtgrijs);
  color: #4B4B4B;
  border-radius: 5px;
  padding: 10px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: var(--lichtgrijs);
  z-index: 1;
}
tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 15px 15px 0 15px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -15px;
  left: calc(50% - 15px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: var(--lichtgrijs);
  color: var(--rood);
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(var(--bijnazwart), 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: var(--lichtgrijs);
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>