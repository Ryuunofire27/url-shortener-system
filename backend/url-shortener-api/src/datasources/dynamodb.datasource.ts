import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { ConfigService } from "@nestjs/config";

export default {
  provide: DynamoDBDocument,
  useFactory: (configService: ConfigService) => {
    const dynamo = new DynamoDB({
      endpoint: {
        hostname: configService.get('database.dynamo.HOST'),
        port: configService.get('database.dynamo.PORT'),
        protocol: 'http:',
        path: ''
      },
      region: configService.get('database.dynamo.REGION'),
      credentials: {
        accessKeyId: configService.get('database.dynamo.ACCESS_KEY_ID'),
        secretAccessKey: configService.get('database.dynamo.SECRET_ACCESS_KEY')
      }
    });
    return DynamoDBDocument.from(dynamo);
  },
  inject: [ConfigService]
}