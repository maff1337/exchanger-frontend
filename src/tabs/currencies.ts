import { currencies } from "../data/data.js";

export function showCurrencies(content: HTMLElement | null): void {
    if (content === null) {
        throw new Error("Content element not found");
    }

    content.innerHTML = `
    <h1>Currencies</h1>
    ${currencies.map(
        (currency) => `
        <p>
            ${currency.code} - ${currency.name} - ${currency.sign}
        </p>
        `
    ).join("")
    }
    `;
}
