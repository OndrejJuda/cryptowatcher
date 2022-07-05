const URL = 'https://coingecko.p.rapidapi.com/'

const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY!,
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
}

export const fetchCoins = async () => {
  const response = await fetch(
    `${URL}coins/markets?vs_currency=usd&page=1&per_page=50&order=market_cap_desc`,
    OPTIONS
  )

  const data = await response.json();

  return data.map((coin: any) => {
    return {
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      currentPrice: coin.current_price,
      marketCap: coin.market_cap,
      priceChangePercentage24: coin.price_change_percentage_24h,
      downFromATH: coin.ath_change_percentage,
      upToATH: (coin.ath - coin.current_price) / coin.current_price * 100,
    }
  });
} 