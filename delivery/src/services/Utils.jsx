class Utils {
    toLocale(value) {
        return parseFloat(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }
}

export default Utils;