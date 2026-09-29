import type { Converted, Currency, Rate } from "../types.js";

export class ApiError extends Error {
    readonly status: number;
    readonly message: string;

    constructor(status: number, message: string) {
        super(`HTTP ${status}`);
        this.name = "ApiError";
        this.status = status;
        this.message = message;
    }
}

export async function getCurrencies(): Promise<Currency[]> {
    const response = await fetch("/currencies");

    if (!response.ok) {
        const body = await response.json()

        throw new ApiError(response.status, body.message);
    }

    return response.json();
}

export async function getRates(): Promise<Rate[]> {
    const response = await fetch("/exchangeRates");

    if (!response.ok) {
        const body = await response.json()

        throw new ApiError(response.status, body.message);
    }

    return response.json();
}

export async function patchRate(pair: string, rate: number): Promise<void> {
    const body = new URLSearchParams({
        rate: String(rate),
    });

    const response = await fetch(
        `/exchangeRate/${pair}`,
        {
            method: "PATCH",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
        }
    );

    if (!response.ok) {
        const body = await response.json();

        throw new ApiError(response.status, body.message);
    }

}

export async function addCurrency(
    code: string,
    name: string,
    sign: string
): Promise<Currency> {
    const body = new URLSearchParams({
        code,
        name,
        sign,
    });

    const response = await fetch(`/currencies`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    if (!response.ok) {
        const body = await response.json()

        throw new ApiError(response.status, body.message);
    }

    return response.json();
}

export async function addRate(
    baseCurrency: string,
    targetCurrency: string,
    rate: string
): Promise<Rate> {
    const body = new URLSearchParams({
        baseCurrency,
        targetCurrency,
        rate,
    });

    const response = await fetch(`/exchangeRates`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    if (!response.ok) {
        const body = await response.json()

        throw new ApiError(response.status, body.message);
    }

    return response.json();
}

export async function convert(
    baseCurrency: string,
    targetCurrency: string,
    amount: string
): Promise<Converted> {
    const params = new URLSearchParams({
        from: baseCurrency,
        to: targetCurrency,
        amount,
    });

    const response = await fetch(`/exchange?${params}`);

    if (!response.ok) {
        const body = await response.json()

        throw new ApiError(response.status, body.message);
    }

    return response.json();
}