export function setupRateSelects(): void {
    const baseSelect =
        document.querySelector<HTMLSelectElement>("#from-currency");
    const targetSelect =
        document.querySelector<HTMLSelectElement>("#to-currency");

    if (baseSelect === null || targetSelect === null) {
        throw new Error("Rate selects not found");
    }

    const updateOptions = (): void => {
        const baseCurrId = baseSelect.value;
        const targetCurrId = targetSelect.value;

        Array.from(baseSelect.options).forEach((option) => {
            if (option.value !== "") {
                option.disabled = option.value === targetCurrId;
            }
        });

        Array.from(targetSelect.options).forEach((option) => {
            if (option.value !== "") {
                option.disabled = option.value === baseCurrId;
            }
        });
    };

    baseSelect.addEventListener("change", updateOptions);
    targetSelect.addEventListener("change", updateOptions);

    updateOptions();
}

export function setupConverterSelects(
    fromSelect: HTMLSelectElement,
    toSelect: HTMLSelectElement
): void {
    let prevFromValue = fromSelect.value;
    let prevToValue = toSelect.value;

    const handleFromChange = (): void => {
        if (fromSelect.value !== "" && fromSelect.value === prevToValue) {
            toSelect.value = prevFromValue;
        }

        prevFromValue = fromSelect.value;
        prevToValue = toSelect.value;
    };

    const handleToChange = (): void => {
        if (toSelect.value !== "" && toSelect.value === prevFromValue) {
            fromSelect.value = prevToValue;
        }

        prevFromValue = fromSelect.value;
        prevToValue = toSelect.value;
    };

    fromSelect.addEventListener("change", handleFromChange);
    toSelect.addEventListener("change", handleToChange);
}