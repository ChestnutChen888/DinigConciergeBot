const { Client } = require('@opensearch-project/opensearch');
require('dotenv').config();

console.log('Environment variables:');
console.log('ENDPOINT:', process.env.ELASTIC_DOMAIN_ENDPOINT);
console.log('USERNAME:', process.env.ELASTIC_USERNAME);
console.log('PASSWORD:', process.env.ELASTIC_PASSWORD ? '***' : 'not set');

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

async function setupOpenSearch() {
    try {
        // 测试连接
        const response = await client.cluster.health();
        console.log('Successfully connected to OpenSearch');
        console.log('Cluster health:', response.body);

        // 检查索引是否存在
        const indexExists = await client.indices.exists({
            index: 'restaurants'
        });

        if (!indexExists.body) {
            // 创建索引和映射
            const createResponse = await client.indices.create({
                index: 'restaurants',
                body: {
                    mappings: {
                        properties: {
                            restaurantID: { type: 'keyword' },
                            cuisine: { type: 'keyword' },
                            insertedAtTimestamp: { type: 'date' }
                        }
                    },
                    settings: {
                        index: {
                            number_of_shards: 1,
                            number_of_replicas: 1
                        }
                    }
                }
            });
            console.log('Index created successfully:', createResponse.body);
        } else {
            console.log('Index already exists');
        }

    } catch (error) {
        console.error('Error:', error);
        if (error.meta && error.meta.body) {
            console.error('Error details:', error.meta.body);
        }
    }
}

setupOpenSearch();