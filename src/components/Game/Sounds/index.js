var Sound = require('react-native-sound');

const error = (err) => (err) ? console.log(err) : null;

export const introMusic = new Sound('./introMusic.mp3', Sound.MAIN_BUNDLE, error);
export const lineClick = new Sound('./lineClick.wav', Sound.MAIN_BUNDLE, error);
export const inGameMusic = new Sound('./inGameMusic.mp3', Sound.MAIN_BUNDLE, error);
export const score = new Sound('./score.mp3', Sound.MAIN_BUNDLE, error);
export const iseeu = new Sound('./iseeu.mp3', Sound.MAIN_BUNDLE, error);
export const gotem = new Sound('./gotem.mp3', Sound.MAIN_BUNDLE, error);
export const okay = new Sound('./okay.mp3', Sound.MAIN_BUNDLE, error);
