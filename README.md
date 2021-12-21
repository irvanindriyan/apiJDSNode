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
url: localhost:3000/api/auth/sign_up
param:
{
    "nik": "1234567890123469",
    "role": "admin",
    "password": "123456"
}
result:
{
    "status": 200,
    "data": {
        "msg": "Registrasi sucessfully !",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiaWQiOjM2LCJuaWsiOiIxMjM0NTY3ODkwMTIzNDY5Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0MDA0NjI1MSwiZXhwIjoxNjQwMTMyNjUxfQ.avMqLfF5KTxQFt-qGCvPY4o1r-bRWj4GlzSLBhSQks8"
    }
}
```

endpoint Sign In
```sh
method: POST
url: localhost:3000/api/auth/sign_in
param:
{
    "nik": "1234567890123469",
    "password": "123456"
}
result:
{
    "status": 200,
    "data": {
        "msg": "Login sucessfully !",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiaWQiOjM2LCJuaWsiOiIxMjM0NTY3ODkwMTIzNDY5Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0MDA0NjI1MSwiZXhwIjoxNjQwMTMyNjUxfQ.avMqLfF5KTxQFt-qGCvPY4o1r-bRWj4GlzSLBhSQks8"
    }
}
```

endpoint User
```sh
method: GET 
url: localhost:3000/api/auth/user
header: 
{
    Authorization: Bearer {Token}
}
result:
{
    "status": 200,
    "data": {
        "nik": "1234567890123469",
        "role": "admin",
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOnsiaWQiOjM2LCJuaWsiOiIxMjM0NTY3ODkwMTIzNDY5Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY0MDA0NjM2OSwiZXhwIjoxNjQwMTMyNzY5fQ.V08uJcy4oQGD6ui0CrVWCTgeEkTJ_7OsT-WUGEmvfIg"
    }
}
```

endpoint Sign Out
```sh
method: GET
url: localhost:3000/api/auth/sign_out
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
url: localhost:3000/api/fetch/data
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
url: localhost:3000/api/auth/data_order
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