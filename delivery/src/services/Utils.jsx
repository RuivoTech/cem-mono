class Utils {
    toLocale(value) {
        return parseFloat(value / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
}

export default Utils;