/**
 * Constants used in dependence injection.
 *
 * @abstract
 */
export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers
    public static readonly HOME_CONTROLLER: any = Symbol.for('HomeController')
    public static readonly PATIENTS_NUTRITIONAL_EVALUATIONS_CONTROLLER: any = Symbol.for('PatientsNutritionalEvaluationsController')
    public static readonly PATIENTS_NUTRITIONAL_EVALUATIONS_COUNSELINGS_CONTROLLER: any =
        Symbol.for('PatientsNutritionalEvaluationsCounselingsController')
    public static readonly PILOT_STUDIES_NUTRITIONAL_EVALUATIONS_CONTROLLER: any =
        Symbol.for('PilotStudiesNutritionalEvaluationsController')
    public static readonly HEALTH_NUTRITIONAL_EVALUATIONS_CONTROLLER: any =
        Symbol.for('HealthNutritionalEvaluationController')
    public static readonly PILOT_STUDIES_DATA_CONTROLLER: any =
        Symbol.for('PilotStudiesDataController')

    // Services
    public static readonly NUTRITION_EVALUATION_SERVICE: any = Symbol.for('NutritionEvaluationService')
    public static readonly DATA_SERVICE: any = Symbol.for('DataService')

    // Repositories
    public static readonly NUTRITION_EVALUATION_REPOSITORY: any = Symbol.for('NutritionEvaluationRepository')
    public static readonly DATA_REPOSITORY: any = Symbol.for('DataRepository')
    public static readonly AWS_FILES_REPOSITORY: any = Symbol.for('AwsFilesRepository')
    public static readonly BLOOD_PRESSURE_PER_AGE_HEIGHT_REPOSITORY: any =
        Symbol.for('BloodPressurePerAgeHeightRepository')
    public static readonly BLOOD_PRESSURE_PER_SYS_DIAS_REPOSITORY: any =
        Symbol.for('BloodPressurePerSysDiasRepository')
    public static readonly BMI_PER_AGE_REPOSITORY: any = Symbol.for('BmiPerAgeRepository')
    public static readonly NUTRITION_COUNSELING_REPOSITORY: any = Symbol.for('NutritionCounselingRepository')

    // Models
    public static readonly NUTRITION_EVALUATION_REPO_MODEL: any = Symbol.for('NutritionEvaluationRepoModel')
    public static readonly DATA_REPO_MODEL: any = Symbol.for('DataRepoModel')

    // Mappers
    public static readonly NUTRITION_EVALUATION_ENTITY_MAPPER: any = Symbol.for('NutritionEvaluationEntityMapper')
    public static readonly DATA_ENTITY_MAPPER: any = Symbol.for('DataEntityMapper')

    // Background Services
    public static readonly MONGODB_CONNECTION_FACTORY: any = Symbol.for('ConnectionFactoryMongodb')
    public static readonly MONGODB_CONNECTION: any = Symbol.for('ConnectionMongodb')
    public static readonly RABBITMQ_CONNECTION_FACTORY: any = Symbol.for('ConnectionFactoryRabbitMQ')
    public static readonly RABBITMQ_CONNECTION: any = Symbol.for('ConnectionRabbitMQ')
    public static readonly RABBITMQ_EVENT_BUS: any = Symbol.for('EventBusRabbitMQ')
    public static readonly BACKGROUND_SERVICE: any = Symbol.for('BackgroundService')

    // Tasks
    public static readonly SUBSCRIBE_EVENT_BUS_TASK: any = Symbol.for('SubscribeEventBusTask')

    // Log
    public static readonly LOGGER: any = Symbol.for('CustomLogger')
}
