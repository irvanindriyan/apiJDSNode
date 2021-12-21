# instalasi

Create Database Mysql
```sql
CREATE DATABASE `db_jabar_node`
```

Configurasi database config in `.env`
```sh
TIME_ZONE=Asia/Jakarta
APP_PORT=3000
ENV=development
DB_USER=root
DB_PASS=
DB_NAME=db_jabar_node
DB_HOST=127.0.0.1
JWT_KEY=jabarmaju
```

Install package
```sh
$ npm install --save npx express sequelize sequelize-cli mysql2 password-hash jsonwebtoken express-validator cors helmet dotenv nodemon node-fetch@2.0
```

Run Migration
```sh
$ npx sequelize-cli db:migrate
```

# Rest API

endpoint Sign Up
```sh
method: POST
url: https://apijdsnode.herokuapp.com/api/auth/sign_up
param:
{
    "nik": "{nik}",
    "password": "{password}"
    "role": "{admin, user}",
}
result:
{
    "status": 200,
    "data": {
        "msg": "Registrasi sucessfully !",
        "token": "{jwt token}"
    }
}
```

endpoint Sign In
```sh
method: POST
url: https://apijdsnode.herokuapp.com/api/auth/sign_in
param:
{
    "nik": "{nik}",
    "password": "{password}"
}
result:
{
    "status": 200,
    "data": {
        "msg": "Login sucessfully !",
        "token": "jwt token"
    }
}
```

endpoint User
```sh
method: GET 
url: https://apijdsnode.herokuapp.com/api/auth/user
header: 
{
    Authorization: Bearer {Token}
}
result:
{
    "status": 200,
    "data": {
        "nik": "{nik}",
        "role": "{role}",
        "jwt": "{jwt token}"
    }
}
```

endpoint Sign Out
```sh
method: GET
url: https://apijdsnode.herokuapp.com/api/auth/sign_out
header: 
{
    Authorization: Bearer {Token}
}
result:
{
    "status": 200,
    "message": "Logout sucessfully"
} 
```

# Fetch Data

endpoint Data
```sh
method: GET
url: https://apijdsnode.herokuapp.com/api/fetch/data
result:
{
    "status": 200,
    "data": [
        {
            "id": "1",
            "createdAt": "2021-06-09T09:37:05.527Z",
            "price": "218.00",
            "department": "Outdoors",
            "product": "Salad",
            "price_idr": "3,136,791.10"
        },
        ...
    ]
}
```

endpoint Data Order
```sh
method: GET
url: https://apijdsnode.herokuapp.com/api/fetch/data_order
header: 
{
    Authorization: Bearer {Token}
}
result:
{
    "status": 200,
    "data": [
        {
            "department": "Games",
            "product": "Computer",
            "price_idr": "57,555.80"
        },
        ...
    ]
}
```