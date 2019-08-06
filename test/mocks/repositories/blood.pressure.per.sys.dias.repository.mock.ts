import { IFileRepository } from '../../../src/application/port/files.repository.interface'
import { BloodPressurePerSysDias } from '../../../src/application/domain/model/blood.pressure.per.sys.dias'
import { DefaultEntityMock } from '../models/default.entity.mock'

export class BloodPressurePerSysDiasRepositoryMock implements IFileRepository<BloodPressurePerSysDias> {
    public getFile(): Promise<BloodPressurePerSysDias> {
        return Promise.resolve(new BloodPressurePerSysDias().fromJSON(DefaultEntityMock.BLOOD_PRESSURE_PER_SYS_DIAS))
    }

}
