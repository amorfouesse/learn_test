import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const name = ref('Visiteur')

  function setName(newName: string) {
    name.value = newName
  }

  return { name, setName }
})