import type { Currency, Rate } from "../types.js"

export const currencies: Currency[] = [
    {id: 1, code: 'USD', name: 'US Dollar', sign: '$'}, 
    {id: 2, code: 'RUB', name: 'Russian Ruble', sign: '₽'},
    {id: 3, code: 'EUR', name: 'Euro', sign: '€'},
    {id: 4, code: 'JPY', name: 'Japanese Yen', sign: '¥'},
    {id: 5, code: 'CNY', name: 'Chinese Yuan', sign: '¥'}
]

export const rates: Rate[] = [
    {id: 1, baseCurrency: {id: 1, code: 'USD', name: 'US Dollar', sign: '$'}, targetCurrency: {id: 2, code: 'RUB', name: 'Russian Ruble', sign: '₽'}, rate: 78.1},
    {id: 2, baseCurrency: {id: 3, code: 'EUR', name: 'Euro', sign: '€'}, targetCurrency: {id: 1, code: 'USD', name: 'US Dollar', sign: '$'}, rate: 1.22},
    {id: 3, baseCurrency: {id: 4, code: 'JPY', name: 'Japanese Yen', sign: '¥'}, targetCurrency: {id: 1, code: 'USD', name: 'US Dollar', sign: '$'}, rate: 0.0073}
]