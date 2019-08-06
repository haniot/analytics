export class DataEntity {
    public id?: string
    public created_at?: Date
    public total_patients?: number
    public file_csv?: string
    public file_xls?: string
    public pilotstudy_id?: string
    public patients?: Array<string>
    public data_types?: Array<string>
}
