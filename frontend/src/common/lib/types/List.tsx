export interface ILists extends Array<IList> {}

export interface IList {
  _id: string;
  month: string;
  percent: number;
}
