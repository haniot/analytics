import { injectable } from 'inversify'
import { IUploadFile } from '../port/upload.file.interface'

@injectable()
export class FirebaseRepository implements IUploadFile {
    public async upload(file: any): Promise<any> {

    }

}
