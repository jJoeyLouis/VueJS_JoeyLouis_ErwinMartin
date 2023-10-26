<template>
  <div class="windows-list pt-3">
    <div class="d-flex mb-2">
      <button type="button" class="btn btn-primary">Create new window</button>
    </div>

    <windows-list-item v-for="window in windows" :window="window" :key="window.id" @window-updated="updateWindow">
    </windows-list-item>
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
      windows: []
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
    let windows = response.data;
    this.windows = windows;
  },
  methods: {
    updateWindow(newWindow) {
      /* Find the place of window object with the same Id in the array, and replace it */
      let index = this.windows.findIndex(window => window.id === newWindow.id);
      console.log("update window", newWindow);
      this.windows.splice(index, 1, newWindow);
    }
  }
}
</script>

<style lang="scss">
</style>
