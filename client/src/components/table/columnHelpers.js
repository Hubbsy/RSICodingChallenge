/////////  Column Helper Functions

const floatToDollarsConverter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
})

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
    ].join('/');
}

export {floatToDollarsConverter, formatDate}