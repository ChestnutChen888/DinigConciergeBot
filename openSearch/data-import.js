const { Client } = require('@opensearch-project/opensearch');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand } = require('@aws-sdk/lib-dynamodb');
require('dotenv').config();

// 创建 DynamoDB 客户端
const dynamoClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const docClient = DynamoDBDocumentClient.from(dynamoClient);

// 创建 OpenSearch 客户端
const client = new Client({
    node: process.env.ELASTIC_DOMAIN_ENDPOINT,
    auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD
    },
    ssl: {
        rejectUnauthorized: false
    }
});

async function importDataFromDynamoDB() {
    const batchSize = 25;
    let lastEvaluatedKey = undefined;
    let totalProcessed = 0;

    try {
        // 创建索引和映射，包含所有必需字段
        await client.indices.create({
            index: 'restaurants',
            body: {
                mappings: {
                    properties: {
                        Business_ID: { type: 'keyword' },
                        name: { type: 'text' },
                        address: { type: 'text' },
                        coordinates: {
                            properties: {
                                latitude: { type: 'float' },
                                longitude: { type: 'float' }
                            }
                        },
                        review_count: { type: 'integer' },
                        rating: { type: 'float' },
                        zip_code: { type: 'keyword' },
                        cuisine: { type: 'keyword' },
                        insertedAtTimestamp: { type: 'date' }
                    }
                }
            }
        });

        do {
            const command = new ScanCommand({
                TableName: 'yelp-restaurants',
                Limit: batchSize,
                ExclusiveStartKey: lastEvaluatedKey
            });

            const response = await docClient.send(command);
            lastEvaluatedKey = response.LastEvaluatedKey;

            if (response.Items && response.Items.length > 0) {
                const body = response.Items.flatMap(item => [
                    { 
                        index: { 
                            _index: 'restaurants',
                            _id: item.business_id 
                        }
                    },
                    {
                        Business_ID: item.business_id,
                        name: item.name,
                        address: item.address,
                        coordinates: {
                            latitude: item.coordinates.latitude,
                            longitude: item.coordinates.longitude
                        },
                        review_count: item.review_count,
                        rating: item.rating,
                        zip_code: item.zip_code,
                        cuisine: item.cuisine,
                        insertedAtTimestamp: new Date().toISOString()
                    }
                ]);

                const { body: bulkResponse } = await client.bulk({ body });
                if (bulkResponse.errors) {
                    console.error('批量操作出现错误');
                    bulkResponse.items.forEach((item) => {
                        if (item.index && item.index.error) {
                            console.error('错误:', item.index.error);
                        }
                    });
                }
                totalProcessed += response.Items.length;
                console.log(`已处理 ${totalProcessed} 家餐厅`);
            }

        } while (lastEvaluatedKey);

        console.log('数据导入完成');
        console.log('总共处理的餐厅数量:', totalProcessed);

    } catch (error) {
        console.error('导入数据时出错:', error);
        throw error;
    }
}

importDataFromDynamoDB()
    .then(() => console.log('导入过程完成'))
    .catch(console.error);