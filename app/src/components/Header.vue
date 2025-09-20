<template>
  <div class="Header">
    <router-link to="/">
      <h1><img hspace="5" src="../assets/images/gtm-logo-2025-b.png" 
        alt="Gouda Tijdmachine">Goudse stadsgezichten</h1>
    </router-link>
    <button
      v-if="this.$route.name === 'Detail' ||this.$route.name === 'Colofon' "
      class="button"
      v-on:click="goBack()"
    ><img src="../assets/images/icon_terug.svg"/></button>

    <div class="role-selector">
      <!-- Move input outside of .switch label -->
      <input v-on:change="toggle()" type="checkbox" checked id="role-checkbox" />
      <span class="toggle-text">1641</span>
      <!-- Add for attribute that matches id of check input -->
      <label class="switch" for="role-checkbox">
        <span class="slider round"></span>
      </label>
      <span class="toggle-text">1644</span>
    </div>

    <router-link :to="{name: 'Colofon', params:{ id: this.$route.params.id}}">
      <button v-if="this.$route.name !== 'Colofon'" class="button"><img src="../assets/images/icon_info.svg"/></button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    goBack() {
      this.$router.go(-1);
      // window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    toggle(){
      this.$store.dispatch("data/toggleMapStyle")

}
  },
};
</script>

<style scoped>
.Header {
  display: inline-flex;
  color: var(--wit);
  background-color: var(--blauw);
  justify-content: space-between;
  padding-left: 50px;
  padding-right:0;

}

h1 {
  margin-left:20px;
  font-size:2.4em;
}

h1 img {
  float:left;
  z-index:10;
  position:absolute;
  left:15px;
  width: 40px;
  height:40px;
  margin-top:6px;
}


@media (max-width:700px) {
  h1 { 
   font-size: 1.2em; 
   margin-top:8px;
   margin-left:0 
  }

  h1 img {
    left:5px;
    width:45px;
    height:45px;
    margin-top:0px;
  }

  .home h1 { 
    font-size:1.9em;
    margin-left:0;
  }
}

.button {
  background-color:transparent;
  height: 50px;
  margin:0;
}
.button:hover {
  background-color: var(--rood);
}

/* TOGGLE */
input {
  display: none;
}

.role-selector input + span {
  color: var(--wit);
  font-weight: bold;
}
.role-selector input + * + * + span {
  color: var(--wit);
  font-weight: normal;
}

/* Color labels when input is checked */
.role-selector input:checked + span {
  color: var(--wit);
  font-weight: normal;
}
.role-selector input:checked + * + * + span {
  color: var(--wit);
  font-weight: bold;
}

.role-selector {
  display: inline-flex;
  background-color: var(--bruin);
  align-items: center;
  height: 50px;
}

.toggle-text {
  margin: 0 10px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: #00b0f0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + span + .switch .slider {
  background-color: #fefefe;
}

input:focus + span + .switch .slider {
  box-shadow: 0 0 1px #ffffff;
}

input:checked + span + .switch .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>