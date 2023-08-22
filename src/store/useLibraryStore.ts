import { defineStore } from 'pinia';

const basicState = {

};

export default defineStore("library-store", {
    state: () => ({
        libraryState: basicState
    }),
    actions: {
        async addToDatabase() {

        }
    },
    getters: {}
});