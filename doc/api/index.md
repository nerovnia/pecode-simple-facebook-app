# API documentation

`Create Accounts : POST /auth/register/`

```json
{
  	"fullName": "user",
    "email": "user@example.com",
    "password": "qwerty"
}
```    

`Login : POST /auth/login/`

```json
{
	"email": "user@example.com",
	"password": "qwerty"
}
```


`Create New Post : POST /post/new`

```json
{
  "post": "Post text"
}
```

`Get List All Posts : GET /posts`

