import type { NextApiRequest, NextApiResponse } from 'next';

const URL = 'https://cryptopanic.com/';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = JSON.parse(req.body);

  const response = await fetch(
    `${URL}api/v1/posts/?auth_token=${process.env.NEXT_PUBLIC_CRYPTOPANIC_API_KEY}&public=true&page=${page}&metadata=true`,
    {}
  );

  const { results } = await response.json();
  res.status(200).json(results);
};

export default handler;