const bloodGlucoseZones = {
    preprandial: {
        good: {
            min: 65,
            max: 100
        },
        great: {
            min: 90,
            max: 145
        }
    },
    postprandial: {
        good: {
            min: 80,
            max: 126
        },
        great: {
            min: 90,
            max: 180
        }
    },
    bedtime: {
        good: {
            min: 80,
            max: 100
        },
        great: {
            min: 120,
            max: 180
        }
    },
    glycated_hemoglobin: {
        good: {
            min: 4.5,
            max: 6.05
        },
        great: {
            min: 5.7,
            max: 7.5
        }
    }
}

export const BloodGlucoseZones = {
    zones: bloodGlucoseZones
}
