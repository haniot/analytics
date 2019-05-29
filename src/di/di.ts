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
import { EvaluationController } from '../ui/controllers/evaluation.controller'
import { NutritionalEvaluationController } from '../ui/controllers/nutritional.evaluation.controller'
import { PatientNutritionalEvaluationController } from '../ui/controllers/patient.nutritional.evaluation.controller'
import { PilotStudyNutritionalEvaluationController } from '../ui/controllers/pilot.study.nutritional.evaluation.controller'
import { HealthNutritionalEvaluationController } from '../ui/controllers/health.nutritional.evaluation.controller'
import { OdontologicEvaluationRepoModel } from '../infrastructure/database/schema/odontologic.evaluation.schema'
import { OdontologicEvaluation } from '../application/domain/model/odontologic.evaluation'
import { OdontologicEvaluationEntity } from '../infrastructure/entity/odontologic.evaluation.entity'
import { OdontologicEvaluationEntityMapper } from '../infrastructure/entity/mapper/odontologic.evaluation.entity.mapper'
import { IOdontologicEvaluationRepository } from '../application/port/odontologic.evaluation.repository.interface'
import { OdontologicEvaluationRepository } from '../infrastructure/repository/odontologic.evaluation.repository'
import { IOdontologicEvaluationService } from '../application/port/odontologic.evaluation.service.interface'
import { OdontologicEvaluationService } from '../application/service/odontologic.evaluation.service'
import { PilotStudyOdontologicalEvaluationController } from '../ui/controllers/pilot.study.odontological.evaluation.controller'
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
        this.container.bind<EvaluationController>(Identifier.EVALUATION_CONTROLLER)
            .to(EvaluationController).inSingletonScope()
        this.container.bind<PilotStudyNutritionalEvaluationController>(Identifier.PILOT_STUDY_NUTRITIONAL_EVALUATION_CONTROLLER)
            .to(PilotStudyNutritionalEvaluationController).inSingletonScope()
        this.container.bind<HealthNutritionalEvaluationController>(Identifier.HEALTH_NUTRITIONAL_EVALUATION_CONTROLLER)
            .to(HealthNutritionalEvaluationController).inSingletonScope()
        this.container.bind<NutritionalEvaluationController>(Identifier.NUTRITIONAL_EVALUATION_CONTROLLER)
            .to(NutritionalEvaluationController).inSingletonScope()
        this.container.bind<PatientNutritionalEvaluationController>(Identifier.PATIENT_NUTRITIONAL_EVALUATION_CONTROLLER)
            .to(PatientNutritionalEvaluationController).inSingletonScope()
        this.container.bind<PilotStudyOdontologicalEvaluationController>(Identifier.PATIENT_ODONTOLOGIC_EVALUATION_CONTROLLER)
            .to(PilotStudyOdontologicalEvaluationController).inSingletonScope()

        // Services
        this.container.bind<INutritionEvaluationService>
        (Identifier.NUTRITION_EVALUATION_SERVICE).to(NutritionEvaluationService).inSingletonScope()
        this.container.bind<IOdontologicEvaluationService>
        (Identifier.ODONTOLOGIC_EVALUATION_SERVICE).to(OdontologicEvaluationService).inSingletonScope()

        // Repositories
        this.container.bind<INutritionEvaluationRepository>(Identifier.NUTRITION_EVALUATION_REPOSITORY)
            .to(NutritionEvaluationRepository).inSingletonScope()
        this.container.bind<IOdontologicEvaluationRepository>(Identifier.ODONTOLOGIC_EVALUATION_REPOSITORY)
            .to(OdontologicEvaluationRepository).inSingletonScope()
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
        this.container.bind(Identifier.ODONTOLOGIC_EVALUATION_REPO_MODEL).toConstantValue(OdontologicEvaluationRepoModel)

        // Mappers
        this.container
            .bind<IEntityMapper<NutritionEvaluation, NutritionEvaluationEntity>>(Identifier.NUTRITION_EVALUATION_ENTITY_MAPPER)
            .to(NutritionEvaluationEntityMapper).inSingletonScope()
        this.container
            .bind<IEntityMapper<OdontologicEvaluation, OdontologicEvaluationEntity>>
            (Identifier.ODONTOLOGIC_EVALUATION_ENTITY_MAPPER)
            .to(OdontologicEvaluationEntityMapper).inSingletonScope()

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
