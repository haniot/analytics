import { injectable } from 'inversify'
import { IEvaluationFilesManagerRepository } from '../../application/port/evaluation.files.manager.repository.interface'
import AWS from 'aws-sdk'
import { EvaluationFile } from '../../application/domain/model/evaluation.file'

@injectable()
export class AwsFilesRepository implements IEvaluationFilesManagerRepository<EvaluationFile> {
    private _sdk: any
    private _bucket_name?: string

    constructor() {
        this._sdk = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        })
        this._bucket_name = process.env.AWS_BUCKET_NAME
    }

    public async upload(file: EvaluationFile): Promise<string> {
        return new Promise((resolve, reject) => {
            const params: any = {
                Bucket: this._bucket_name,
                Key: file.name,
                Body: file.file,
                ACL: 'public-read'
            }

            this._sdk.upload(params, (err, data) => {
                if (err) return reject({
                    message: 'Could not save odontologic evaluation file. Please try again later....',
                    description: err.message ? err.message : ''
                })
                return resolve(data.Location)
            })
        })

    }

    public async delete(file: EvaluationFile): Promise<any> {
        return new Promise((resolve, reject) => {
            const params: any = {
                Bucket: this._bucket_name,
                Key: file.name
            }

            this._sdk.deleteObject(params, (err, data) => {
                if (err) return reject({ message: 'Could not delete odontologic evaluation file. Please try again later....' })
                return resolve(true)
            })
        })
    }

}
