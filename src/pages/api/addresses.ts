import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const addresses = ['Sample 1', 'Sample 2'];
  const { searchValue } = req.query;

  if (searchValue === undefined) {
    return res.status(200).json([]);
  }

  res
    .status(200)
    .json(
      addresses.filter((address) =>
        address.toLowerCase().includes(searchValue as string),
      ),
    );
};

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
