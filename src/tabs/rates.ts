import type { Rate } from "../types.js";
import { getRates, patchRate } from "../utils/api-requests.js";
import { handleApiError } from "../utils/handle-api-error.js";
import { showToast } from "../utils/toast.js";

export async function showRates(content: HTMLElement | null): Promise<void> {
    if (content === null) {
        throw new Error("Content element not found");
    }

    let rates: Rate[];

    try {
        rates = await getRates();
    } catch (error) {
        handleApiError(error, "Cannot load rates");
        content.innerHTML = `<p class="load-error">Cannot load rates. Please, restart the page.</p>`;
        return;
    }

    content.innerHTML = `
    <div class="rates-table">
        <table>
            <thead>
                <th>From</th>
                <th>To</th>
                <th>Rate</th>
            </thead>
            <tbody>
${rates
    .map(
        (rate, index) => `
                    <tr>
                        <td>${rate.baseCurrency.code}</td>
                        <td>${rate.targetCurrency.code}</td>
                        <td>
                            <div class="rate-edit">
                                <input
                                    class="rate-input"
                                    type="number"
                                    step="any"
                                    min="0"
                                    value="${rate.rate}"
                                    data-index="${index}"
                                >
                                <button
                                    type="button"
                                    class="rate-save-btn"
                                    data-index="${index}"
                                    disabled
                                >
                                    Save
                                </button>
                            </div>
                        </td>
                    </tr>
`
    )
    .join("")}
            </tbody>
        </table>
    </div>
`;

    setupRatesTable(rates);
}

function setupRatesTable(rates: Rate[]): void {
    const rows = document.querySelectorAll<HTMLElement>(".rate-edit");

    rows.forEach((row) => {
        const input = row.querySelector<HTMLInputElement>(".rate-input");
        const button = row.querySelector<HTMLButtonElement>(".rate-save-btn");

        if (input === null || button === null) {
            return;
        }

        const index = Number(input.dataset.index);
        const rate = rates[index];

        if (rate === undefined) {
            return;
        }

        input.addEventListener("input", () => {
            const value = Number(input.value);
            const isValid = input.value !== "" && !Number.isNaN(value) && value >= 0;
            const isChanged = isValid && value !== rate.rate;

            button.disabled = !isChanged;
        });

        button.addEventListener("click", () => {
            const value = Number(input.value);

            if (Number.isNaN(value) || value < 0) {
                input.value = String(rate.rate);
                button.disabled = true;
                return;
            }

            void saveRate(rate, value, input, button);
        });
    });
}

async function saveRate(
    rate: Rate,
    value: number,
    input: HTMLInputElement,
    button: HTMLButtonElement
): Promise<void> {
    button.disabled = true;
    const originalLabel = button.textContent;
    button.textContent = "Saving...";

    try {
        await patchRate(
            `${rate.baseCurrency.code.toUpperCase()}${rate.targetCurrency.code.toUpperCase()}`,
            value
        );

        rate.rate = value;

        input.classList.remove("rate-input--saved");

        void input.offsetWidth;
        input.classList.add("rate-input--saved");

        showToast("Exchange rate was updated successfully", "success");
    } catch (error) {
        handleApiError(error);
        button.disabled = false;
    } finally {
        button.textContent = originalLabel;
    }
}