# URL Shortener System

## Description

The URL Shortener System is designed to create short URLs that redirect to long URLs. This system implements a distributed architecture to handle high throughput and ensure high availability while maintaining data consistency.

## Layers

### Client Layer

The user interface layer interacts with the client and consumes the APIs to create short URLs.

### API Layer

This layer contains the business logic to create short URLs. It handles the generation, storage, and retrieval of short URLs.

### Redirect Server

The layer where the final user interacts to navigate to the long URL using the short URL.

### DB and Cache

The system uses two different databases and a cache to complete the CAP operations:
- **PostgreSQL**: Ensures the consistency of the shortener URL key.
- **DynamoDB**: Provides high availability and partition tolerance.
- **Redis**: Used for caching to improve performance.

## Setup

### Prerequisites

- Node.js
- pnpm
- Docker

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Ryuunofire27/url-shortener.git
    cd url-shortener
    ```

2. Install dependencies:

   2.1 API dependencies:

   ```sh
   cd backend/url-shortener-api
   pnpm install
   ```

   2.2 Redirect Server dependencies:

   ```sh
   cd backend/url-shortener-server
   pnpm install
   ```

   2.3 Client dependencies:

   ```sh
   cd frontend/url-shortener-web
   pnpm install
   ```

4. Set up the databases:
    - **PostgreSQL**: Follow the instructions to set up a PostgreSQL database.
    - **DynamoDB**: Use the following command to create the table:
        ```sh
        dynamodb create-table --cli-input-json file://docker/resources/create-table.json --region local --endpoint-url http://localhost:8000
        ```
    - **Redis**: Ensure Redis is running on your system or use Docker to start a Redis container.

### Environment Variables

The `.env.dev` file contains the current configuration for Docker and other services. If you want to change any configuration, ensure that all environment variables in the different services are consistent.

Before run the application change the name of `.env.dev` to `.env`

Ensure the DynamoDB region and endpoint URL are the same as those used in the create table command.

### Running the Application

1. Start the PostgreSQL, DynamoDB, and Redis services using Docker:
    ```sh
    docker-compose up
    ```

2. Start the API server:
    ```sh
    pnpm run start:dev
    ```

3. Start the Redirect Server:
    ```sh
    pnpm run start:dev
    ```

4. Start the client application:
    ```sh
    pnpm run dev
    ```

## Usage

1. Open the client application in your browser.
2. Enter a long URL and click the "Shorten" button.
3. The application will generate a short URL.
4. Use the short URL to navigate to the original long URL.

## ToDo

- Add Auto scaling to the components
- Add LoadBalancer to the components
- Add RedisCluster



## Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

## License
This project is licensed under the MIT License.
