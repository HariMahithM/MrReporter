let months = ["Jan","Feb0","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
let days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

export const getday = (timestamp) => {
    let date = new Date(timestamp);
    return `${date.getDate()} ${months[date.getMonth()]}`
}