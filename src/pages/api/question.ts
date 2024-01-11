import type { NextApiRequest, NextApiResponse } from 'next'
import { fromEnv } from '@aws-sdk/credential-providers'
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

// return question(id, prompt, img)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // parse request
  const { query, _method } = req

  // sanitizing
  let question_id
  if(isNaN(parseInt(query.id as string, 10))) {
    return res.status(400).json({ error: "ID is invalid." })
  } else {
    question_id = parseInt(query.id as string, 10)
  }

  const client = new DynamoDBClient({
    credentials: fromEnv(),
    region: 'ap-northeast-1',
  })
  const table_name = "questions"

  const input = {
    "Key": {
      "id": {
        "N": `${question_id}`
      }
    },
    "TableName": `${table_name}`
  }

  const command = new GetItemCommand(input);

  let item
  // get question data
  try {
    const data = await client.send(command)
    item = unmarshall(data.Item)
  } catch (error) {
    return res.status(400).json({ error: "Failed to get question data from dynamodb." })
  }

  return res.status(200).json({ id: question_id, prompt: item.prompt, img: item.img})
}
