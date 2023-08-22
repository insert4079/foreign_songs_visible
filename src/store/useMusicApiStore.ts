import {defineStore} from 'pinia';
import musicApi from '../api/music.ts'

export default defineStore("music-api-store", {
    state: () => ({
        musicApiState: {
            trackInfo: {}
        }
    }),
    actions: {
        // TODO Добавить обработчики ошибок try catch
        async getTrackInfo(trackId) {
            const { data: { message: { body: { track } } } } = await musicApi.getTrackInfo({ track_id: trackId })
            const { track_name, track_id, artist_name, artist_id } = track
            this.trackInfo = {
                trackName: track_name,
                trackId: track_id,
                artistName: artist_name,
                artistId: artist_id
            };
        },
        async getTrackLyrics(trackId, withInfo) {
            try {
                const { data: { message: { body: { lyrics: { lyrics_body, lyrics_id } } } } } = await musicApi.getTrackLyrics({ track_id: trackId })
                if (withInfo) await this.getTrackInfo(trackId);

                this.trackInfo.lyricsBody = lyrics_body;
                this.trackInfo.lyricsId = lyrics_id;
                return this.trackInfo;
            } catch (e) {
                console.error(e)
            }
        }
    },
    getters: {}
});