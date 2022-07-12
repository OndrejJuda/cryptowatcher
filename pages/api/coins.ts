import type { NextApiRequest, NextApiResponse } from 'next';

const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY!,
    'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
    'Content-Type': 'application/json'
  }
}

const URL = 'https://coingecko.p.rapidapi.com/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = JSON.parse(req.body);

  console.log(`${URL}coins/markets?vs_currency=usd&page=${page}&per_page=50&order=market_cap_desc`)

  const response = await fetch(
    `${URL}coins/markets?vs_currency=usd&page=${page}&per_page=50&order=market_cap_desc`,
    OPTIONS
  );

  const data = await response.json();
  res.status(200).json(data);
};

export default handler;