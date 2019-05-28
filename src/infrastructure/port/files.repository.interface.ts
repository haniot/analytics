import { EvaluationFile } from '../../application/domain/model/evaluation.file'

export interface IFilesRepository {
    upload(file: EvaluationFile): Promise<string>

    delete(file: EvaluationFile): Promise<boolean>
}
