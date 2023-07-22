import { OrderByDirection } from "objection";

export interface IMeta {
    sortBy: OrderByDirection;
    orderBy: string;
    page: number;
    itemsPerPage: number;
}