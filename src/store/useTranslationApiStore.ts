import { defineStore } from 'pinia';
import translatorApi from "../api/translate.ts";

export default defineStore("translation-api-store", {
    state: () => ({
        translationApiState: {
            headers: {

            }
        }
    }),
    actions: {
        async getTranslation (textToTranslate) {
            try {
                const { data } = await translatorApi.getTranslation([{ Text: textToTranslate }]);
                return data[0].translations[0].text;
            } catch (e) {
                // if (e.response.status === 401) {
                //     await translatorApi.refreshToken();
                // }
                console.error(e)
            }
        }
    },
    getters: {}
});