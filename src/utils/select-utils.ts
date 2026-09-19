import type { Currency } from "../types.js";
import { addCurrency, addRate } from "./api-requests.js";

export function setupRateSelects(currencies: Currency[]): void {
    const baseSelect = document.querySelector<HTMLSelectElement>("#from-currency");
    const targetSelect = document.querySelector<HTMLSelectElement>("#to-currency");

    if (baseSelect === null || targetSelect === null) {
        throw new Error("Rate selects not found");
    }

    const updateOptions = (): void => {
        const baseCurrId = baseSelect.value;
        const targetCurrId = targetSelect.value;

        Array.from(baseSelect.options).forEach(
            (option) => {
                if (option.value !== "") {
                    option.disabled =  option.value === targetCurrId;
                }
            }
        );

        Array.from(targetSelect.options).forEach(
            (option) => {
                if (option.value !== "") {
                    option.disabled = option.value === baseCurrId;
                }
            }
        );
    }

    baseSelect.addEventListener("change", updateOptions);
    targetSelect.addEventListener("change", updateOptions);

    updateOptions();

    const addCurrencyForm = document.querySelector<HTMLFormElement>("#add-currency-form");
    const addRateForm = document.querySelector<HTMLFormElement>("#add-rate-form")

    if (addCurrencyForm === null || addRateForm == null) {
        throw new Error("Cannot find add forms");
    }

    addCurrencyForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(addCurrencyForm);

        const code = String(formData.get("code") ?? "");
        const name = String(formData.get("name") ?? "");
        const sign = String(formData.get("sign") ?? "");

        try {
            await addCurrency(code, name, sign);
            
            addCurrencyForm.reset();
        } catch(error) {
            console.error("Failed to add currency:", error);    
        }

    })

    addRateForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(addRateForm);


        const baseCurrencyId = String(formData.get("baseCurrency") ?? "");
        const targetCurrencyId = String(formData.get("targetCurrency") ?? "");
        const rate = String(formData.get("rate") ?? "");

        const baseCurrency = currencies.find(item => String(item.id) == baseCurrencyId)!.code;
        const targetCurrency = currencies.find(item => String(item.id) === targetCurrencyId)!.code;

        try {
            await addRate(baseCurrency, targetCurrency, rate);

            addRateForm.reset();
        } catch (error) {
            console.error("Failed to add rate:", error);
        }
    })
    
}


export function setupConverterSelects(fromSelect: HTMLSelectElement, toSelect: HTMLSelectElement): void {
    let prevFromValue = fromSelect.value;
    let prevToValue = toSelect.value;

    const handleFromChange = (): void => {
        if (fromSelect.value !== "" && fromSelect.value === prevToValue) {
            fromSelect.value = prevToValue;
            toSelect.value = prevFromValue;
        }

        prevFromValue = fromSelect.value;
        prevToValue = toSelect.value;
    };

    const handeToChange = (): void => {
        if (toSelect.value !== "" && toSelect.value === prevFromValue) {
            toSelect.value = prevFromValue;
            fromSelect.value = prevToValue;
        }

        prevFromValue = fromSelect.value;
        prevToValue = toSelect.value;
    }

    fromSelect.addEventListener("change", handleFromChange);
    toSelect.addEventListener("change", handeToChange);


}
