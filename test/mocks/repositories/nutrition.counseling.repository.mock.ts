import { IFileRepository } from '../../../src/application/port/files.repository.interface'
import { NutritionCounseling } from '../../../src/application/domain/model/nutrition.counseling'
import { DefaultEntityMock } from '../models/default.entity.mock'

export class NutritionCounselingRepositoryMock implements IFileRepository<NutritionCounseling>{
    public getFile(): Promise<NutritionCounseling> {
        return Promise.resolve(new NutritionCounseling().fromJSON(DefaultEntityMock.NUTRITION_COUNSELING))
    }
}
