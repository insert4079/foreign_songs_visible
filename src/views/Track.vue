<template>
  <popoverTranslationComp
      :active="popoverVisible"
      :mouseCoord="mouseCoordinates"
      :originalText="selectedText"
      :translatedText="translatedText"
      :translationExists="translationExists"
      @update="update"
  />

  <div>Текст трека</div>
  <div>{{ trackInfo?.artistName }} -- {{ trackInfo?.trackName }}</div>

  <div
      @click="showTranslation"
      @mouseover="showTranslation"
      v-html="highlightedText"
      style="white-space: pre-line; text-align: center"
  ></div>

</template>

<script setup lang="ts">

// Imports
import {computed, onMounted, ref, watch} from "vue"
import { useRoute } from 'vue-router'
import { trackInfoTypes } from '../types/views/Track.ts';

import popoverTranslationComp from '../components/popoverTranslation.vue';

import firebaseApi from '../api/firebase.ts';
import translateApi from '../api/translate.ts';
import useMusicApiStore from '../store/useMusicApiStore.ts';


//Constants
const route = useRoute()
const musicApiStore = useMusicApiStore();

const trackInfo = ref<trackInfoTypes>()
const selectedText = ref<string>('');
const translatedText = ref<string>('');
const popoverVisible = ref<boolean>(false);
const translationExists = ref<boolean>(false);
let timer = ref(null);

const mouseCoordinates = ref({ x: 0, y: 0 })
const lastTranslationGotten = ref({ original: '', translated: ''});

const availableColours = ref(["#FFAF9E", "#FFCD9E", "#FFEA9E", "#FFF99E", "#F3FF9E", "#DDFF9E",
  "#ADFF9E", "#9EFFB7", "#9EFFD7", "#9EFFFB", "#9EE6FF", "#9ECCFF"])


// Hooks
onMounted(async() => {
  await getTrackInfoFromServer();
  await getTrackInfoFromApi();
});

// Computeds
const highlightedText = computed(() => {
  if (!trackInfo.value?.lyricsBody) return '';
  if (!trackInfo.value?.translations) return trackInfo.value?.lyricsBody;

  let randomColor = '';

  return trackInfo.value?.translations.reduce((result, translateObject) => {


    if (translateObject.highlightedColor) {
      randomColor = translateObject.highlightedColor;
    } else {
      randomColor = colorRandom();
    }

    return result.replace(
        findConcurrence(translateObject.textToTranslate),
        match =>
            returnMatch(match, randomColor)
    )
  }, trackInfo.value.lyricsBody);
})

// Watches
watch(() => selectedText.value, (value, oldValue) => {
  if (timer.value) clearTimeout(timer.value);

  if (value) {
    if (value !== oldValue) {
      timer.value = setTimeout(async() => {
        popoverVisible.value = true;
      }, 300);
    }
  } else clearTexts();
})

// Methods
const colorRandom = () => availableColours.value[Math.floor(Math.random() * availableColours.value.length)];
const findConcurrence = (string: string) => new RegExp(`${string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, "gi");
const returnMatch = (string: string, color: string) => `<span style='background-color: ${color}' data-translation='true'> ${string} </span>`;
const getTrackInfoFromServer = async() => {
  // Если уже трек уже есть в библиотеке, берем инфу из фб
  trackInfo.value = await firebaseApi.getDocument('savedTracks', String(route.params.trackId));
}
const getTrackInfoFromApi = async() => {
  // Если трека нет, идем на апишку
  if (trackInfo.value === undefined) trackInfo.value = await musicApiStore.getTrackLyrics(route.params.trackId, true);
}
const findTranslationIndex = (originalText: string) => trackInfo.value?.translations.findIndex(tr => tr.textToTranslate === originalText)
const update = async(textToDelete: string) => {
  if (!trackInfo.value) return;

  const translateObject = {
    translatedText: translatedText.value,
    textToTranslate: selectedText.value,
    highlightedColor: colorRandom()
  }

  if (textToDelete) {
    const index = findTranslationIndex(textToDelete);
    trackInfo.value?.translations?.splice(index, 1)
  } else if (trackInfo.value.translations) {
    trackInfo.value?.translations?.push(translateObject)
  } else {
    trackInfo.value.translations = [translateObject]
    trackInfo.value.timestamp = new Date();
  }

  await firebaseApi.setDocToDatabase('savedTracks', String(trackInfo.value?.trackId), trackInfo.value);
}

const setCoordinates = (event: MouseEvent) => {
  mouseCoordinates.value.x = event.clientX;
  mouseCoordinates.value.y = event.clientY;
}

const findTranslation = originalText => trackInfo.value?.translations?.find(tr => originalText.trim() === tr.textToTranslate)

const clearTexts = () => {
  popoverVisible.value = false;
  translatedText.value = '';
  selectedText.value = '';
}
const setTranslations = async(event) => {
  const translation = event.target?.dataset?.translation ? JSON.parse(event.target.dataset?.translation) : false;

  if (translation) {

    const translationFound = findTranslation(event.target.innerHTML);

    selectedText.value = translationFound?.textToTranslate || '';
    translatedText.value = translationFound?.translatedText || '';

    setCoordinates(event);
    translationExists.value = true;
  } else {
    selectedText.value = window.getSelection().toString().trim().replace(/(\r\n|\n|\r)/gm,"");
    if (!selectedText.value.length) return;
    else if (selectedText.value === lastTranslationGotten.value.original) {
      selectedText.value = lastTranslationGotten.value.original;
      translatedText.value = lastTranslationGotten.value.translated;
    } else {
      translatedText.value = await translateApi.getTranslation(selectedText.value);
    }

    translationExists.value = false;
    lastTranslationGotten.value.original = selectedText.value;
    lastTranslationGotten.value.translated = translatedText.value;
  }
}

const showTranslation = (event: MouseEvent) => {
  setCoordinates(event);
  setTranslations(event);
};
</script>

<style scoped>

</style>