import type { Currency, Rate } from "../types.js";

export async function getCurrencies(): Promise<Currency[]> {
    const response = await fetch("http://localhost:5212/currencies");

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

export async function getRates(): Promise<Rate[]> {
    const response = await fetch("http://localhost:5212/exchange-rates");

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);       
    }

    return response.json();
}

export async function patchRate(pair: string, rate: number): Promise<Rate> {
    const body = new URLSearchParams({
        rate: String(rate),
    });

    const response = await fetch(`http://localhost:5212/exchange-rates/${pair}`, 
        {
            method: "PATCH", 
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body,
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}


export async function addCurrency(code: string, name: string, sign: string): Promise<Currency> {
    const body = new URLSearchParams({
        code,
        name,
        sign,
    });

    const response = await fetch(`http://localhost:5212/currencies`,
        {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body,
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

export async function addRate(baseCurrency: string, targetCurrency: string, rate: string): Promise<Rate> {
    const body = new URLSearchParams({
        baseCurrency,
        targetCurrency,
        rate,
    });

    const response = await fetch(`http://localhost:5212/exchange-rates`, 
        {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body,
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}