function getNumberFromUnitValues(v) {
    const font = v.toString();

    switch (font) {
        case font.includes('px'): return font.slice(0, font.indexOf('p'));
        case font.includes('%'): return font.slice(0, font.indexOf('%'));
        case font.includes('rem'): return font.slice(0, font.indexOf('r'));
        default: return font
    }
}

module.exports = getNumberFromUnitValues;