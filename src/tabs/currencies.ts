import { getCurrencies } from "../utils/api-requests.js";


export async function showCurrencies(content: HTMLElement | null): Promise<void> {
    if (content === null) {
        throw new Error("Content element not found");
    }

    const currencies = await getCurrencies();
    

    content.innerHTML = `
    <div class="currency-table">
        <table>
            <thead>
                <th>Code</th>
                <th>Name</th>
                <th>Sign</th>
            </thead>
            <tbody>
                ${currencies.map(
                    (currency) => `
                    <tr>
                        <td>${currency.code}</td>
                        <td>${currency.name}</td>
                        <td>${currency.sign}</td>
                    </tr>
                    `
                ).join("")
                }
            </tbody>
        </table>
    </div>
    `;
    
}
