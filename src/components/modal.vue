<script setup lang="ts">
// Сделать отдельный компонент модалки, которую можно будет использовать по-разному и на ее основе сделать модалку перевода с помощью слотов

import useModalStore from "../store/useModalStore.ts";

const store = useModalStore();


const props = withDefaults(defineProps<Props>(), {
  active: false,
  text: ''
});
interface Props {
  active: boolean,
  text: string
}

</script>

<template>
  <teleport to="body">
    <Transition>
      <div
          class="modal-wrapper"
          @click.self="store.closeModal"
          v-if="store.modalState?.component"
      >
        <component
            :is="store.modalState?.component"
            v-bind="store.modalState?.props"
        ></component>
      </div>
    </Transition>

  </teleport>

</template>

<style scoped>
/** v - дефолтное начало класса для транзишна. Ему можно задать name="modal-window", например, и будет modal-window-enter-from */
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: 0.25s ease all;
}

.modal-wrapper {
  position: fixed;
  left: 0;
  top: 0;

  z-index: 500;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.2);

  display: grid;
  place-items: center;
}
</style>