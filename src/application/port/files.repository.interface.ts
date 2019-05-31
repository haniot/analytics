export interface IFileRepository<T> {
    getFile(): Promise<T>
}
