import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const searchHistoryAtom = atomWithStorage('next-supabase-dashboard-search-history', {
  books: [],
  authors: [],
});

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  function addBooksHistory(book: any) {
    setSearchHistory((prev) => ({ ...prev, books: searchHistory.books.concat(book) }));
  }
  function addAuthorsHistory(author: any) {
    setSearchHistory((prev) => ({ ...prev, authors: searchHistory.authors.concat(author) }));
  }
  function removeBooksHistory(id: any) {
    let booksFilter = searchHistory.books.filter((book) => book.id !== id);
    setSearchHistory((prev) => ({ ...prev, books: booksFilter }));
  }
  function removeAuthorsHistory(id: any) {
    let authorsFilter = searchHistory.authors.filter((author) => author.id !== id);
    setSearchHistory((prev) => ({ ...prev, authors: authorsFilter }));
  }
  function resetBooksHistory() {
    setSearchHistory((prev) => ({ ...prev, books: [] }));
  }
  function resetAuthorsHistory() {
    setSearchHistory((prev) => ({ ...prev, authors: [] }));
  }
  function resetAllSearchHistory() {
    setSearchHistory({
      books: [],
      authors: [],
    });
  }
  return {
    searchHistory,
    setSearchHistory,
    addBooksHistory,
    addAuthorsHistory,
    removeBooksHistory,
    removeAuthorsHistory,
    resetBooksHistory,
    resetAuthorsHistory,
    resetAllSearchHistory,
  };
}

export function compareSearchResult(history: any, newResults: any) {
  let newHistory = history;
  // iterate each search result
  for (const newResult of newResults) {
    // check if new result already in the history
    const exists = history.findIndex((item) => item.id == newResult.id) > -1;
    if (!exists) {
      newHistory.push(newResult);
    }
  }
  return newHistory;
}
