export function SquareFillCalc(squareFill: number): string {
    const p = squareFill;
    let x1, y1, x2, y2, x3, y3, x4, y4, x5, y5;

    if (p <= 50) {
        x1 = 0;
        y1 = 100 - 2 * p;
        x2 = 0;
        y2 = 100;
        x3 = 2 * p;
        y3 = 100;

        return `polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%`;
    } else  {
        x1 = 100;
        y1 = -2 * p + 200
        x2 = 2 * p - 100
        y2 = 0;
        x3 = 0;
        y3 = 0;
        x4 = 0;
        y4 = 100;
        x5 = 100;
        y5 = 100;

        return `polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%, ${x4}% ${y4}%, ${x5}% ${y5}%)`;
    }
}

export function widthToRem(): string {
    if (typeof window === 'undefined') {
        return '0.00';
    }

    const container = document.getElementById('progress-bar-container');
    if (container) {
        const widthPx = container.clientWidth;
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const remValue = widthPx / rootFontSize;
        return remValue.toFixed(2);
    }
    return "0.00";
}