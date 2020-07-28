/**
 * Class that defines variables with default values.
 *
 * @see Variables defined in .env will have preference.
 * @see Be careful not to put critical data in this file as it is not in .gitignore.
 * Sensitive data such as database, passwords and keys should be stored in secure locations.
 *
 * @abstract
 */
export abstract class Strings {
    public static readonly APP: any = {
        TITLE: 'Analytics Service',
        APP_DESCRIPTION: 'Micro-service for data analyses.'
    }

    public static readonly ERROR_MESSAGE: any = {
        REQUEST_BODY_INVALID: 'Unable to process request body!',
        REQUEST_BODY_INVALID_DESC: 'Please verify that the JSON provided in the request body has a valid format and try again.',
        ENDPOINT_NOT_FOUND: 'Endpoint {0} does not found!',
        UNEXPECTED: 'An unexpected error has occurred. Please try again later...',
        UUID_NOT_VALID_FORMAT: 'Some ID provided does not have a valid format!',
        UUID_NOT_VALID_FORMAT_DESC: 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea is expected.',
        PARAMETER_COULD_NOT_BE_UPDATED: 'This parameter could not be updated.',
        PARAMETER_COULD_NOT_BE_UPDATED_DESC: 'The follow parameter could not be updated: '
    }

    public static readonly ENUM_VALIDATOR: any = {
        NOT_MAPPED: 'Value not mapped for ',
        NOT_MAPPED_DESC: 'The mapped values are: '
    }

    public static readonly NUTRITION_EVALUATION: any = {
        NOT_FOUND: 'Nutrition evaluation record not found!',
        NOT_FOUND_DESCRIPTION: 'Nutrition evaluation record not found or already removed.' +
            ' A new operation for the same resource is required.'
    }
}
