<template>
  <div class="h-screen w-64 bg-gray-800 dark:bg-gray-900 text-white flex flex-col">
    <!-- Topo com Título e Botão de Tema -->
    <div
      class="flex items-center justify-between p-6 border-b border-gray-700 dark:border-gray-600"
    >
      <h1 class="text-2xl font-bold">Meu Painel</h1>
      <button @click="toggleTheme" class="text-sm bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">
        {{ theme === 'dark' ? '☀️' : '🌙' }}
      </button>
    </div>

    <!-- Navegação -->
    <nav class="flex-1 px-4 py-6 space-y-2">
      <RouterLink
        to="/dashboard"
        class="block px-4 py-2 rounded hover:bg-gray-700"
        :class="{ 'bg-gray-700': isActive('/dashboard') }"
      >
        Dashboard
      </RouterLink>
      <RouterLink
        to="/cadastro"
        class="block px-4 py-2 rounded hover:bg-gray-700"
        :class="{ 'bg-gray-700': isActive('/cadastro') }"
      >
        Cadastro
      </RouterLink>
      <RouterLink
        to="/listagem"
        class="block px-4 py-2 rounded hover:bg-gray-700"
        :class="{ 'bg-gray-700': isActive('/listagem') }"
      >
        Listagem
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path) => route.path === path

const theme = ref('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
}

// Define o tema inicial com base no que está salvo ou no sistema
onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved) {
    theme.value = saved
  } else {
    theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  document.documentElement.classList.toggle('dark', theme.value === 'dark')
})

// Salva a escolha do usuário
watchEffect(() => {
  localStorage.setItem('theme', theme.value)
})
</script>
