<script setup lang="ts">
import { ref, watch } from 'vue'
import musicApi from '../api/music.ts';
import { watchDebounced } from '@vueuse/core'

const input = ref('')
const trackList = ref([]);

const getTrackList = async(params) => {
  try {
    const { data: { message: { body: { track_list } } } } = await musicApi.getTrackList({
      q_track_artist: params,
      s_artist_rating: 'desc'
    });
    trackList.value = track_list.map(({ track: { track_id, track_name, artist_id, artist_name } }) => ({
      track_id,
      track_name,
      artist_id,
      artist_name
    }));
  } catch(error) {
    console.error(error);
  }
}

watchDebounced(input, async() => {
  await getTrackList(input.value);
}, { debounce: 1000, maxWait: 3000 })


</script>

<template>
  <el-input v-model="input" placeholder="Please input" />
  <div v-for="track in trackList">
    <router-link :to="`/track/${track.track_id}`">{{ track.artist_name }} -- {{ track.track_name }}</router-link>
  </div>
</template>

<style scoped>

</style>