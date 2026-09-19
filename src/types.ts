export interface Currency {
    id: number;
    code: string;
    name: string;
    sign: string;
}

export interface Rate {
    id: number;
    baseCurrency: Currency;
    targetCurrency: Currency;
    rate: number;
}

export type TabName = "currencies" | "rates" | "add" | "convert";
