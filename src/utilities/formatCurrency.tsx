

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, { currency: "USD", style: 'currency' })

const fomratCurrency = (number: number) => {
    return CURRENCY_FORMATTER.format(number)
}

export default fomratCurrency;