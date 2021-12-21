# instalasi

Configurasi database config in `.env`
```sh
DB_CONNECTION=mysql
DB_HOST={host}
DB_PORT={port}
DB_DATABASE={database}
DB_USERNAME={user}
DB_PASSWORD={password}
```

Install package
```sh
$ npm install --save npx express sequelize sequelize-cli mysql2 password-hash jsonwebtoken jwt-decode express-validator cors helmet dotenv nodemon node-fetch@2.0
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
        "message": "Registrasi sucessfully !",
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
        "message": "Login sucessfully !",
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
header: 
{
    Authorization: Bearer {Token}
}
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