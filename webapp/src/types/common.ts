export interface Result<T> {
    message: string,
    succeed: boolean,
    data: T
}

export interface Pagination {
    pageSize: number,
    pageIndex: number,
}