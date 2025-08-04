<template>
  <div class="h-screen w-64 bg-gray-800 text-white flex flex-col">
    <div class="text-2xl font-bold p-6 border-b border-gray-700">Meu Painel</div>

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
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path) => route.path === path
</script>
