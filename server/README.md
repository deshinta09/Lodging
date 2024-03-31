[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13590624&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

Lodging API Documentation

## Endpoint :
List of available endpoints:

- `GET /pub`
- `GET /pub/:id`
- `POST /add-user`
- `POST /login`
- `GET /lodgings`
- `POST /lodgings`
- `GET /lodgings/:id`
- `PUT /lodgings/:id`
- `PATCH /lodgings/:id`
- `DELETE /lodgings/:id`
- `GET /types`
- `POST /types`
- `PUT /types/:id`
- `DELETE /types/:id`

## 1. GET /pub
Description:
- Get all lodging from database

_Response (200 - OK)_
```json
[
    {
        "id": 1,
        "name": "Luxury Suite",
        "facility": "Spa, Gym, Pool",
        "roomCapacity": 2,
        "imgUrl": "https://example.com/luxury-suite.jpg",
        "location": "City Center",
        "price": 200,
        "typeId": 1,
        "authorId": 3,
        "createdAt": "2024-01-30T10:43:05.655Z",
        "updatedAt": "2024-01-30T10:43:05.655Z"
    },
    {
        "id": 2,
        "name": "RelaxRoom",
        "facility": "Swimming Pool, Spa Room, Garden",
        "roomCapacity": 7,
        "imgUrl": "https://res.cloudinary.com/dopjkcmj4/image/upload/v1706615619/ojubg2mvahyl0vwyuw2r.jpg",
        "location": "Jln Server5 No 5, prov Client",
        "price": 1400,
        "typeId": 5,
        "authorId": 1,
        "createdAt": "2024-01-30T10:44:01.767Z",
        "updatedAt": "2024-01-30T11:53:39.146Z"
    }
  ...,
]
```

&nbsp;

## 2. GET /pub/:id
Description:
- Get lodging by id from database

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_
```json
{
  "id": 1,
  "name": "Luxury Suite",
  "facility": "Spa, Gym, Pool",
  "roomCapacity": 2,
  "imgUrl": "https://example.com/luxury-suite.jpg",
  "location": "City Center",
  "price": 200,
  "typeId": 1,
  "authorId": 3,
  "createdAt": "2024-01-30T10:43:05.655Z",
  "updatedAt": "2024-01-30T10:43:05.655Z"
}
```
&nbsp;



## 3. POST /add-user
Description:
- Post user to database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- body
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - OK)_
```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Email must be type email"
}
OR
{
  "message": "Username is require"
}
OR
{
  "message": "Password is require"
}
OR
{
  "message": "Validation len on password failed"
}
```
&nbsp;

## 4. LOGIN /login
Description:
- Post login from database

- body
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - OK)_
```json
{
  "access_token": "string"
}
```
_Response (400 - Bad Request)_
```json
{
  "message": "Email must be type email"
}
OR
{
  "message": "Password is require"
}
```
_Response (401 - Unauthorized)_
```json
{
  "message": "error invalid email or password"
}
```


&nbsp;

## 5. GET /lodgings
Description:
- Get all lodging from database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
```json
[
    {
        "id": 1,
        "name": "Luxury Suite",
        "facility": "Spa, Gym, Pool",
        "roomCapacity": 2,
        "imgUrl": "https://example.com/luxury-suite.jpg",
        "location": "City Center",
        "price": 200,
        "typeId": 1,
        "authorId": 3,
        "createdAt": "2024-01-30T10:43:05.655Z",
        "updatedAt": "2024-01-30T10:43:05.655Z"
    },
    {
        "id": 2,
        "name": "RelaxRoom",
        "facility": "Swimming Pool, Spa Room, Garden",
        "roomCapacity": 7,
        "imgUrl": "https://res.cloudinary.com/dopjkcmj4/image/upload/v1706615619/ojubg2mvahyl0vwyuw2r.jpg",
        "location": "Jln Server5 No 5, prov Client",
        "price": 1400,
        "typeId": 5,
        "authorId": 1,
        "createdAt": "2024-01-30T10:44:01.767Z",
        "updatedAt": "2024-01-30T11:53:39.146Z"
    }
  ...,
]
```
_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```

&nbsp;


## 6. POST /lodgings
Description:
- Post lodging to database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- body
```json
{
  "id": 1,
  "name": "Luxury Suite",
  "facility": "Spa, Gym, Pool",
  "roomCapacity": 2,
  "imgUrl": "https://example.com/luxury-suite.jpg",
  "location": "City Center",
  "price": 200,
  "typeId": 1,
  "authorId": 3,
  "createdAt": "2024-01-30T10:43:05.655Z",
  "updatedAt": "2024-01-30T10:43:05.655Z"
}
```

_Response (201 - OK)_
```json
{
  "id": 1,
  "name": "Luxury Suite",
  "facility": "Spa, Gym, Pool",
  "roomCapacity": 2,
  "imgUrl": "https://example.com/luxury-suite.jpg",
  "location": "City Center",
  "price": 200,
  "typeId": 1,
  "authorId": 3,
  "createdAt": "2024-01-30T10:43:05.655Z",
  "updatedAt": "2024-01-30T10:43:05.655Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name Lodging is require"
}
OR
{
  "message": "Facility Lodging is require"
}
OR
{
  "message": "Capacity Lodging is require"
}
OR
{
  "message": "Image Url Lodging is require"
}
OR
{
  "message": "Falsy to format image url"
}
OR
{
  "message": "Location Lodging is require"
}
OR
{
  "message": "Price Lodging is require"
}
OR
{
  "message": "Price minimal 200"
}
OR
{
  "message": "TypeId Lodging is require"
}
OR
{
  "message": "TypeId not found"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 7. GET /lodgings/:id
Description:
- Get lodging by id from database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```
_Response (200 - OK)_
```json
{
  "id": 1,
  "name": "Luxury Suite",
  "facility": "Spa, Gym, Pool",
  "roomCapacity": 2,
  "imgUrl": "https://example.com/luxury-suite.jpg",
  "location": "City Center",
  "price": 200,
  "typeId": 1,
  "authorId": 3,
  "createdAt": "2024-01-30T10:43:05.655Z",
  "updatedAt": "2024-01-30T10:43:05.655Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```
_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 8. PUT /lodgings/:id
Description:
- Put lodging by id from database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body
```json
{
  "id": 1,
  "name": "Luxury Suite",
  "facility": "Spa, Gym, Pool",
  "roomCapacity": 2,
  "imgUrl": "https://example.com/luxury-suite.jpg",
  "location": "City Center",
  "price": 200,
  "typeId": 1,
  "authorId": 3,
  "createdAt": "2024-01-30T10:43:05.655Z",
  "updatedAt": "2024-01-30T10:43:05.655Z"
}
```

_Response (200 - OK)_
```json
{
  "id": 1,
  "name": "Luxury Suite",
  "facility": "Spa, Gym, Pool",
  "roomCapacity": 2,
  "imgUrl": "https://example.com/luxury-suite.jpg",
  "location": "City Center",
  "price": 200,
  "typeId": 1,
  "authorId": 3,
  "createdAt": "2024-01-30T10:43:05.655Z",
  "updatedAt": "2024-01-30T10:43:05.655Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name Lodging is require"
}
OR
{
  "message": "Facility Lodging is require"
}
OR
{
  "message": "Capacity Lodging is require"
}
OR
{
  "message": "Image Url Lodging is require"
}
OR
{
  "message": "Falsy to format image url"
}
OR
{
  "message": "Location Lodging is require"
}
OR
{
  "message": "Price Lodging is require"
}
OR
{
  "message": "Price minimal 200"
}
OR
{
  "message": "TypeId Lodging is require"
}
OR
{
  "message": "TypeId not found"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```
&nbsp;


## 9. PATCH /lodgings/:id
Description:
- Patch imgUrl lodging by id from database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```
- file
```json
{
  "imageUrl": "<file data>"
}
```

_Response (200 - OK)_
```json
{
  "message": "<lodging name> success to update"
}
```
_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```
&nbsp;

## 10. DELETE /lodgings/:id
Description:
- Delete lodging by id from database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_
```json
{
  "message": "<lodging name> success to delete"
}
```
_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```
&nbsp;

## 11. GET /types
Description:
- Get all type from database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_
```json
[
    {
        "id": 1,
        "name": "Spa",
        "createdAt": "2024-01-30T10:43:05.655Z",
        "updatedAt": "2024-01-30T10:43:05.655Z"
    },
    {
        "id": 2,
        "name": "Hotel",
        "createdAt": "2024-01-30T10:44:01.767Z",
        "updatedAt": "2024-01-30T11:53:39.146Z"
    }
  ...,
]
```
_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```
&nbsp;

## 12. POST /types
Description:
- Post type to database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- body
```json
{
  "name": "Spa",
}
```

_Response (201 - OK)_
```json
{
  "id": 1,
  "name": "Spa",
  "createdAt": "2024-01-30T10:43:05.655Z",
  "updatedAt": "2024-01-30T10:43:05.655Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name type is require"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```

&nbsp;

## 13. PUT /types/:id
Description:
- Put type to database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- body
```json
{
  "name": "Spa",
}
```

_Response (200 - OK)_
```json
{
  "id": 1,
  "name": "Spa",
  "createdAt": "2024-01-30T10:43:05.655Z",
  "updatedAt": "2024-01-30T10:43:05.655Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name type is require"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```
_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```

&nbsp;

## 14. DELETE /types/:id
Description:
- Delete type by id from database

Request:
- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_
```json
{
  "message": "<type name> success to delete"
}
```
_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid Token"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "error not found"
}
```
&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```