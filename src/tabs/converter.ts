import { createCurrencyOptions } from "../utils/currency-options.js";
import { setupConverterSelects } from "../utils/select-utils.js";


export function showConverter(content: HTMLElement | null): void {
    if (content === null) {
        throw new Error("Content element not found");
    }

    content.innerHTML = `
    <h1>Convert</h1>

        <form id="convert-form">
            <label>
                From
                <select id="convert-from" name="from" required>
                    <option value="" selected hidden>
                        Select
                    </option>
                    ${createCurrencyOptions()}
                </select>
            </label>

            <label>
                To
                <select id="convert-to" name="to" required>
                    <option value="" selected hidden>
                        Select
                    </option>

                    ${createCurrencyOptions()}
                </select>
            </label>

            <label>
                Amount
                <input
                    type="number"
                    name="amount"
                    min="0"
                    step="any"
                    required
                >
            </label>

            <button type="submit">
                Convert
            </button>
        </form>

        <output id="conversion-result"></output>
    `;

    setupConverter();
}

function setupConverter(): void {
    const fromSelect =
        document.querySelector<HTMLSelectElement>("#convert-from");

    const toSelect =
        document.querySelector<HTMLSelectElement>("#convert-to");

    const form =
        document.querySelector<HTMLFormElement>("#convert-form");

    const result =
        document.querySelector<HTMLOutputElement>("#conversion-result");

    if (
        fromSelect === null ||
        toSelect === null ||
        form === null ||
        result === null
    ) {
        throw new Error("Converter elements not found");
    }

    setupConverterSelects(fromSelect, toSelect);
}