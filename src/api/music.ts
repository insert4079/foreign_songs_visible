import { apiMusixmatch } from './axios.ts';

export default {
    async getTrackList(params) {
        try {
            return apiMusixmatch.get('/track.search&apikey=5dce07d940d4b7a08cbc957dd12a7747', { params });
        } catch (error) {
            throw error;
        }
    },
    async getTrackLyrics(params) {
        try {
            return apiMusixmatch.get('/track.lyrics.get&apikey=5dce07d940d4b7a08cbc957dd12a7747', { params });
        } catch (error) {
            throw error;
        }
    },
    async getTrackInfo(params) {
        try {
            return apiMusixmatch.get('/track.get&apikey=5dce07d940d4b7a08cbc957dd12a7747', { params });
        } catch (error) {
            throw error;
        }
    },
};