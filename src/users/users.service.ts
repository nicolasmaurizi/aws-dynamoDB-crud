// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { dynamoDB, USERS_TABLE  } from '../config/aws.config';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly tableName = process.env.DYNAMODB_USERS_TABLE;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userId: User = {
      ...createUserDto,
    };

    await dynamoDB
      .put({
        TableName: this.tableName,
        Item: userId,
      })
      .promise();

    return userId;
  }

  async findAll(): Promise<User[]> {
    const result = await dynamoDB
      .scan({
        TableName: this.tableName,

      })
      .promise();

    return result.Items as User[];
  }

  async findOne(userId: string): Promise<User> {
    const result = await dynamoDB
      .get({
        TableName: this.tableName,
        Key: { userId },
      })
      .promise();

    return result.Item as User;
  }

  async update(userId: string, updateUserDto: CreateUserDto): Promise<User> {
    await dynamoDB
      .update({
        TableName: this.tableName,
        Key: { userId },
        UpdateExpression: 'set #name = :name, #email = :email',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#email': 'email',
        },
        ExpressionAttributeValues: {
          ':name': updateUserDto.name,
          ':email': updateUserDto.email,
        },
      })
      .promise();

    return { userId, ...updateUserDto };
  }

  async remove(userId: string): Promise<void> {
    await dynamoDB
      .delete({
        TableName: this.tableName,
        Key: { userId },
      })
      .promise();
  }
}
