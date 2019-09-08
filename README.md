# Subscription Service - Project Owner Microservice
## Description
Project Owner Microservice:
- can register project-owners / users to the system
- can unsubscribe from the service
- can update the project-owners / users properties

## Routes
|METHOD|ROUTE        |REQUEST BODY                                  |DESCRIPTION             |
|------|-------------|----------------------------------------------|------------------------|
|GET   |/            |                                              |Get all the users       |
|POST  |/            |{email, password, subscription_type, username}|Register a project owner|
|GET   |/:id         |                                              |Get the project owner   |
|DELETE|/:id         |                                              |Delete the project owner|
|PATCH |/:id/password|{ newPassword, oldPassword }                  |Update password         |
|PATCH |/:id/email   |{ email }                                     |Update email            |

## ENV variables
|NAME      |description              |
|----------|-------------------------|
|PGHOST    |postgre sql host         |
|PGUSER    |postgre sql username     |
|PGDATABASE|postgre sql database name|
|PGPASSWORD|postgre sql password     |
|PGPORT    |postgre sql port         |
