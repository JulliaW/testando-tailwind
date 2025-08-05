<template>
  <div>
    <button
      @click="isOpen = !isOpen"
      class="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded focus:outline-none"
    >
      <span v-if="!isOpen"><i class="fa-solid fa-bars"></i></span>
      <span v-else><i class="fa-solid fa-xmark"></i></span>
    </button>

    <div
      :class="[
        'fixed md:static top-0 left-0 h-screen w-64 bg-gray-800 text-white flex-col z-40 transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:flex',
      ]"
    >
      <div class="p-6 border-b border-gray-700 flex justify-center">
        <img src="@/assets/images/white-logo.png" alt="Logo" class="h-12 w-auto" />
      </div>

      <nav class="flex-1 px-4 py-6 space-y-2">
        <RouterLink
          to="/dashboard"
          class="block px-4 py-2 rounded hover:bg-gray-700"
          :class="{ 'bg-gray-700': isActive('/dashboard') }"
          @click="closeOnMobile"
        >
          <span class="flex items-center gap-2">
            <i class="fa-solid fa-chart-area"></i>
            Dashboard
          </span>
        </RouterLink>

        <RouterLink
          to="/produtos"
          class="block px-4 py-2 rounded hover:bg-gray-700"
          :class="{ 'bg-gray-700': isActive('/produtos') }"
          @click="closeOnMobile"
        >
          <span class="flex items-center gap-2"
            ><i class="fa-solid fa-cart-shopping"></i>Produtos</span
          >
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
  if (window.innerWidth >= 768) isOpen.value = false
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
