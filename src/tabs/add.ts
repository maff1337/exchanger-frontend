import type { Currency } from "../types.js";
import { addCurrency, addRate, getCurrencies } from "../utils/api-requests.js";
import { createCurrencyOptions } from "../utils/currency-options.js";
import { handleApiError } from "../utils/handle-api-error.js";
import { setupRateSelects } from "../utils/select-utils.js";
import { showToast } from "../utils/toast.js";

export async function showAdd(content: HTMLElement | null): Promise<void> {
    if (content === null) {
        throw new Error("Content element not found");
    }

    let currencies: Currency[];

    try {
        currencies = await getCurrencies();
    } catch (error) {
        handleApiError(error, "Cannot load currencies");
        content.innerHTML = `<p class="load-error">Cannot load currencies. Please refresh the page.</p>`;
        return;
    }

    content.innerHTML = `
    <h1>Add new</h1>

    <section class="add-block">
        <h2>Currency</h2>

        <form id="add-currency-form" class="compact-form">
            <div class="field">
                <input type="text" id="add-code" name="code" placeholder=" " required>
                <label for="add-code">Code</label>
            </div>

            <div class="field">
                <input type="text" id="add-name" name="name" placeholder=" " required>
                <label for="add-name">Name</label>
            </div>

            <div class="field">
                <input type="text" id="add-sign" name="sign" placeholder=" " required>
                <label for="add-sign">Sign</label>
            </div>

            <button type="submit">
                Add
            </button>
        </form>
    </section>

    <section class="add-block">
        <h2>Exchange rate</h2>

        <form id="add-rate-form" class="compact-form">
            <label>
                From
                <select id="from-currency" name="baseCurrency" required>
                    <option value="" selected hidden>
                        Select
                    </option>
                    ${createCurrencyOptions(currencies)}
                </select>
            </label>

            <label>
                To
                <select id="to-currency" name="targetCurrency" required>
                    <option value="" selected hidden>
                        Select
                    </option>
                    ${createCurrencyOptions(currencies)}
                </select>
            </label>

            <label>
                Rate
                <input type="number" name="rate" step="any" min="0" required>
            </label>

            <button type="submit">
                Add
            </button>
        </form>
    </section>
`;

    setupRateSelects();
    setupAddCurrencyForm();
    setupAddRateForm(currencies);
}

function setupAddCurrencyForm(): void {
    const form =
        document.querySelector<HTMLFormElement>("#add-currency-form");

    if (form === null) {
        return;
    }

    const submitButton =
        form.querySelector<HTMLButtonElement>('button[type="submit"]');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const code = String(formData.get("code") ?? "").trim();
        const name = String(formData.get("name") ?? "").trim();
        const sign = String(formData.get("sign") ?? "").trim();

        if (submitButton !== null) {
            submitButton.disabled = true;
        }

        try {
            await addCurrency(code, name, sign);
            showToast("Currency added successfully", "success");
            form.reset();
        } catch (error) {
            handleApiError(error);
        } finally {
            if (submitButton !== null) {
                submitButton.disabled = false;
            }
        }
    });
}

function setupAddRateForm(currencies: Currency[]): void {
    const form = document.querySelector<HTMLFormElement>("#add-rate-form");

    if (form === null) {
        return;
    }

    const submitButton =
        form.querySelector<HTMLButtonElement>('button[type="submit"]');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const baseId = String(formData.get("baseCurrency") ?? "");
        const targetId = String(formData.get("targetCurrency") ?? "");
        const rate = String(formData.get("rate") ?? "");

        const from = currencies.find((item) => String(item.id) === baseId);
        const to = currencies.find((item) => String(item.id) === targetId);

        if (from === undefined || to === undefined || rate === "") {
            showToast("Fill in each field", "error");
            return;
        }

        if (submitButton !== null) {
            submitButton.disabled = true;
        }

        try {
            await addRate(from.code, to.code, rate);
            showToast("Rate added successfully", "success");
            form.reset();
        } catch (error) {
            handleApiError(error);
        } finally {
            if (submitButton !== null) {
                submitButton.disabled = false;
            }
        }
    });
}