import type { NextApiRequest, NextApiResponse } from 'next'
import { fromEnv } from '@aws-sdk/credential-providers'
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'

/*
 * return question
 * -------------------
 * input:  prompt
 * return: img
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // parse request
  const { query, _method } = req

  const prompt = query.prompt

  // create image
  const img = 's3://hogehoge'

  // upload image to S3

  // register image dynamoDB
  /*
  const client = new DynamoDBClient({
    credentials: fromEnv(),
    region: 'ap-northeast-1',
  })
  const table_name = "create_image"

  const input = {
    "Item": {
      "user_id": {
        "S": "kuma"
      },
      "img": {
        "S": `${img}`
      }
    },
    "TableName": `${table_name}`
  }

  const command = new PutItemCommand(input);

  try {
    const _response = await client.send(command)
  } catch (error) {
    return res.status(400).json({ error: "Failed to register image data to dynamodb." })
  }
  */

  return res.status(200).json({ img: img })
}
