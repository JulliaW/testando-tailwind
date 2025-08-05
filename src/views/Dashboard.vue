<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Dashboard</h1>

    <!-- Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">Total de Produtos</p>
        <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{{ totalProdutos }}</p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">Com NCM</p>
        <p class="text-3xl font-bold text-green-600 dark:text-green-400">{{ totalComNcm }}</p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">Com CEST</p>
        <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">{{ totalComCest }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const produtos = ref([])

onMounted(() => {
  const dados = localStorage.getItem('produtos')
  produtos.value = dados ? JSON.parse(dados) : []
})

const totalProdutos = computed(() => produtos.value.length)
const totalComNcm = computed(
  () => produtos.value.filter((p) => p.ncm && p.ncm.trim() !== '').length,
)
const totalComCest = computed(
  () => produtos.value.filter((p) => p.cest && p.cest.trim() !== '').length,
)
</script>
