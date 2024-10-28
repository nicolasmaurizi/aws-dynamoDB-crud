// src/config/aws.config.ts
import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1', 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const dynamoDB = new AWS.DynamoDB.DocumentClient();
export const USERS_TABLE = process.env.DYNAMODB_USERS_TABLE;
