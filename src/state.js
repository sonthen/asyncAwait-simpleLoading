// @flow

export type State = {
  searchValue: string,
  notFoundValue: string,
  repoListContainer: Array<Object>,
  detailsContainer: Object,
  isFetchError: boolean,
  repoListIsLoading: boolean,
  detailIsLoading: boolean,
  selectedIndex: number,
};
