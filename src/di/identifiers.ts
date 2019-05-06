/**
 * Constants used in dependence injection.
 *
 * @abstract
 */
export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers
    public static readonly HOME_CONTROLLER: any = Symbol.for('HomeController')
    public static readonly EVALUATION_CONTROLLER: any = Symbol.for('EvaluationController')
    public static readonly NUTRITIONAL_EVALUATION_CONTROLLER: any = Symbol.for('NutritionalEvaluationController')
    public static readonly PILOT_STUDY_NUTRITIONAL_EVALUATION_CONTROLLER: any =
        Symbol.for('PilotStudyNutritionalEvaluationController')
    public static readonly HEALTH_NUTRITIONAL_EVALUATION_CONTROLLER: any =
        Symbol.for('HealthNutritionalEvaluationController')
    public static readonly PATIENT_NUTRITIONAL_EVALUATION_CONTROLLER: any = Symbol.for('PatientNutritionalEvaluationController')

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
