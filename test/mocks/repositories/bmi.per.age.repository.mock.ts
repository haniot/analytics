import { IFileRepository } from '../../../src/application/port/files.repository.interface'
import { BmiPerAge } from '../../../src/application/domain/model/bmi.per.age'
import { DefaultEntityMock } from '../models/default.entity.mock'

export class BmiPerAgeRepositoryMock implements IFileRepository<BmiPerAge> {
    public getFile(): Promise<BmiPerAge> {
        return Promise.resolve(new BmiPerAge().fromJSON(DefaultEntityMock.BMI_PER_AGE))
    }
}
