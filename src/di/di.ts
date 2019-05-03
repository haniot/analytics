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

        // Services
        this.container.bind<INutritionEvaluationService>
        (Identifier.NUTRITION_EVALUATION_SERVICE).to(NutritionEvaluationService).inSingletonScope()

        // Repositories
        this.container.bind<INutritionEvaluationRepository>(Identifier.NUTRITION_EVALUATION_REPOSITORY)
            .to(NutritionEvaluationRepository).inSingletonScope()

        // Models
        this.container.bind(Identifier.NUTRITION_EVALUATION_REPO_MODEL).toConstantValue(NutritionEvaluationRepoModel)

        // Mappers
        this.container
            .bind<IEntityMapper<NutritionEvaluation, NutritionEvaluationEntity>>(Identifier.NUTRITION_EVALUATION_ENTITY_MAPPER)
            .to(NutritionEvaluationEntityMapper).inSingletonScope()

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
