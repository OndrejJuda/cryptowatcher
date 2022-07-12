import { IncomingMessage, ServerResponse } from 'http';
import Cors from 'cors';

export const COIN_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
}

const cors = Cors

export const composeCoinUrl = (page: number) => `https://coingecko.p.rapidapi.com/coins/markets?vs_currency=usd&page=${page}&per_page=50&order=market_cap_desc`;

const fetchCoins = async (req: IncomingMessage, res: ServerResponse) => {

};

export default fetchCoins;