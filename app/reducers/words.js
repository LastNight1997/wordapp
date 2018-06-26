import types from 'app/actions/actionTypes';
import { parseRemoteDateString } from 'app/utils';

function mergeWords(local, remote) {
  return remote.map((remoteWord) => {
    const localWord = local.find(word => word.id === remoteWord.id);
    return localWord || remoteWord;
  });
}

function mergeProgress(local, remote) {
  return local.map((word) => {
    const progress = remote.find(p => p.wordId === word.id);
    if (!progress) return word;
    const viewDate = parseRemoteDateString(progress.viewDate);
    const { recall, lastReviewResult } = progress;
    const reviewDate = progress.lastReviewDate ?
      parseRemoteDateString(progress.lastReviewDate) : null;
    return {
      ...word,
      viewDate,
      recall,
      reviewDate,
      lastReviewResult,
    };
  });
}

export default (wordsState = [], action) => {
  switch (action.type) {
    case types.GET_WORDS_COMMIT:
      // Payload === response
      return mergeWords(wordsState, action.payload.data);
    case types.GET_PROGRESS_COMMIT:
      return mergeProgress(wordsState, action.payload.data);
    case types.VIEW_WORD: {
      // Payload === wordId
      const index = wordsState.findIndex(word => (
        word.id === action.payload.wordId && !word.viewDate
      ));
      if (index < 0) return wordsState;
      const words = wordsState.slice();
      words[index].viewDate = new Date();
      return words;
    }
    case types.REVIEW_WORD: {
      // Payload: { wordId, result }
      const { wordId, result } = action.payload;
      const index = wordsState.findIndex(word => (
        word.id === wordId && !word.reviewDate
      ));
      if (index < 0) return wordsState;
      const words = wordsState.slice();
      const { recall = 0 } = words[index];
      words[index].reviewDate = new Date();
      words[index].lastReviewResult = result;
      words[index].recall = result ? (recall + 1) : Math.max(0, recall - 1);
      return words;
    }
    default:
      return wordsState;
  }
};
