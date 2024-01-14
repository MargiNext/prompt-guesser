import type { NextApiRequest, NextApiResponse } from 'next'
import { fromEnv } from '@aws-sdk/credential-providers'
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

/*
  * return question
  * -------------------
  * input   : id
  * output  : prompt
  *         : img
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // parse request
  const { query, _method } = req

  // sanitizing
  let questionId
  if(isNaN(parseInt(query.id as string, 10))) {
    return res.status(400).json({ error: "ID is invalid." })
  } else {
    questionId = parseInt(query.id as string, 10)
  }

  const client = new DynamoDBClient({
    credentials: fromEnv(),
    region: 'ap-northeast-1',
  })
  const tableName = "questions"

  const input = {
    "Key": {
      "id": {
        "N": `${questionId}`
      }
    },
    "TableName": `${tableName}`
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

  return res.status(200).json({ id: questionId, prompt: item.prompt, img: item.img})
}
