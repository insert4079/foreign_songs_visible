import { defineStore } from 'pinia';

export default defineStore("query-store", {
    state: () => ({
        queryState: {
            searchQuery: '',
            translationQuery: '',
            translatedQuery: ''
        }
    }),
    actions: {
        writeSearchQuery(payload) {
            this.queryState.searchQuery = payload
        },
        deleteSearchQuery() {
            this.queryState.searchQuery = ''
        },

        writeTranslationQuery(payload) {
            this.queryState.translationQuery = payload
        },
        deleteTranslationQuery() {
            this.queryState.translationQuery = ''
        },

        writeTranslatedQuery(payload) {
            this.queryState.translatedQuery = payload
        },
        deleteTranslatedQuery() {
            this.queryState.translatedQuery = ''
        },
    },
    getters: {}
});