<template>
  <div class="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-6">Cadastro de Produto</h1>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- EAN -->
      <div>
        <label class="block mb-1 font-medium">EAN <span class="text-red-500">*</span></label>
        <input
          v-model="form.ean"
          type="text"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
          :class="{ 'border-red-500': showErrors && !form.ean }"
          placeholder="Digite o código EAN"
        />
      </div>

      <!-- Descrição -->
      <div>
        <label class="block mb-1 font-medium">Descrição <span class="text-red-500">*</span></label>
        <input
          v-model="form.descricao"
          type="text"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
          :class="{ 'border-red-500': showErrors && !form.descricao }"
          placeholder="Digite a descrição do produto"
        />
      </div>

      <!-- NCM -->
      <div>
        <label class="block mb-1 font-medium">NCM</label>
        <input
          v-model="form.ncm"
          type="text"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
          placeholder="Digite o NCM (opcional)"
        />
      </div>

      <!-- CEST -->
      <div>
        <label class="block mb-1 font-medium">CEST</label>
        <input
          v-model="form.cest"
          type="text"
          class="w-full p-2 border rounded focus:outline-none focus:ring"
          placeholder="Digite o CEST (opcional)"
        />
      </div>

      <!-- Botão -->
      <div class="md:col-span-2 mt-4">
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Salvar Produto
        </button>
      </div>
    </form>

    <!-- Feedback -->
    <div v-if="submitted" class="mt-6 p-4 bg-green-100 text-green-800 rounded">
      Produto cadastrado com sucesso!
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  ean: '',
  descricao: '',
  ncm: '',
  cest: '',
})

const submitted = ref(false)
const showErrors = ref(false)

const handleSubmit = () => {
  submitted.value = false
  showErrors.value = true

  if (!form.value.ean || !form.value.descricao) return

  // Recuperar produtos existentes
  const produtosSalvos = JSON.parse(localStorage.getItem('produtos') || '[]')

  // Criar novo produto com ID único (timestamp)
  const novoProduto = {
    id: Date.now(),
    ...form.value,
  }

  // Salvar no localStorage
  produtosSalvos.push(novoProduto)
  localStorage.setItem('produtos', JSON.stringify(produtosSalvos))

  // Feedback
  submitted.value = true
  showErrors.value = false

  // Limpar formulário
  form.value = {
    ean: '',
    descricao: '',
    ncm: '',
    cest: '',
  }
}
</script>
