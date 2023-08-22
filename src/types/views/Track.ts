export interface trackInfoTypes {
    artistId: number | null,
    artistName: string,
    lyricsId: number | null,
    lyricsBody: string,
    trackId: number | null,
    trackName: string,
    timestamp: Date,
    translations: translationTypes[],
}

interface translationTypes {
    textToTranslate: string,
    translatedText: string,
}