import { IFileRepository } from '../../../src/application/port/files.repository.interface'
import { DefaultEntityMock } from '../models/default.entity.mock'

export class BloodPressurePerAgeHeightRepositoryMock implements IFileRepository<any> {
    public getFile(): Promise<any> {
        return Promise.resolve(DefaultEntityMock.BLOOD_PRESSURE_PER_AGE_HEIGHT)
    }
}
