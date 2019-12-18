import { assert } from 'chai'
import { BloodGlucoseClassificationTypesValidator } from '../../../src/application/domain/validator/blood.glucose.classification.types.validator'
import { BloodGlucoseClassificationTypes } from '../../../src/application/domain/utils/blood.glucose.classification.types'
import { BloodGlucose } from '../../../src/application/domain/model/blood.glucose'

describe('Validators: BloodGlucoseClassificationTypesValidator', () => {
    const wrongMeasurement: BloodGlucose = new BloodGlucose().fromJSON({
        value: 146,
        meal: 'preprandial',
        classification: 'invalid'
    })

    it('should return undefined when the validation was successful', () => {
        const result = BloodGlucoseClassificationTypesValidator.validate(BloodGlucoseClassificationTypes.GOOD)
        assert.equal(result, undefined)
    })

    context('when the object param is invalid', () => {
        it('should throw an error for invalid type', () => {
            try {
                BloodGlucoseClassificationTypesValidator.validate(wrongMeasurement.classification!)
            } catch (err) {
                assert.equal(err.message, 'Value not mapped for blood_glucose.classification: invalid')
                assert.equal(err.description, 'The mapped values are: good, great, undefined.')
            }
        })
    })
})
