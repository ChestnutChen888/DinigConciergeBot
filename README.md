# Dining Concierge Chatbot

## Project Overview

This is a serverless, microservice-driven web application for a Dining Concierge chatbot. The application provides personalized restaurant suggestions based on user preferences through a conversational interface.

## Live Demo

🌐 Frontend URL: [http://ai-dining-concierge-chatbot-frontend.s3-website-us-east-1.amazonaws.com/](http://ai-dining-concierge-chatbot-frontend.s3-website-us-east-1.amazonaws.com/)

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

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/your-username/DinigConciergeBot.git
cd DinigConciergeBot
```

2. Set up AWS credentials

```bash
# Configure AWS CLI
aws configure
```

3. Install dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt
```

## Data Collection

The project uses Yelp API to collect restaurant data:

- Collects 5,000+ restaurants from Manhattan
- Stores data in DynamoDB
- Indexes restaurants in ElasticSearch

## Deployment

1. Deploy Frontend to S3
2. Set up API Gateway
3. Configure Lambda Functions
4. Create Lex Chatbot
5. Set up SQS and SES

## Configuration

Rename `.env.template` to `.env` and fill in your credentials:

```
YELP_API_KEY=your_yelp_api_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## Contact

- ChestnutChen888
- MutteTejeshu
- Project Link: [https://github.com/ChestnutChen888/DinigConciergeBot](https://github.com/ChestnutChen888/DinigConciergeBot)

## Acknowledgements

- AWS
- Yelp API
- Cloud Computing and Big Data Course, Spring 2025
