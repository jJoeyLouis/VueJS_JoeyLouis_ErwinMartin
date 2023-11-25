<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="#">Windows</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" aria-disabled="true" tabindex="-1" href="#">Rooms</a>
    </li>
  </ul>
</template>



<script>

// Si j'ai bien compris, tu auras besoin de VuRouter.
// https://v3.router.vuejs.org/fr/guide/essentials/redirect-and-alias.html#redirection



// ----------- Je t'ai ajouté cela, après tu peux l'enlever --------
// import axios from 'axios';
import { API_HOST } from '../config';
import RoomsList from './RoomsList.vue';
// ----------------
export default {
    // Ainsi que cela
    components: {
        RoomsList
    },
    // -------------
    name: 'MainNavigation'
}
</script>
