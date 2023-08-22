import {apiRefreshTranslatorToken, apiTranslator} from './axios';

export default {
    async getTranslation(params) {
        const token = await this.refreshToken();

        try {
            const { data} = await apiTranslator.post('', [{ Text: params }], {
                headers: {
                    Authorization: `Bearer ${token.data}`
                }
            });
            return data[0].translations[0].text;
        } catch (error) {
            // if (error.response.status === 401) {
            //     token = await this.refreshToken();
            // }
            throw error;
        }
    },
    async refreshToken() {
        try {
            return apiRefreshTranslatorToken.post('');
        } catch (error) {
            throw error;
        }
    },
};