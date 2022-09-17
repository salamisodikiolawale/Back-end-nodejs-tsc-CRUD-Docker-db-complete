# MEAN STACK PROGRAM
## CRUD Application

### Backend -> Node JS, Express JS, Typescript, MongoDb
### Frontend -> Angular

### Backend Setup
* package.json -> npm init --yes
* tsconfig.json -> tsc --init

### packages need :
* cors
* express
* mongoose
* dotenv
* express-validator
* @types/cors
* @types/express
* @types/mongoose
* @types/dotenv
* @types/express-validator
* @types/node

> Intallation : npm install cors express dotenv express-validator @types/cors @types/express @types/mongoose @types/dotenv @types/express-validator  
@types/node
### REST API CONFIGURATION
* CRUD operations
  1. Create a Product
URL : http://127.0.0.1:3000/v1/products Method : POST Fields: name, image, price, qty, info Acess: Public
  2. Update a product
  3. Get All products
  4. Get a single product
  5. Delete a product

### MongoDb Configuration
> Database : node_tsc_db
> Tables: Products
> Fields: _id, name, image, price, qty, info, created_at, updated_at