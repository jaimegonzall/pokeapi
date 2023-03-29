<script setup>

import { ref, watch } from 'vue'

const selectOption = ref('')

watch(selectOption, (newQuestion) => {
  emit('item-selection', newQuestion, props.idForAnchor)
})

const emit = defineEmits([
  'item-selection'
])

const props = defineProps({
  labelText: {
      type: String,
      required: false,
      default: 'Multiselect'
    },
    idForAnchor: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    defaultOptionLabel: {
      type: String,
      required: false,
      default: 'name'
    }
})
</script>

<template>
  <div
    class="multiselect"
  >
  <label :for="idForAnchor">{{labelText}}</label>
  <select
    :id="idForAnchor"
    v-model.lazy="selectOption"
    :name="idForAnchor"
  >
    <option
      v-for="(item, index) in options"
      :key="index"
      :value="item[defaultOptionLabel]"
    >
      {{ item[defaultOptionLabel] }}
    </option>
  </select>
  </div>
</template>