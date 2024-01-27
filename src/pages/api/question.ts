import type { NextApiRequest, NextApiResponse } from 'next'
import { fromEnv } from '@aws-sdk/credential-providers'
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

async function getQuestionInfo(questionId: Number): Promise<any> {
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

  const command = new GetItemCommand(input)

  const response = await client.send(command)
  if (response.Item == undefined) throw new Error('The response item is empty.')
  const item = unmarshall(response.Item)

  return item
}

async function getImage(key: string): Promise<any> {
  const client = new S3Client({
    credentials: fromEnv(),
    region: 'ap-northeast-1',
  })

  const input = {
    "Bucket": "prompt-guesser",
    "Key": `${key}`
  }

  const command = new GetObjectCommand(input)

  const response = await client.send(command)
  if (response.Body == undefined) throw new Error('The response body is empty.')
  const imageData = await response.Body.transformToString("base64")

  return imageData
}

/*
  * return question
  * -------------------
  * input   : id
  * output  : prompt
  *         : img
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // parse request
  const id: string = req.query.id as string

  // sanitizing
  let questionId: Number
  if(isNaN(parseInt(id as string, 10))) {
    return res.status(400).json({ error: "ID is invalid." })
  } else {
    questionId = parseInt(id as string, 10)
  }

  let prompt, img
  const getQuestion = async() => {
    let item
    try {
      item = await getQuestionInfo(questionId)
    } catch (error) {
      res.status(400).json({ error: "Failed to get question item from dynamodb." })
    }
    prompt = item.prompt
    const imgKey = item.img
    try {
      img = await getImage(imgKey)
    } catch (error) {
      res.status(400).json({ error: "Failed to get image from s3." })
    }
  }

  await getQuestion()

  return res.status(200).json({ id: questionId, prompt: prompt, img: img})
}
