import { showAdd } from "./tabs/add.js";
import { showConverter } from "./tabs/converter.js";
import { showCurrencies } from "./tabs/currencies.js";
import { showRates } from "./tabs/rates.js";
import type { TabName } from "./types.js";

type TabName = "currencies" | "rates" | "add" | "convert";

const tabs = document.querySelectorAll<HTMLButtonElement>(".tab");
const content = document.querySelector<HTMLElement>("#content");

function showTab(tabName: TabName): void {
    switch (tabName) {
        case "currencies":
            showCurrencies(content);
            break;
        
        case "rates":
            showRates(content);
            break;
        
        case "add":
            showAdd(content);
            break;
        
        case "convert":
            showConverter(content);
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

showTab("currencies");
