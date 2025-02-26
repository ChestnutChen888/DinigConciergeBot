const { Client } = require('@opensearch-project/opensearch');
require('dotenv').config();

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

async function deleteIndex() {
    try {
        const response = await client.indices.delete({
            index: 'restaurants'
        });
        console.log('索引删除成功:', response.body);
    } catch (error) {
        console.error('删除索引时出错:', error);
    }
}

deleteIndex();