export interface IEvaluationFilesManagerRepository<T> {
    upload(file: T): Promise<string>

    delete(file: string): Promise<boolean>
}
