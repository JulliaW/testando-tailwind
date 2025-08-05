<template>
  <div class="max-w-6xl mx-auto p-4">
    <div class="flex justify-end mb-4">
      <button
        type="button"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        @click="showModal = true"
      >
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>

    <Listagem />

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/60 dark:bg-gray-800/60"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-xl relative ring-1 ring-black/10 dark:ring-white/10"
      >
        <button
          @click="showModal = false"
          class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <Cadastro @close="showModal = false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Listagem from './Listagem.vue'
import Cadastro from './Cadastro.vue'

const showModal = ref(false)
</script>
