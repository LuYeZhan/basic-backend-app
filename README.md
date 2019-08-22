
# listen&talk App

<br>

## Description

This is an social network app. You can finally interact in a social network, with just audio.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start recording talks or listen to newly created talks.
-  **Login:** As a user I can login to the platform so that I can either record or listen talks.
-  **Logout:** As a user I can logout from the platform so no one else can use it.
-  **Add Talks** As a user I can add a new talk, and listen to a talk created by someone else.
-  **Edit Talks** As a user I can edit my talks.
-  **Delete Talks** As a user I can delete my talks.
-  **Edit profiles** As a user I can edit my profile to my personal like.
-  **View Home** As a user I want to see all the talks that have been created.





## Backlog

User profile:
-  **View users profile** As a user I can see other user's profile, and their talks, if they accept my friend request.
-  **Interact with other users** As a user I can interact with others user's talks, responding to their talk.
-  **Search for a friend** As a user I can search other user's name and add them to friends



<br>


# Client / Frontend

## Routes
| Path                      | Component            | Permissions | Behavior                                                     |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/splash`                 | Splash               | public      | Log in or Signup                                             |
| `/auth/signup`            | Signup               | anon only   | Signup form, link to login, navigate to homepage after signup|
| `/auth/login`             | Login                | anon only   | Login form, link to signup, navigate to homepage after login |
| `/auth/logout`            | n/a                  | anon only   | Navigate to splashpage after logout, expire session          |
| `/home`                   | Home                 | user only   | Shows all talks in a list                                    |
| `/profile`                | Profile              | user only   | Shows user's profile info                                    |
| `/profile/edit`           | Profile              | user only   | Shows form where you can edit his info                       |
| `/create-talk`            | Talk                 | user only   | Adds a talk                                                  |
| `/profile/:id`            | TalkDetail           | user only   | Shows all the talks the user created, other user's can see and interact with the user |
| `/talks/:id`              | na                   | user only   | Delete talks                                                 |



## Components

- Login

- Splash

- SignUp

- Home

- Profile

- CreateTalk

- Navbar

- Footer


 
## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous [search]
- Talk Service
  - talk.list()
  - talk.create
  - talk.delete(id)
  - talk.put(id)
  
- User Service 

  - user.detail(id)



<br>


# Server / Backend


## Models

User model

```javascript
{
  username - String // required
  email - String // required & unique
  password - String // required
  friends - String 
  request - String
  talks - String

}
```

Talks model

```javascript
 {
   name:String,
   audio:String,
   users: [{type: Schema.Types.ObjectId,ref:'Users'}],
   author:[{type: Schema.Types.ObjectId,ref:'Talks'}],
   tags: 
 }
```


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | /auth/profile               | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | /auth/signup                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | /auth/login                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | /auth/logout                | (empty)                      | 204            | 400          | Logs out the user                                            |
| POST        | /profile/edit               | { name, email, password, }   | 200            | 400          | Edit's users profile info
| GET         | /home                       |                              |                | 400          | Show all talks info                                          |                                 |
| POST        | /create-talk                | {}                           | 201            | 400          | Create and save a new talk                             |
| PUT         | /talk/edit/:id              | {title, date, description}   | 200            | 400          | edit talk                                             |
| DELETE      | /talk/delete/:id            | {id}                         | 201            | 400          | delete talk                                            |


<br>


## Links

### Trello/Kanban


picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
