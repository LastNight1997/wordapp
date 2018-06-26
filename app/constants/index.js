export default {
  base: 'http://35.198.229.159:6001/api/',
  endPoint: {
    signIn: 'sessions',
    signUp: 'accounts',
    preSignUp: 'registration',
    books: 'books',
    customWords: 'custom-words',
    subscription: 'subscription',
    progress: 'learning',
    newWords: 'learning/new',
    viewWord: 'learning/view',
    bookProgress: 'learning/books',
    revision: 'learning/revision',
    words: 'words',
  },
  notificationTime: {
    hour: 20,
    minute: 0,
  },
  styles: {
    tabBarIconSize: 24,
  },
  api: {
    oxford: {
      headers: {
        app_id: '0da357a6',
        app_key: '0422915d2d3145e83a6eb5d22837cf98',
      },
      url: 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/{WORD}/pronunciations',
    },
    oxfordAudio: 'http://audio.oxforddictionaries.com/en/mp3/{WORD}_1_gb_1_abbr.mp3',
  },
};
