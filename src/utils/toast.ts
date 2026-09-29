type ToastType = "error" | "success" | "info";

let container: HTMLElement | null = null;

function getContainer(): HTMLElement {
    if (container !== null) {
        return container;
    }

    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);

    return container;
}

export function showToast(
    message: string,
    type: ToastType = "info",
    duration = 4000
): void {
    const root = getContainer();

    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;

    const icon = document.createElement("span");
    icon.className = "toast-icon";
    icon.textContent = type === "error" ? "!" : type === "success" ? "✓" : "i";

    const message_ = document.createElement("span");
    message_.className = "toast-message";
    message_.textContent = message;

    const close = document.createElement("button");
    close.type = "button";
    close.className = "toast-close";
    close.textContent = "×";
    close.setAttribute("aria-label", "Close");
    close.addEventListener("click", () => dismiss(toast));

    toast.append(icon, message_, close);
    root.appendChild(toast);

    window.setTimeout(() => dismiss(toast), duration);
}

function dismiss(toast: HTMLElement): void {
    if (toast.classList.contains("toast--leaving")) {
        return;
    }

    toast.classList.add("toast--leaving");
    toast.addEventListener("animationend", () => toast.remove(), {
        once: true,
    });
}