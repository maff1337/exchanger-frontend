import { currencies } from "../data/data.js";

export function createCurrencyOptions(): string {
    return currencies.map(
        (currency) => `
        <option value="${currency.id}">
            ${currency.code}
        </option>
        `
    ).join("");
}