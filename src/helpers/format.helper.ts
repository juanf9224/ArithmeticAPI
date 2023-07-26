import dayjs from "dayjs";
import { Model, Page } from "objection";

export const formatPaginatedResultDates = <T extends Model>(page: Page<T>, dateField: keyof T, format?: string): Page<T> => {
    const withFormattedDates = page.results.map(result => ({
        ...result,
        [dateField]: dayjs(result[dateField] as Date).format(format || 'YYYY-MM-DD')
    }))
    return {
        ...page,
        results: withFormattedDates
    };
}