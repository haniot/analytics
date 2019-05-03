/**
 * Constants used in dependence injection.
 *
 * @abstract
 */
export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers
    public static readonly HOME_CONTROLLER: any = Symbol.for('HomeController')

    // Services
    public static readonly NUTRITION_EVALUATION_SERVICE: any = Symbol.for('NutritionEvaluationService')

    // Repositories
    public static readonly NUTRITION_EVALUATION_REPOSITORY: any = Symbol.for('NutritionEvaluationRepository')

    // Models
    public static readonly NUTRITION_EVALUATION_REPO_MODEL: any = Symbol.for('NutritionEvaluationRepoModel')

    // Mappers
    public static readonly NUTRITION_EVALUATION_ENTITY_MAPPER: any = Symbol.for('NutritionEvaluationEntityMapper')

    // Background Services
    public static readonly MONGODB_CONNECTION_FACTORY: any = Symbol.for('ConnectionFactoryMongodb')
    public static readonly MONGODB_CONNECTION: any = Symbol.for('ConnectionMongodb')
    public static readonly BACKGROUND_SERVICE: any = Symbol.for('BackgroundService')

    // Tasks

    // Log
    public static readonly LOGGER: any = Symbol.for('CustomLogger')
}
