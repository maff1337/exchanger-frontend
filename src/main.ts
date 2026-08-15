type TabName = "currencies" | "rates" | "add" | "convert";

interface Currency {
    id: number;
    code: string;
    name: string;
    sign: string;
}

interface Rate {
    id: number;
    baseCurrency: Currency;
    targetCurrency: Currency;
    rate: number;
}

interface Converted {
    from: Currency;
    to: Currency;
    rate: number;
    amount: number;
    converted: number;
}

const testCurrData: Currency[] = [
    {id: 1, code: 'USD', name: 'US Dollar', sign: '$'}, 
    {id: 2, code: 'RUB', name: 'Russian Ruble', sign: '₽'},
    {id: 3, code: 'EUR', name: 'Euro', sign: '€'},
    {id: 4, code: 'JPY', name: 'Japanese Yen', sign: '¥'},
    {id: 5, code: 'CNY', name: 'Chinese Yuan', sign: '¥'}
]

const testRateData: Rate[] = [
    {id: 1, baseCurrency: {id: 1, code: 'USD', name: 'US Dollar', sign: '$'}, targetCurrency: {id: 2, code: 'RUB', name: 'Russian Ruble', sign: '₽'}, rate: 78.1},
    {id: 2, baseCurrency: {id: 3, code: 'EUR', name: 'Euro', sign: '€'}, targetCurrency: {id: 1, code: 'USD', name: 'US Dollar', sign: '$'}, rate: 1.22},
    {id: 3, baseCurrency: {id: 4, code: 'JPY', name: 'Japanese Yen', sign: '¥'}, targetCurrency: {id: 1, code: 'USD', name: 'US Dollar', sign: '$'}, rate: 0.0073}
]

const currencies: Currency[] = testCurrData;
const rates: Rate[] = testRateData;

const tabs = document.querySelectorAll<HTMLButtonElement>(".tab");
const content = document.querySelector<HTMLElement>("#content");


function showCurrencies(): void {
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

function showRates(): void {
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

function createCurrencyOptions(): string {
    return currencies.map(
        (currency) => `
        <option value="${currency.id}">
            ${currency.code}
        </option>
        `
    ).join("");
}


function setupRateSelects(): void {
    const baseSelect = document.querySelector<HTMLSelectElement>("#from-currency")
    const targetSelect = document.querySelector<HTMLSelectElement>("#to-currency")

    if (baseSelect === null || targetSelect === null) {
        throw new Error("Rate selects not found");
    }

    const updateOptions = (): void => {
        const baseCurrId = baseSelect.value;
        const targetCurrId = targetSelect.value;

        Array.from(baseSelect.options).forEach(
            (option) => {
                if (option.value !== "") {
                    option.disabled =  option.value === targetCurrId
                }
            }
        );

        Array.from(targetSelect.options).forEach(
            (option) => {
                if (option.value !== "") {
                    option.disabled = option.value === baseCurrId
                }
            }
        );
    };

    baseSelect.addEventListener("change", updateOptions);
    targetSelect.addEventListener("change", updateOptions);

    updateOptions();
}

function showAdd(): void {
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
                From currency
                <select id="from-currency" name="baseCurrency" requied>
                    <option value="" selected disabled>
                        Select
                    </option>

                    ${createCurrencyOptions()}
                </select>
            </label>

            <label>
                To currency
                <select id="to-currency" name="targetCurrency" requied>
                    <option value="" selected disabled>
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

    setupRateSelects()
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
}

function showConvert(): void {
    if (content === null) {
        throw new Error("Content element not found");
    }

    content.innerHTML = `
    <h1>Convert</h1>

        <form id="convert-form">
            <label>
                From
                <select id="convert-from" name="from" required>
                    ${createCurrencyOptions()}
                </select>
            </label>

            <label>
                To
                <select id="convert-to" name="to" required>
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

}

function showTab(tabName: TabName): void {
    switch (tabName) {
        case "currencies":
            showCurrencies();
            break;
        
        case "rates":
            showRates();
            break;
        
        case "add":
            showAdd();
            break;
        
        case "convert":
            showConvert();
            break;
    }
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const tabName = tab.dataset.tab;

        if (!isTabName(tabName)) {
            return;
        }

        tabs.forEach((item) => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        showTab(tabName);
    });
});

function isTabName(value: string | undefined): value is TabName {
    return (
        value === "currencies" ||
        value === "rates" ||
        value === "add" ||
        value === "convert"
    );
}