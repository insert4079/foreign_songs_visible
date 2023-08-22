<script setup lang="ts">
import {collection, getDocs, getFirestore} from "firebase/firestore";
import { ref, onMounted } from 'vue';

const db = getFirestore();

const trackList = ref([]);
const showLyrics = ref(false);

onMounted(async () => {
  await getCollection();
})

const getCollection = async () => {
  trackList.value.length = 0;
  try {
    const querySnapshot = await getDocs(collection(db, "savedTracks"));

    querySnapshot.forEach((doc) => {
      trackList.value.push(doc.data())
    });
    // console.log(trackList.value);

  } catch (e) {
    console.error(`Error: ${e}`)
  }
}
</script>

<template>
  <div>Библиотека</div>

  <template v-if="trackList.length">
    <div v-for="track in trackList">
      <div @click="showLyrics = !showLyrics">{{ track.artistName }} -- {{ track.trackName }}</div>
      <div v-show="showLyrics">{{ track.lyricsValue }}</div>
      <div>{{ track.translations }}</div>
    </div>
  </template>

  <template v-else>
    <div>В библиотеке пусто</div>
  </template>
</template>

<style scoped>

</style>
