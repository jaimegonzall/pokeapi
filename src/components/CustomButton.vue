<script setup>
const props = defineProps({
  labelText: {
    type: String,
    require: true,
    default: ''
  }
})
</script>

<template>
  <!-- BUTTON con estilos Preving -->
  <button>
    <span>{{ props.labelText }}</span>
  </button>
</template>

<script>
export default {
  name: 'PrvButton'
}
</script>