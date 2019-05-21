export class DateUtils {
    public static getAgeFromBirthDate(birthDate: string): any {
        const dateNow = new Date() // date now
        const dateBirth = new Date(birthDate) // birth date in Date format
        const totalOfMonths = (dateNow.getFullYear() - dateBirth.getFullYear()) * 12 + (dateNow.getMonth() - dateBirth.getMonth())
        const yearsLived = Math.floor(totalOfMonths / 12)
        const monthsLived = totalOfMonths % 12
        return {
            age: yearsLived,
            age_with_months: `${yearsLived}a`.concat(monthsLived > 0 ? `${monthsLived}m` : '')
        }
    }
}
