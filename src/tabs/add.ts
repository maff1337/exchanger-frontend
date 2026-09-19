import { getCurrencies } from "../utils/api-requests.js";
import { createCurrencyOptions } from "../utils/currency-options.js";
import { setupRateSelects } from "../utils/select-utils.js";

export async function showAdd(content: HTMLElement | null): Promise<void> {
    if (content === null) {
        throw new Error("Content element not found");
    }

    const currencies = await getCurrencies();

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

    setupRateSelects(currencies);
}