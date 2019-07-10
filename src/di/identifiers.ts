/**
 * Constants used in dependence injection.
 *
 * @abstract
 */
export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers
    public static readonly HOME_CONTROLLER: any = Symbol.for('HomeController')
    public static readonly EVALUATIONS_CONTROLLER: any = Symbol.for('EvaluationsController')
    public static readonly NUTRITIONAL_EVALUATIONS_CONTROLLER: any = Symbol.for('NutritionalEvaluationsController')
    public static readonly PILOT_STUDIES_NUTRITIONAL_EVALUATIONS_CONTROLLER: any =
        Symbol.for('PilotStudiesNutritionalEvaluationsController')
    public static readonly HEALTH_NUTRITIONAL_EVALUATIONS_CONTROLLER: any =
        Symbol.for('HealthNutritionalEvaluationController')
    public static readonly PATIENTS_NUTRITIONAL_EVALUATIONS_CONTROLLER: any = Symbol.for('PatientsNutritionalEvaluationsController')
    public static readonly PATIENTS_NUTRITIONAL_EVALUATIONS_COUNSELINGS_CONTROLLER: any =
        Symbol.for('PatientsNutritionalEvaluationsCounselingsController')
    public static readonly PATIENTS_ODONTOLOGIC_EVALUATIONS_CONTROLLER: any =
        Symbol.for('PilotStudiesOdontologicalEvaluationsController')

    // Services
    public static readonly NUTRITION_EVALUATION_SERVICE: any = Symbol.for('NutritionEvaluationService')
    public static readonly ODONTOLOGIC_EVALUATION_SERVICE: any = Symbol.for('OdontologicEvaluationService')

    // Repositories
    public static readonly NUTRITION_EVALUATION_REPOSITORY: any = Symbol.for('NutritionEvaluationRepository')
    public static readonly ODONTOLOGIC_EVALUATION_REPOSITORY: any = Symbol.for('OdontologicEvaluationRepository')
    public static readonly AWS_FILES_REPOSITORY: any = Symbol.for('AwsFilesRepository')
    public static readonly BLOOD_PRESSURE_PER_AGE_HEIGHT_REPOSITORY: any =
        Symbol.for('BloodPressurePerAgeHeightRepository')
    public static readonly BLOOD_PRESSURE_PER_SYS_DIAS_REPOSITORY: any =
        Symbol.for('BloodPressurePerSysDiasRepository')
    public static readonly BMI_PER_AGE_REPOSITORY: any = Symbol.for('BmiPerAgeRepository')
    public static readonly NUTRITION_COUNSELING_REPOSITORY: any = Symbol.for('NutritionCounselingRepository')

    // Models
    public static readonly NUTRITION_EVALUATION_REPO_MODEL: any = Symbol.for('NutritionEvaluationRepoModel')
    public static readonly ODONTOLOGIC_EVALUATION_REPO_MODEL: any = Symbol.for('OdontologicEvaluationRepoModel')

    // Mappers
    public static readonly NUTRITION_EVALUATION_ENTITY_MAPPER: any = Symbol.for('NutritionEvaluationEntityMapper')
    public static readonly ODONTOLOGIC_EVALUATION_ENTITY_MAPPER: any = Symbol.for('OdontologicEvaluationEntityMapper')

    // Background Services
    public static readonly MONGODB_CONNECTION_FACTORY: any = Symbol.for('ConnectionFactoryMongodb')
    public static readonly MONGODB_CONNECTION: any = Symbol.for('ConnectionMongodb')
    public static readonly BACKGROUND_SERVICE: any = Symbol.for('BackgroundService')

    // Tasks

    // Log
    public static readonly LOGGER: any = Symbol.for('CustomLogger')
}
