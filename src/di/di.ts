import 'reflect-metadata'
import { Container } from 'inversify'
import { Identifier } from './identifiers'
import { ConnectionFactoryMongodb } from '../infrastructure/database/connection.factory.mongodb'
import { ConnectionMongodb } from '../infrastructure/database/connection.mongodb'
import { IConnectionDB } from '../infrastructure/port/connection.db.interface'
import { IConnectionFactory } from '../infrastructure/port/connection.factory.interface'
import { BackgroundService } from '../background/background.service'
import { App } from '../app'
import { CustomLogger, ILogger } from '../utils/custom.logger'
import { HomeController } from '../ui/controllers/home.controller'
import { IEntityMapper } from '../infrastructure/port/entity.mapper.interface'
import { INutritionEvaluationRepository } from '../application/port/nutrition.evaluation.repository.interface'
import { NutritionEvaluationRepository } from '../infrastructure/repository/nutrition.evaluation.repository'
import { NutritionEvaluation } from '../application/domain/model/nutrition.evaluation'
import { NutritionEvaluationEntity } from '../infrastructure/entity/nutrition.evaluation.entity'
import { NutritionEvaluationEntityMapper } from '../infrastructure/entity/mapper/nutrition.evaluation.entity.mapper'
import { NutritionEvaluationRepoModel } from '../infrastructure/database/schema/nutrition.evaluation.schema'
import { NutritionEvaluationService } from '../application/service/nutrition.evaluation.service'
import { INutritionEvaluationService } from '../application/port/nutrition.evaluation.service.interface'
import { PatientsNutritionalEvaluationsController } from '../ui/controllers/patients.nutritional.evaluations.controller'
import { PilotStudiesNutritionalEvaluationsController } from '../ui/controllers/pilot.studies.nutritional.evaluations.controller'
import { HealthNutritionalEvaluationController } from '../ui/controllers/health.nutritional.evaluation.controller'
import { DataRepoModel } from '../infrastructure/database/schema/data.schema'
import { Data } from '../application/domain/model/data'
import { DataEntity } from '../infrastructure/entity/data.entity'
import { DataEntityMapper } from '../infrastructure/entity/mapper/data.entity.mapper'
import { IDataRepository } from '../application/port/data.repository.interface'
import { DataRepository } from '../infrastructure/repository/data.repository'
import { IDataService } from '../application/port/data.service.interface'
import { DataService } from '../application/service/data.service'
import { PilotStudiesDataController } from '../ui/controllers/pilot.studies.data.controller'
import { IEvaluationFilesManagerRepository } from '../application/port/evaluation.files.manager.repository.interface'
import { AwsFilesRepository } from '../infrastructure/repository/aws.files.repository'
import { EvaluationFile } from '../application/domain/model/evaluation.file'
import { IFileRepository } from '../application/port/files.repository.interface'
import { BloodPressurePerAgeHeight } from '../application/domain/model/blood.pressure.per.age.height'
import { BloodPressurePerAgeHeightRepository } from '../infrastructure/repository/blood.pressure.per.age.height.repository'
import { BloodPressurePerSysDias } from '../application/domain/model/blood.pressure.per.sys.dias'
import { BloodPressurePerSysDiasRepository } from '../infrastructure/repository/blood.pressure.per.sys.dias.repository'
import { BmiPerAge } from '../application/domain/model/bmi.per.age'
import { BmiPerAgeRepository } from '../infrastructure/repository/bmi.per.age.repository'
import { NutritionCounselingRepository } from '../infrastructure/repository/nutrition.counseling.repository'
import { NutritionCounseling } from '../application/domain/model/nutrition.counseling'
// tslint:disable-next-line:max-line-length
import { PatientsNutritionalEvaluationsCounselingsController } from '../ui/controllers/patients.nutritional.evaluations.counselings.controller'

export class DI {
    private static instance: DI
    private readonly container: Container

    /**
     * Creates an instance of DI.
     *
     * @private
     */
    private constructor() {
        this.container = new Container()
        this.initDependencies()
    }

    /**
     * Recover single instance of class.
     *
     * @static
     * @return {App}
     */
    public static getInstance(): DI {
        if (!this.instance) this.instance = new DI()
        return this.instance
    }

    /**
     * Get Container inversify.
     *
     * @returns {Container}
     */
    public getContainer(): Container {
        return this.container
    }

    /**
     * Initializes injectable containers.
     *
     * @private
     * @return void
     */
    private initDependencies(): void {
        this.container.bind(Identifier.APP).to(App).inSingletonScope()

        // Controllers
        this.container.bind<HomeController>(Identifier.HOME_CONTROLLER)
            .to(HomeController).inSingletonScope()
        this.container.bind<PilotStudiesNutritionalEvaluationsController>(Identifier.PILOT_STUDIES_NUTRITIONAL_EVALUATIONS_CONTROLLER)
            .to(PilotStudiesNutritionalEvaluationsController).inSingletonScope()
        this.container.bind<HealthNutritionalEvaluationController>(Identifier.HEALTH_NUTRITIONAL_EVALUATIONS_CONTROLLER)
            .to(HealthNutritionalEvaluationController).inSingletonScope()
        this.container.bind<PatientsNutritionalEvaluationsController>(Identifier.PATIENTS_NUTRITIONAL_EVALUATIONS_CONTROLLER)
            .to(PatientsNutritionalEvaluationsController).inSingletonScope()
        this.container.bind<PatientsNutritionalEvaluationsCounselingsController>
        (Identifier.PATIENTS_NUTRITIONAL_EVALUATIONS_COUNSELINGS_CONTROLLER)
            .to(PatientsNutritionalEvaluationsCounselingsController).inSingletonScope()
        this.container.bind<PilotStudiesDataController>(Identifier.PILOT_STUDIES_DATA_CONTROLLER)
            .to(PilotStudiesDataController).inSingletonScope()

        // Services
        this.container.bind<INutritionEvaluationService>
        (Identifier.NUTRITION_EVALUATION_SERVICE).to(NutritionEvaluationService).inSingletonScope()
        this.container.bind<IDataService>
        (Identifier.DATA_SERVICE).to(DataService).inSingletonScope()

        // Repositories
        this.container.bind<INutritionEvaluationRepository>(Identifier.NUTRITION_EVALUATION_REPOSITORY)
            .to(NutritionEvaluationRepository).inSingletonScope()
        this.container.bind<IDataRepository>(Identifier.DATA_REPOSITORY)
            .to(DataRepository).inSingletonScope()
        this.container.bind<IEvaluationFilesManagerRepository<EvaluationFile>>(Identifier.AWS_FILES_REPOSITORY)
            .to(AwsFilesRepository).inSingletonScope()
        this.container.bind<IFileRepository<BloodPressurePerAgeHeight>>(Identifier.BLOOD_PRESSURE_PER_AGE_HEIGHT_REPOSITORY)
            .to(BloodPressurePerAgeHeightRepository).inSingletonScope()
        this.container.bind<IFileRepository<BloodPressurePerSysDias>>(Identifier.BLOOD_PRESSURE_PER_SYS_DIAS_REPOSITORY)
            .to(BloodPressurePerSysDiasRepository).inSingletonScope()
        this.container.bind<IFileRepository<BmiPerAge>>(Identifier.BMI_PER_AGE_REPOSITORY)
            .to(BmiPerAgeRepository).inSingletonScope()
        this.container.bind<IFileRepository<NutritionCounseling>>(Identifier.NUTRITION_COUNSELING_REPOSITORY)
            .to(NutritionCounselingRepository).inSingletonScope()

        // Models
        this.container.bind(Identifier.NUTRITION_EVALUATION_REPO_MODEL).toConstantValue(NutritionEvaluationRepoModel)
        this.container.bind(Identifier.DATA_REPO_MODEL).toConstantValue(DataRepoModel)

        // Mappers
        this.container
            .bind<IEntityMapper<NutritionEvaluation, NutritionEvaluationEntity>>(Identifier.NUTRITION_EVALUATION_ENTITY_MAPPER)
            .to(NutritionEvaluationEntityMapper).inSingletonScope()
        this.container.bind<IEntityMapper<Data, DataEntity>>(Identifier.DATA_ENTITY_MAPPER)
            .to(DataEntityMapper).inSingletonScope()

        // Background Services
        this.container
            .bind<IConnectionFactory>(Identifier.MONGODB_CONNECTION_FACTORY)
            .to(ConnectionFactoryMongodb).inSingletonScope()
        this.container
            .bind<IConnectionDB>(Identifier.MONGODB_CONNECTION)
            .to(ConnectionMongodb).inSingletonScope()
        this.container
            .bind(Identifier.BACKGROUND_SERVICE)
            .to(BackgroundService).inSingletonScope()

        // Tasks

        // Log
        this.container.bind<ILogger>(Identifier.LOGGER).to(CustomLogger).inSingletonScope()
    }
}
