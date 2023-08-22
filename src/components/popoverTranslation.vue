<script setup lang="ts">

const props = withDefaults(defineProps<Props>(), {
  active: false,
  translationExists: false,
  mouseCoord: {
    x: 0,
    y: 0
  },
  originalText: '',
  translatedText: ''
});
interface Props {
  active: boolean,
  translationExists: boolean,
  mouseCoord: {
    x: number,
    y: number
  },
  originalText: string,
  translatedText: string
}

const emit = defineEmits(['update', 'update']);
</script>

<template>
  <div
      v-if="props.active"
      style="background-color: yellow; text-align: center; position: absolute"
      :style="{ top: props.mouseCoord.y - 10 + 'px', left: props.mouseCoord.x + 100 + 'px' }"
  >
    <div>{{ props.originalText }}</div>
    <div>{{ props.translatedText }}</div>


    <button v-if="!props.translationExists" style="margin-top: 30px;" @click="emit('update')">Изменить в библиотеке</button>
    <button v-else style="margin-top: 30px;" @click="emit('update', props.originalText)">Удалить из библиотеки</button>
  </div>
</template>

<style scoped>

</style>