export interface ResponseCommon<T> {
  code: string | number;
  message?: string;
  data: T;
}

export const HTTP_CODES = {
  CREATED: 201,
  OK: 200
};
