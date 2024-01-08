import type { NextApiRequest, NextApiResponse } from 'next'

// return question(id, prompt, img)
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req
  // parse request
  const id = parseInt(query.id as string, 10)

  res.status(200).json({ id: id, prompt: 'hogehoge', img: 'public/image.png'})
}
