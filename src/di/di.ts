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
import { ConnectionFactoryRabbitMQ } from '../infrastructure/eventbus/rabbitmq/connection.factory.rabbitmq'
import { PublishEventBusTask } from '../background/task/publish.event.bus.task'
import { IBackgroundTask } from '../application/port/background.task.interface'
import { SubscribeEventBusTask } from '../background/task/subscribe.event.bus.task'
import { EventBusRabbitMQ } from '../infrastructure/eventbus/rabbitmq/eventbus.rabbitmq'
import { IntegrationEventRepoModel } from '../infrastructure/database/schema/integration.event.schema'
import { ConnectionRabbitMQ } from '../infrastructure/eventbus/rabbitmq/connection.rabbitmq'
import { IConnectionEventBus } from '../infrastructure/port/connection.event.bus.interface'
import { IEventBus } from '../infrastructure/port/event.bus.interface'
import { IntegrationEventRepository } from '../infrastructure/repository/integration.event.repository'
import { IIntegrationEventRepository } from '../application/port/integration.event.repository.interface'

export class IoC {
    private readonly _container: Container

    /**
     * Creates an instance of DI.
     *
     * @private
     */
    constructor() {
        this._container = new Container()
        this.initDependencies()
    }

    /**
     * Get Container inversify.
     *
     * @returns {Container}
     */
    get container(): Container {
        return this._container
    }

    /**
     * Initializes injectable containers.
     *
     * @private
     * @return void
     */
    private initDependencies(): void {
        this._container.bind(Identifier.APP).to(App).inSingletonScope()

        // Controllers
        this._container.bind<HomeController>(Identifier.HOME_CONTROLLER)
            .to(HomeController).inSingletonScope()
        this._container.bind<PilotStudiesNutritionalEvaluationsController>(Identifier.PILOT_STUDIES_NUTRITIONAL_EVALUATIONS_CONTROLLER)
            .to(PilotStudiesNutritionalEvaluationsController).inSingletonScope()
        this._container.bind<HealthNutritionalEvaluationController>(Identifier.HEALTH_NUTRITIONAL_EVALUATIONS_CONTROLLER)
            .to(HealthNutritionalEvaluationController).inSingletonScope()
        this._container.bind<PatientsNutritionalEvaluationsController>(Identifier.PATIENTS_NUTRITIONAL_EVALUATIONS_CONTROLLER)
            .to(PatientsNutritionalEvaluationsController).inSingletonScope()
        this._container.bind<PatientsNutritionalEvaluationsCounselingsController>
        (Identifier.PATIENTS_NUTRITIONAL_EVALUATIONS_COUNSELINGS_CONTROLLER)
            .to(PatientsNutritionalEvaluationsCounselingsController).inSingletonScope()
        this._container.bind<PilotStudiesDataController>(Identifier.PILOT_STUDIES_DATA_CONTROLLER)
            .to(PilotStudiesDataController).inSingletonScope()

        // Services
        this._container.bind<INutritionEvaluationService>
        (Identifier.NUTRITION_EVALUATION_SERVICE).to(NutritionEvaluationService).inSingletonScope()
        this._container.bind<IDataService>
        (Identifier.DATA_SERVICE).to(DataService).inSingletonScope()

        // Repositories
        this._container.bind<INutritionEvaluationRepository>(Identifier.NUTRITION_EVALUATION_REPOSITORY)
            .to(NutritionEvaluationRepository).inSingletonScope()
        this._container.bind<IDataRepository>(Identifier.DATA_REPOSITORY)
            .to(DataRepository).inSingletonScope()
        this._container.bind<IEvaluationFilesManagerRepository<EvaluationFile>>(Identifier.AWS_FILES_REPOSITORY)
            .to(AwsFilesRepository).inSingletonScope()
        this._container.bind<IFileRepository<BloodPressurePerAgeHeight>>(Identifier.BLOOD_PRESSURE_PER_AGE_HEIGHT_REPOSITORY)
            .to(BloodPressurePerAgeHeightRepository).inSingletonScope()
        this._container.bind<IFileRepository<BloodPressurePerSysDias>>(Identifier.BLOOD_PRESSURE_PER_SYS_DIAS_REPOSITORY)
            .to(BloodPressurePerSysDiasRepository).inSingletonScope()
        this._container.bind<IFileRepository<BmiPerAge>>(Identifier.BMI_PER_AGE_REPOSITORY)
            .to(BmiPerAgeRepository).inSingletonScope()
        this._container.bind<IFileRepository<NutritionCounseling>>(Identifier.NUTRITION_COUNSELING_REPOSITORY)
            .to(NutritionCounselingRepository).inSingletonScope()
        this._container.bind<IIntegrationEventRepository>(Identifier.INTEGRATION_EVENT_REPOSITORY)
            .to(IntegrationEventRepository).inSingletonScope()

        // Models
        this._container.bind(Identifier.NUTRITION_EVALUATION_REPO_MODEL).toConstantValue(NutritionEvaluationRepoModel)
        this._container.bind(Identifier.DATA_REPO_MODEL).toConstantValue(DataRepoModel)
        this._container.bind(Identifier.INTEGRATION_EVENT_REPO_MODEL).toConstantValue(IntegrationEventRepoModel)

        // Mappers
        this._container
            .bind<IEntityMapper<NutritionEvaluation, NutritionEvaluationEntity>>(Identifier.NUTRITION_EVALUATION_ENTITY_MAPPER)
            .to(NutritionEvaluationEntityMapper).inSingletonScope()
        this._container.bind<IEntityMapper<Data, DataEntity>>(Identifier.DATA_ENTITY_MAPPER)
            .to(DataEntityMapper).inSingletonScope()

        // Background Services
        this._container
            .bind<IConnectionFactory>(Identifier.MONGODB_CONNECTION_FACTORY)
            .to(ConnectionFactoryMongodb).inSingletonScope()
        this._container
            .bind<IConnectionDB>(Identifier.MONGODB_CONNECTION)
            .to(ConnectionMongodb).inSingletonScope()
        this._container
            .bind<IConnectionFactory>(Identifier.RABBITMQ_CONNECTION_FACTORY)
            .to(ConnectionFactoryRabbitMQ).inSingletonScope()
        this._container
            .bind<IConnectionEventBus>(Identifier.RABBITMQ_CONNECTION)
            .to(ConnectionRabbitMQ)
        this._container
            .bind<IEventBus>(Identifier.RABBITMQ_EVENT_BUS)
            .to(EventBusRabbitMQ).inSingletonScope()
        this._container
            .bind(Identifier.BACKGROUND_SERVICE)
            .to(BackgroundService).inSingletonScope()
        this._container
            .bind<IBackgroundTask>(Identifier.PUBLISH_EVENT_BUS_TASK)
            .to(PublishEventBusTask).inSingletonScope()
        this._container
            .bind<IBackgroundTask>(Identifier.SUBSCRIBE_EVENT_BUS_TASK)
            .to(SubscribeEventBusTask).inSingletonScope()

        // Tasks

        // Log
        this._container.bind<ILogger>(Identifier.LOGGER).to(CustomLogger).inSingletonScope()
    }
}
export const DIContainer = new IoC().container
