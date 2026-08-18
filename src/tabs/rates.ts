import { rates } from "../data/data.js";

export function showRates(content: HTMLElement | null): void {
    if (content === null) {
        throw new Error("Content element not found");
    }

    content.innerHTML = `
    <h1>Rates</h1>
    ${rates.map(
        (rate) => `
        <p>
            ${rate.baseCurrency.code} - ${rate.targetCurrency.code} - ${rate.rate}
        </p>
        `
    ).join("")}
    `;
}
