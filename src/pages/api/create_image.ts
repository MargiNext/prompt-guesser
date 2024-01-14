import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import fs from 'node:fs'

// REF: https://platform.stability.ai/docs/api-reference#tag/v1generation/operation/textToImage
async function postStableDiffusionApi(engineId: string, apiHost: string, apiKey: string, prompt: string): Promise<any> {
  if (!apiKey) throw new Error('Missing Stability API key.')

  const response = await fetch(
    `${apiHost}/v1/generation/${engineId}/text-to-image`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: `${prompt}`,
          },
        ],
        cfg_scale: 7,
        height: 512,
        width: 512,
        steps: 30,
        samples: 1,
      }),
    }
    )

  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`)
    res.status(400).json({ error: "Failed to create image." })
  }

  interface GenerationResponse {
    artifacts: Array<{
      base64: string
      seed: number
      finishReason: string
    }>
  }

  const responseJSON = (await response.json()) as GenerationResponse
  
  // 1 つの画像しか返却されない前提
  return responseJSON.artifacts[0].base64
}

/*
 * return question
 * -------------------
 * input :  prompt
 * output:  img
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // parse request
  const { query, _method } = req
  const prompt = query.prompt

  // environmental for stable diffusion
  const engineId = 'stable-diffusion-v1-6'
  const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
  const apiKey = process.env.STABILITY_API_KEY

  let img
  await postStableDiffusionApi(engineId, apiHost, apiKey, prompt)
    .then(imageData => {
      img = imageData
  })

  return res.status(200).json({ img: img })
}
