<script setup lang="ts">
import useQueryStore from "../store/useQueryStore.ts";
import useTranslationApiStore from "../store/useTranslationApiStore.ts";
import { onMounted } from "vue";

const queryStore = useQueryStore();
const translationApiStore = useTranslationApiStore();

const emit = defineEmits(['addToLib']);

onMounted(async() => {

  // const { data } = await translationApiStore.getTranslation(queryStore.queryState.translationQuery)
  // queryStore.writeTranslatedQuery(data[0].translations[0].text);
})



const addToLibrary = async () => {
  emit('addToLib');
  // await translatorApi.refreshToken();
}
</script>

<template>
  <div class="inner">
    <h1>{{ queryStore.queryState.translationQuery }}</h1>
    <div>{{ queryStore.queryState.translatedQuery }}</div>

    <button @click="addToLibrary">Добавить в библиотеку</button>
  </div>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.inner {
  background-color: white;
  padding: 1rem;

  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.inner > h2 {
  font-size: 3rem;
  font-weight: bold;
}

.inner > p {
  font-size: 1.8rem;
  font-weight: 300;
}
</style>