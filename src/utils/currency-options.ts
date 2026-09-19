import type { Currency } from "../types.js";

export function createCurrencyOptions(currencies: Currency[]): string {
    return currencies.map(
        (currency) => `
        <option value="${currency.id}">
            ${currency.code}
        </option>
        `
    ).join("");
}