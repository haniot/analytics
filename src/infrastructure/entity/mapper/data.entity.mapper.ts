import { IEntityMapper } from '../../port/entity.mapper.interface'
import { DataEntity } from '../data.entity'
import { Data } from '../../../application/domain/model/data'
import { injectable } from 'inversify'

@injectable()
export class DataEntityMapper implements IEntityMapper<Data, DataEntity> {
    public jsonToModel(json: any): Data {
        const result: Data = new Data()

        if (!json) return result
        if (json.id !== undefined) result.id = json.id
        if (json.created_at !== undefined) result.created_at = json.created_at
        if (json.type !== undefined) result.type = json.type
        if (json.total_patients !== undefined) result.total_patients = json.total_patients
        if (json.file_csv !== undefined) result.file_csv = json.file_csv
        if (json.file_xls !== undefined) result.file_xls = json.file_xls
        if (json.health_professional_id !== undefined) result.health_professional_id = json.health_professional_id
        if (json.pilotstudy_id !== undefined) result.pilotstudy_id = json.pilotstudy_id

        return result
    }

    public modelEntityToModel(item: DataEntity): Data {
        throw Error('Not implemented!')
    }

    public modelToModelEntity(item: Data): DataEntity {
        const result: DataEntity = new DataEntity()

        if (item.id !== undefined) result.id = item.id
        if (item.created_at !== undefined) result.created_at = item.created_at
        if (item.type !== undefined) result.type = item.type
        if (item.total_patients !== undefined) result.total_patients = item.total_patients
        if (item.file_csv !== undefined) result.file_csv = item.file_csv
        if (item.file_xls !== undefined) result.file_xls = item.file_xls
        if (item.health_professional_id !== undefined) result.health_professional_id = item.health_professional_id
        if (item.pilotstudy_id !== undefined) result.pilotstudy_id = item.pilotstudy_id

        return result
    }

    public transform(item: any): any {
        if (item instanceof Data) return this.modelToModelEntity(item)
        return this.jsonToModel(item) // json
    }

}
