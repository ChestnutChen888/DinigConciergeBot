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

async function verifyData() {
    try {
        // 1. 检查索引是否存在
        const indexExists = await client.indices.exists({
            index: 'restaurants'
        });
        console.log('索引是否存在:', indexExists.body);

        // 2. 获取文档总数
        const count = await client.count({
            index: 'restaurants'
        });
        console.log('文档总数:', count.body.count);

        // 3. 查看一些示例数据
        const response = await client.search({
            index: 'restaurants',
            body: {
                size: 5,  // 只获取5条记录
                query: {
                    match_all: {}
                }
            }
        });

        console.log('\n示例数据:');
        response.body.hits.hits.forEach((hit, index) => {
            console.log(`\n文档 ${index + 1}:`);
            console.log(JSON.stringify(hit._source, null, 2));
        });

    } catch (error) {
        console.error('验证数据时出错:', error);
    }
}

verifyData();