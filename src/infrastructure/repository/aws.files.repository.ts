import { injectable } from 'inversify'
import { IEvaluationFilesManagerRepository } from '../../application/port/evaluation.files.manager.repository.interface'
import AWS from 'aws-sdk'
import { EvaluationFile } from '../../application/domain/model/evaluation.file'

@injectable()
export class AwsFilesRepository implements IEvaluationFilesManagerRepository<EvaluationFile> {
    private sdk: any
    private bucket_name?: string

    constructor() {
        this.sdk = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_BUCKET_REGION
        })
        this.bucket_name = process.env.AWS_BUCKET_NAME
    }

    public async upload(file: EvaluationFile): Promise<string> {
        return new Promise((resolve, reject) => {
            const params: any = {
                Bucket: this.bucket_name,
                Key: file.name,
                Body: file.file,
                ACL: 'public-read'
            }

            this.sdk.upload(params, (err, data) => {
                if (err) return reject({
                    message: 'Could not save data file. Please try again later....'
                })
                return resolve(data.Location)
            })
        })

    }

    public async delete(file: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const params: any = {
                Bucket: this.bucket_name,
                Key: file
            }

            this.sdk.deleteObject(params, (err, data) => {
                if (err) return reject({
                    message: 'Could not delete data file. Please try again later....'
                })
                return resolve(true)
            })
        })
    }

}
