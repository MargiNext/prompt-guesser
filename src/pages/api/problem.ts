import type { NextApiRequest, NextApiResponse } from 'next'

// return problem(prompt, img)
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // parse request
  const { query, method } = req
  const id = parseInt(query.id as string, 10)

  res.status(200).json({ id: id, prompt: 'hogehoge', img: 'public/image.png'})
}
