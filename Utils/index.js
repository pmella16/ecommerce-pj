export const numberWithThousands = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
export const priceRangeMultiple = () => {
  let price = 1;
  while (!(price % 10 == 0)) {
    price = Math.floor(Math.random() * (100000 - 1000 + 1) + 1000);
  }
  return price;
}