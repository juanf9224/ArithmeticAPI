# LoanPro API

LoanPro is an arithmetic calculator api to perform simple mathematical operations as well as generate random strings

# Documentation

- To access the api documentation you can check the `v1/api-docs` route where you will see all of our available endpoints with their corresponding documentation using the swagger-js-doc library,

    example:

    `http://localhost:3001/v1/api-docs`


# How to install

1. (Optional) Use nvm to [install](https://github.com/nvm-sh/nvm#usage) and use the Node version on the API project
    
    ```bash
    nvm install x.x.x
    nvm use x.x.x
    ```
    
2. Copy .env.example to .env
    
    ```bash
    cp .env.example .env
    ```
    
3. Install packages
    
    ```bash
    yarn install
    ```
    
4. Database migrations and seeds
    
    ```bash
    yarn db:setup
    ```

5. start the project
    
    ```bash
    yarn start
    ```