import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../plugins/axios';

export const useConfigStore = defineStore('configStore', () => {
  const config = ref(null);
  const init = () => {
    return axios.get('/config/config.json')
  };

  return { config, init };
});
