export const getElementWidth = (element) => {
    if (element) {
        let style = element.currentStyle || (typeof window !== "undefined"&& window.getComputedStyle(element)),
            width = element.offsetWidth,
            margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        return width + margin;
    }
}

