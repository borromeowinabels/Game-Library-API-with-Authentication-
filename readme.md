  Web Back-End Developer Exam: Game Library API with Authentication 
  
  1) install Depedencies 
        npm install
        npm i express bcryptjs cookie-parser cors helmet koi jsonwebtoken mongoose nodemailer 
          technologies used
            - Node.js
            - Express.js
            - MongoDB & Mongoose
            - JWT (JSON Web Token)
            - Bcrypt
            - Joi (for input validation)
            - Cookie-parser
            - CORS
            - Helmet

    2) create .env file
    PORT=8000
    MONGO_URL=your_mongodb_connection_url_here
    TOKEN_SECRET=your_jwt_secret_key

    3) run the server
      npm run dev
      if sucessful will display 
        listening..
        Database connected

    4)auth routes
    
    | Method | Route              | Description          | Protected |
    |--------|--------------------|----------------------|-----------|
    | POST   | `/api/auth/signup` | Register a new user  | ❌        |
    | POST   | `/api/auth/signin` | Login and get JWT    | ❌        |
    | POST   | `/api/auth/signout`| Logout user          | ✅        |

      Signup
      POST  http://localhost:8000/api/auth/signup
      {
        "email": "user@example.com",
        "password": "SecurePass123!"
      }

      JSON response
      JSON response 
        {
            "success": true,
            "message": "Account created successfully.",
            "result": {
                "email": "user@example.com",
                "verified": false,
                "_id": "6822d86da68d066ec017a524",
                "createdAt": "2025-05-13T05:28:13.169Z",
                "updatedAt": "2025-05-13T05:28:13.169Z",
                "__v": 0
            }
        }

      Signin
      POST http://localhost:8000/api/auth/signin
      {
        "email": "user@example.com",
        "password": "SecurePass123!"
      }

      JSON response
        {
            "sucess": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODIyZDg2ZGE2OGQwNjZlYzAxN2E1MjQiLCJlbWFpbCI6ImFzdXNAZ21haWwuY29tIiwidmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE3NDcxMTQzODksImV4cCI6MTc0NzEyMTU4OX0.xujsGULnCP4K23SDrsH7k1pEpFWXn5xGaJ95EF9uF0o",
            "message": "logged in successfully"
        }
      

    5)go to headers 
      add in key column client and for value add not browser
      add in key colume Authorization and for value add Bearer 'your_jwt_token'

      |       | Key                | Value                   |
      |-------|--------------------|-------------------------|
      | ✅   | client              | not-browser             | 
      | ✅   | Authorization       | Bearer 'your_jwt_token' |

      game routes

      | Method | Route                   | Description                  | Protected |
      |--------|-------------------------|------------------------------|-----------|
      | POST   | `/api/posts/create`     | Create a new game post       | ✅        |
      | GET    | `/api/posts/all-posts`  | Get all game posts           | ✅        |
      | GET    | `/api/posts/:id`        | Get a single game post by ID | ✅        |
      | PUT    | `/api/posts/:id`        | Update a game post           | ✅        |
      | DELETE | `/api/posts/:id`        | Delete a game post           | ✅        |

      Create post
      POST http://localhost:8000/api/posts/create-post

      {
          "title": "lorem ipsum",
          "genre": "lorem ipsum",
          "platform":"lorem ipsum",
          "releaseYear": "2025",
          "description":"lorem ipsum"
      }

      JSON response
        "success": true,
        "message": "created",
        "data":

    Search post
    GET http://localhost:8000/api/posts/search-post?_id="post_id_number"

    JSON response
      "success": true,
      "message": "search post",
      "data":

    Edit post
    PUT http://localhost:8000/api/posts/update-post?_id="post_id_number"
    {
        "title": "last post edit",
        "genre": "lorem ipsum",
        "platform":"lorem ipsum",
        "releaseYear": "2025",
        "description":"lorem ipsum"
    }

    JSON response
      "success": true,
      "message": "Updated",
      "data": 

    Read post
    GET http://localhost:8000/api/posts/all-posts

    JSON response
    {
      "success": true,
      "message": "posts",
      "data": 

    delete post
    DELETE http://localhost:8000/api/posts/delete-post?_id='post_id_number'

      JSON response
        {
          "success": true,
          "message": "deleted"
        }

        