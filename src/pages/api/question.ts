import type { NextApiRequest, NextApiResponse } from 'next'
import { fromEnv } from '@aws-sdk/credential-providers'
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

async function getQuestionInfo(questionId: int): Promise<any> {
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

  let item
  try {
    const response = await client.send(command)
    item = unmarshall(response.Item)
  } catch (error) {
    res.status(400).json({ error: "Failed to get question item from dynamodb." })
  }

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

  let imageData
  try {
    const response = await client.send(command)
    imageData = await response.Body.transformToString("base64")
  } catch (error) {
    res.status(400).json({ error: "Failed to get image from s3." })
  }

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
  const { query, _method } = req

  // sanitizing
  let questionId
  if(isNaN(parseInt(query.id as string, 10))) {
    return res.status(400).json({ error: "ID is invalid." })
  } else {
    questionId = parseInt(query.id as string, 10)
  }

  let prompt, img
  const getQuestion = async() => {
    const item = await getQuestionInfo(questionId)
    prompt = item.prompt
    const imgKey = item.img
    img = await getImage(imgKey)
  }

  await getQuestion()

  return res.status(200).json({ id: questionId, prompt: prompt, img: img})
}
