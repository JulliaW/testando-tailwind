<template>
  <div class="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Listagem de Produtos</h1>

    <div class="mb-4">
      <input
        v-model="filtro"
        type="text"
        placeholder="Filtrar por EAN ou descrição..."
        class="w-full p-2 border rounded focus:outline-none focus:ring"
      />
    </div>

    <div class="overflow-auto rounded">
      <table class="min-w-full text-left text-sm">
        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
          <tr>
            <th class="p-3 font-semibold">EAN</th>
            <th class="p-3 font-semibold">Descrição</th>
            <th class="p-3 font-semibold">NCM</th>
            <th class="p-3 font-semibold">CEST</th>
            <th class="p-3 font-semibold text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="produto in produtosPaginados"
            :key="produto.id"
            class="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="p-3">{{ produto.ean }}</td>
            <td class="p-3">{{ produto.descricao }}</td>
            <td class="p-3">{{ produto.ncm || '-' }}</td>
            <td class="p-3">{{ produto.cest || '-' }}</td>
            <td class="p-3 text-center">
              <span
                @click="removerProduto(produto.id)"
                class="cursor-pointer text-red-600 hover:text-red-800"
              >
                <i class="fa-solid fa-trash"></i>
              </span>
            </td>
          </tr>

          <tr v-if="produtosFiltrados.length === 0">
            <td colspan="5" class="p-4 text-center text-gray-500">Nenhum produto encontrado.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalPaginas > 1" class="flex justify-center items-center gap-2 mt-6">
      <button
        @click="paginaAtual--"
        :disabled="paginaAtual === 1"
        class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white disabled:opacity-50"
      >
        Anterior
      </button>

      <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>

      <button
        @click="paginaAtual++"
        :disabled="paginaAtual === totalPaginas"
        class="px-3 py-1 rounded bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const produtos = ref([])
const filtro = ref('')
const paginaAtual = ref(1)
const itensPorPagina = 5

const carregarProdutos = () => {
  const dados = localStorage.getItem('produtos')
  produtos.value = dados ? JSON.parse(dados) : []
}

onMounted(carregarProdutos)

defineExpose({ carregarProdutos })

const removerProduto = (id) => {
  produtos.value = produtos.value.filter((p) => p.id !== id)

  localStorage.setItem('produtos', JSON.stringify(produtos.value))

  if (paginaAtual.value > totalPaginas.value) {
    paginaAtual.value = totalPaginas.value
  }
}

const produtosFiltrados = computed(() => {
  if (!filtro.value.trim()) return produtos.value
  const termo = filtro.value.toLowerCase()
  return produtos.value.filter(
    (p) => p.ean.toLowerCase().includes(termo) || p.descricao.toLowerCase().includes(termo),
  )
})

const totalPaginas = computed(() => Math.ceil(produtosFiltrados.value.length / itensPorPagina))

const produtosPaginados = computed(() => {
  const start = (paginaAtual.value - 1) * itensPorPagina
  return produtosFiltrados.value.slice(start, start + itensPorPagina)
})

watch(produtosFiltrados, () => {
  if (paginaAtual.value > totalPaginas.value) {
    paginaAtual.value = 1
  }
})
</script>
