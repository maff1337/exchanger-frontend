import type { Currency } from "../types.js";
import { convert, getCurrencies } from "../utils/api-requests.js";
import { createCurrencyOptions } from "../utils/currency-options.js";
import { handleApiError } from "../utils/handle-api-error.js";
import { setupConverterSelects } from "../utils/select-utils.js";
import { showToast } from "../utils/toast.js";

export async function showConverter(content: HTMLElement | null): Promise<void> {
    if (content === null) {
        throw new Error("Content element not found");
    }

    let currencies: Currency[];

    try {
        currencies = await getCurrencies();
    } catch (error) {
        handleApiError(error, "Cannot load currencies list");
        content.innerHTML = `<p class="load-error">Cannot load data. Reload the page.</p>`;
        return;
    }

    content.innerHTML = `
    <h1>Convert</h1>

        <form id="convert-form" class="compact-form">
            <label>
                From
                <select id="convert-from" name="from" required>
                    <option value="" selected hidden>
                        Select
                    </option>
${createCurrencyOptions(currencies)}
                </select>
            </label>

            <label>
                To
                <select id="convert-to" name="to" required>
                    <option value="" selected hidden>
                        Select
                    </option>

${createCurrencyOptions(currencies)}
                </select>
            </label>

            <label>
                Amount
                <input
                    id="convert-amount"
                    type="number"
                    name="amount"
                    min="0"
                    step="any"
                    required
                >
            </label>

            <label>
                Result
                <input
                    id="convert-result"
                    type="text"
                    name="result"
                    disabled
                    placeholder="—"
                >
            </label>

            <button type="submit">
                Convert
            </button>
        </form>
`;

    await setupConverter(currencies);
}

async function setupConverter(currencies: Currency[]): Promise<void> {
    const fromSelect =
        document.querySelector<HTMLSelectElement>("#convert-from");

    const toSelect =
        document.querySelector<HTMLSelectElement>("#convert-to");

    const amountInput =
        document.querySelector<HTMLInputElement>("#convert-amount");

    const resultInput =
        document.querySelector<HTMLInputElement>("#convert-result");

    const form =
        document.querySelector<HTMLFormElement>("#convert-form");

    if (
        fromSelect === null ||
        toSelect === null ||
        amountInput === null ||
        resultInput === null ||
        form === null
    ) {
        throw new Error("Converter elements not found");
    }

    setupConverterSelects(fromSelect, toSelect);

    const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const from = currencies.find((item) => String(item.id) === fromSelect.value);
        const to = currencies.find((item) => String(item.id) === toSelect.value);
        const amount = Number(amountInput.value);

        if (from === undefined || to === undefined || Number.isNaN(amount) || amount < 0) {
            resultInput.value = "";
            showToast("Fill in all fields correctly", "error");
            return;
        }

        if (submitButton !== null) {
            submitButton.disabled = true;
        }

        resultInput.value = "";

        try {
            const converted = await convert(from.code, to.code, String(amount));
            resultInput.value = String(converted.convertedAmount).replace(".", ",");
        } catch (error) {
            handleApiError(error);
        } finally {
            if (submitButton !== null) {
                submitButton.disabled = false;
            }
        }
    });
}