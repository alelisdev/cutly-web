/**
 *  Basic contract
 */
export interface IBasic {
  isBusy: boolean;
  showError: boolean;
  errorMessage: string;
}

/**
 * Generic list response
 */
export interface IList<T> {
  page: number;
  data: Array<T>,
  hasMore: boolean;
  nextPage: number;
  pageSize: number;
  totalCount: number;
}


/**
 * ICrud props
 */
export interface ICrud<T> extends IBasic {
  page: number;
  data: Array<T>,
  selectedItem: T,
  hasMore: boolean;
  nextPage: number;
  pageSize: number;
  totalCount: number;
}

/**
 * Select interface
 */
export interface ISelectOption {
  label: string;
  value: any;
}
