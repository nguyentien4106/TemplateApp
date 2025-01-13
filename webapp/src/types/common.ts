export interface Result<T> {
    message: string,
    succeed: boolean,
    data: T
}