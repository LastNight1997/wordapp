import { createSelector } from 'reselect';
import { dateDiffInDays, veryShortISO } from 'app/utils';
import sampleSize from 'lodash-es/sampleSize';
import countBy from 'lodash-es/countBy';

export const getWords = state => state.words;

const getBooks = state => state.books;

const getSubscription = state => state.subscription;

const getSubscribedWords = createSelector(
  [getWords, getSubscription],
  (words, subscription) => (
    words.filter(word => word.books.map(book => book.id)
      .some(bookId => bookId === subscription.bookId))
  ),
);

const getLearnedWords = createSelector(
  [getSubscribedWords],
  words => (words.filter(word => word.viewDate)),
);

const getViewedWords = createSelector(
  [getWords],
  words => (words.filter(word => word.viewDate)),
);

export const getBookProgress = createSelector(
  [getViewedWords, getBooks],
  (words, books) => (
    books.map(book => ({
      ...book,
      viewedCount: (words.filter(word => word.books.some(b => b.id === book.id)).length),
    }))
  ),
);

export const getNewWords = createSelector(
  [getSubscribedWords, getSubscription],
  (words, subscription) => {
    const { quota = 1 } = subscription;
    return words.filter(word => (!word.viewDate) || // Unviewed words
      (dateDiffInDays(new Date(), new Date(word.viewDate)) < 1)) // Words viewed today
      .slice(0, quota);
  },
);

export const getTodayUnviewedNewWordsCount = createSelector(
  [getNewWords],
  words => words.filter(word => !word.viewDate).length,
);

export const getReviewWords = createSelector(
  [getLearnedWords, getSubscription],
  (words, subscription) => {
    const { quota = 1 } = subscription;
    const reviewQuota = quota * 3;
    return words.filter(word => (!word.reviewDate) || // Unreviewed words
      (dateDiffInDays(new Date(), new Date(word.reviewDate)) < 1)) // Words reviewed today
      .slice(0, reviewQuota);
  },
);

export const getTodayReviewedWordsCount = createSelector(
  [getReviewWords],
  words => words
    .filter(word =>
      !!word.reviewDate &&
      dateDiffInDays(new Date(), new Date(word.reviewDate)) < 1)
    .length,
);

export const getQuiz = createSelector(
  [getReviewWords, getSubscribedWords],
  (words, sampleWords) => {
    const word = words.find(w => (!w.reviewDate) ||
      (dateDiffInDays(new Date(), new Date(w.reviewDate)) >= 1));
    if (!word) return undefined;
    const choices = sampleSize(sampleWords, 4)
      .filter(other => other.id !== word.id)
      .slice(0, 3)
      .map(other => other.translation);
    const correctChoice = Math.floor(Math.random() * 4);
    choices.splice(correctChoice, 0, word.translation);
    return {
      wordId: word.id,
      word: word.word,
      phonetic: word.phonetic,
      correctChoice,
      choices,
    };
  },
);

export const getHistory = createSelector(
  [getViewedWords],
  words => Object.entries(countBy(words, word => veryShortISO(new Date(word.viewDate))))
    .map(entry => ({
      x: entry[0],
      y: entry[1],
    })),
);
