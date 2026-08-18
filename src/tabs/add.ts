import { createCurrencyOptions } from "../utils/currency-options.js";
import { setupRateSelects } from "../utils/select-utils.js";

export function showAdd(content: HTMLElement | null): void {
    if (content === null) {
        throw new Error("Content element not found");
    }

    content.innerHTML = `
    <h1>ADD</h1>

    <section>
        <h2>Add currency</h2>

        <form id="add-currency-from">
            <label>
                Code
                <input type="text" name="code" required /> 
            </label>

            <label>
                Name
                <input type="text" name="name" required /> 
            </label>

            <label>
                Sign
                <input type="text" name="sign" required /> 
            </label>

            <button type="submit">
                Add
            </button>
        </form>
    </section>

    <section>
        <h2>Add rate</h2>

        <form id="add-rate-form">
            <label>
                From
                <select id="from-currency" name="baseCurrency" requied>
                    <option value="" selected hidden>
                        Select
                    </option>

                    ${createCurrencyOptions()}
                </select>
            </label>

            <label>
                to
                <select id="to-currency" name="targetCurrency" requied>
                    <option value="" selected hidden>
                        Select
                    </option>
                    
                    ${createCurrencyOptions()}
                </select>
            </label>

            <label>
                Rate
                <input type="number" name="rate" step="any" min="0" required />
            </label>

            <button type="submit">
                Add
            </button>
        </form>
    </section>
    `;

    setupRateSelects();
}
