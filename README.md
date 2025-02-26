# Dining Concierge Chatbot

## Project Overview

This is a serverless, microservice-driven web application for a Dining Concierge chatbot. The application provides personalized restaurant suggestions based on user preferences through a conversational interface.

## Live Demo

🌐 Frontend URL: [http://ai-dining-concierge-chatbot-frontend.s3-website-us-east-1.amazonaws.com](http://ai-dining-concierge-chatbot-frontend.s3-website-us-east-1.amazonaws.com)

### Locations for codes:
 - The logic for importing data into dynamoDb is located in dynamoDb data-collection -> yelpdb.ipynb in our repository
 - The logic for sending data from dynamoDb to open search is located at openSearch -> data-import.js
 - Our lambda functions are present in the folder Lambdas
 - Our API documentation is present in the API folder
 - Our frontend application and the s3 bucket is present in the s3 folder
 

### Key Components

- Frontend: Hosted on AWS S3
- API Gateway: Handles API requests
- Amazon Lex: Conversational AI
- AWS Lambda: Backend processing
- DynamoDB: Restaurant data storage
- ElasticSearch: Restaurant indexing
- SQS: Request queuing
- SES: Email notifications

## Features

- Conversational restaurant recommendations
- Cuisine-based restaurant suggestions
- Email notifications with restaurant details
- Serverless architecture

## Technologies Used

- AWS Services:
  - S3
  - API Gateway
  - Lambda
  - Lex
  - DynamoDB
  - ElasticSearch
  - SQS
  - SES
- Frontend: [Specify frontend technologies]
- Data Collection: Yelp API, Jupyter Notebook

## Project Setup

### Prerequisites

- AWS Account
- Python 3.8+
- Yelp Developer Account
- Required AWS IAM Permissions


## Data Collection

The project uses Yelp API to collect restaurant data:

- Collects 1,500 restaurants from Manhattan
- Stores data in DynamoDB
- Indexes restaurants in ElasticSearch



## Configuration

Rename `.env.template` to `.env` and fill in your credentials:

```
YELP_API_KEY=your_yelp_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```



## Contact

- ChestnutChen888
- MutteTejeshu
- Project Link: [https://github.com/ChestnutChen888/DinigConciergeBot](https://github.com/ChestnutChen888/DinigConciergeBot)


