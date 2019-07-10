import { IEvaluationFilesManagerRepository } from '../../../src/application/port/evaluation.files.manager.repository.interface'

export class AwsFilesRepositoryMock implements IEvaluationFilesManagerRepository<any> {
    public delete(file: any): Promise<boolean> {
        return Promise.resolve(true)
    }

    public upload(file: any): Promise<string> {
        return Promise.resolve('https://repo.com/file.any')
    }

    public checkExists(): Promise<boolean> {
        return Promise.resolve(true)
    }
}
