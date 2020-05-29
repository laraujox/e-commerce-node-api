# Rest API - ecommerce
Rest ecommerce API using plain node.js.

## About the project
This project is entirely made for studies propuses. The main goal here is not write a newer and clean javascript, but to feel what's like to develop in node.js in it's bare bones.
DO NOT USE IN PRODUCTION.

## How To Run
Download Node.js from the [official  site](https://nodejs.org/en/download/) or from [here](https://github.com/creationix/nvm) (like I did), and run the following at the terminal:

```
npm start
```

### Endpoints
 - **/probe/** :
    - Methods: **GET**
    - Description: Return a 200 status code showing that the API still alive.
    - Query Strings: none

 - **/product/** :
    - Method: **POST**
      - Description: Create a new product.
      - Body: name, sku, price, description, active

    - Method: **GET**
      - Description: Return a list of all products.
      - Query String: none

    - Method: **UPDATE**
      - Description: Update the product's fields.
      - Query String: sku
      - Body: name, sku, price, description, active

    - Method: **DELETE**
      - Description: Delete a given product.
      - Query String: sku