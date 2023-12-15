<template>
  <div class="windows-list pt-3">
    <template v-if="isCreateWindow">
        <div>
            <button type="button" class="btn btn-primary marginR" @click="createWindow"> Create </button>
            <button type="button" class="btn btn-secondary" @click="switchForm_Windows"> Cancel </button>
        </div>
        <p v-if="errorForm" class="msgError mt-2"> Il y a eu un problème dans le renseignement des champs </p> <!-- Message d'erreur -->
        <form class="w-100">
            <!-- Formulaire de Création d'un Window -->
            <input type="text" class="inputNewWindow  mt-2 mb-4 w-100" id="whichNameWindow" placeholder="Window name"> <br>
            <select class="inputNewWindow w-100" id="whichNameRoom">
                <option value="noSelectRoom"> ---Select a room--- </option>
                <option v-for="room in rooms" :key="room.id" :value="room.id"> {{room.name}} </option> 
            </select>
            <!----->
        </form>
    </template>
    <template v-if="isLoading">
      <p>Loading...</p>
    </template>
    <template v-else>
        <div class="d-flex mb-2">
            <button type="button" class="btn btn-primary" @click="switchForm_Windows">Create new window</button>
        </div>
        <windows-list-item v-for="window in windows" :window="window" :key="window.id" @window-deleted="deleteAndUpdateWindow" @window-updated="updateWindow">
        </windows-list-item>
    </template>
  </div>
</template>


<script>
import axios from 'axios';
import { API_HOST } from '../config';
import WindowsListItem from './WindowsListItem.vue';

export default {
  components: {
    WindowsListItem
  },
  name: 'WindowsList',
  data: function () {
    return {
      /* Initialize windows with an empty array, while waiting for actual data to be retrieved from the API */
      windows: [],
      isCreateWindow :false,
      rooms: [], /* liste des rooms pour le choix des rooms */
      errorForm:false, /* est ce que j'affiche que la requete formulaire s'est mal passée */
      isLoading: true, /*Propriété qui permet de savoir si la liste des fenêtres est toujours en train de charger*/
    }
  },
  created: async function () {
    let response = await axios.get(`${API_HOST}/api/windows`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
    let responseRoom = await axios.get(`${API_HOST}/api/rooms`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
    // Création des tableaux de windows, et de Rooms
    let windows = response.data;
    this.windows = windows;

    let rooms = responseRoom.data;
    this.rooms = rooms;

    this.isLoading = false;
  },
  methods: {
    updateWindow(newWindow) {
      /* Find the place of window object with the same Id in the array, and replace it */
      let index = this.windows.findIndex(window => window.id === newWindow.id);
      console.log("update window", newWindow);
      this.windows.splice(index, 1, newWindow);
    },
    deleteAndUpdateWindow(deletedWindow) {
      this.windows = this.windows.filter(window => window.id !== deletedWindow.id); // Refresh des données lorsqu'un window est supprimé
    },
    switchForm_Windows(){
        return this.isCreateWindow = !this.isCreateWindow ; // Est ce que j'affiche l'ensemble des windows, ou le formulaire de createWindow
    },


    createWindow(){
        let nameWindow = document.getElementById("whichNameWindow").value ; // Récuper nom de Window et Id de Room
        let idRoom = document.getElementById("whichNameRoom").value ;
        if(nameWindow === '' || idRoom === 'noSelectRoom'){
            this.errorForm = true ;
        } else {
            this.errorForm = false ;
            this.isCreateWindow = !this.isCreateWindow ;
            try {
                // J'ajoute (j'essaye avec try - catch)
                let response = axios.post(`${API_HOST}/api/windows`, {
                        name: nameWindow,
                        windowStatus: "OPENED",
                        roomId: idRoom    
                });
                // Une fois que c'est ajoutée, je récupère cette fenêtre ajoutée, puis je l'ajoute à mon tableau de windows.
                let newResponseWindow = axios.get(`${API_HOST}/api/windows`)
                .then(response => {
                    const newData = response.data;
                    const newWindows = newData.filter(window => window.name === nameWindow)[0];
                    this.windows.push(newWindows) ;
                })
                console.log("Requete Parfaite") ;
            } catch (error) {
              console.error("Erreur lors de la requête :", error);
            }
        }
    }
  }
}
</script>

<style lang="scss">
    .msgError{
        color:#FC1908;
        background-color:#FFA38C;
        padding:10px 30px;
        font-family:'Montserrat',sans-serif;
    }
    .marginR{
        margin-right:20px;
    }

</style>
