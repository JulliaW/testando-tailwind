<template>
  <div class="max-w-6xl mx-auto p-4">
    <div class="flex justify-end mb-4">
      <button
        type="button"
        class="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
        @click="showModal = true"
      >
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>

    <Listagem ref="listagemRef" />

    <Transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-white/60 dark:bg-gray-800/60"
      />
    </Transition>

    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click.self="fecharModalEAtualizar"
        @keydown.esc="fecharModalEAtualizar"
        tabindex="0"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-xl relative ring-1 ring-black/10 dark:ring-white/10"
        >
          <button
            @click="fecharModalEAtualizar"
            class="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

          <Cadastro @close="fecharModalEAtualizar" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, Transition, watch } from 'vue'
import Listagem from './Listagem.vue'
import Cadastro from './Cadastro.vue'

const showModal = ref(false)
const listagemRef = ref(null)

const fecharModalEAtualizar = () => {
  showModal.value = false
  listagemRef.value?.carregarProdutos()
}

watch(showModal, async (val) => {
  if (val) {
    await nextTick()
    modalContainer.value?.focus()
  }
})
</script>
