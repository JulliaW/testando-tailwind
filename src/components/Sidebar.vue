<template>
  <div>
    <!-- Botão hamburguer (mobile only) -->
    <button
      @click="isOpen = !isOpen"
      class="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded focus:outline-none"
    >
      <span v-if="!isOpen">☰</span>
      <span v-else>✕</span>
    </button>

    <!-- Sidebar (mobile: v-if, desktop: sempre visível) -->
    <div
      :class="[
        'fixed md:static top-0 left-0 h-screen w-64 bg-gray-800 text-white flex-col z-40 transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:flex',
      ]"
    >
      <!-- Título -->
      <div class="text-2xl font-bold p-6 border-b border-gray-700">Meu Painel</div>

      <!-- Navegação -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <RouterLink
          to="/dashboard"
          class="block px-4 py-2 rounded hover:bg-gray-700"
          :class="{ 'bg-gray-700': isActive('/dashboard') }"
          @click="closeOnMobile"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          to="/cadastro"
          class="block px-4 py-2 rounded hover:bg-gray-700"
          :class="{ 'bg-gray-700': isActive('/cadastro') }"
          @click="closeOnMobile"
        >
          Cadastro
        </RouterLink>
        <RouterLink
          to="/listagem"
          class="block px-4 py-2 rounded hover:bg-gray-700"
          :class="{ 'bg-gray-700': isActive('/listagem') }"
          @click="closeOnMobile"
        >
          Listagem
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const isOpen = ref(false)
const route = useRoute()

const isActive = (path) => route.path === path

const closeOnMobile = () => {
  if (window.innerWidth < 768) {
    isOpen.value = false
  }
}

// Fecha automaticamente ao redimensionar para desktop
const handleResize = () => {
  if (window.innerWidth >= 768) isOpen.value = true
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
