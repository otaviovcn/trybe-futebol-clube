export default interface IResponse<T> {
  type: number;
  message: T | string | null;
}
