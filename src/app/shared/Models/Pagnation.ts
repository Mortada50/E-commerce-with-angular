import { IProduct } from "./product";

export interface IPagnation {
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    data: IProduct[]
}

