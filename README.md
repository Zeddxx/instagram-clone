> Basicaly i don't know how to write a better readme.md if this contains any mistake please let me know, otherwise let's go.
> Also had a demo account login to view project as a demo user 😇🫶

<img src="./public/assets/logo-white.svg" alt="instagram logo" width="1000px"/>

# Instagram Clone
[Link](https://instagram-clone-zeddxx.vercel.app)
This is just made for learning purposes i have no intension to use this as marketing and other things 👍

> TODO:
> - Infinite scrolling.

## Table of contents:

- [Brief description](#brief-description)
- [Enviorment variable](#.env-example)
- [Feature's](#feature)
- [Brief description](#brief-description)
- [Enviorment variable](#enviorment-variable-example)

## Feature

Some feature that i implemented in this project are:
- Login and register with email username name password.
- A look-alike home page just like the instagram homepage.
- Like functionality with realtime like count change.
- Comment functionality where user can comment to multiple post.
- Post creation functionality - You can create the post by going to create.
- User profile page - user can watch their user profile by clicking into profile icon.
- explore page where you can see all posts in one place.
- Search functionality where user can search other user with there username.
- Saved posts and view saved posts.

## Brief description

This is a social media clone made with NextJs 13.

- Reactjs as frontend
- NextJs as my framework
- [Appwrite](https://www.appwrite.io) as my database
  - appwrite auth
  - appwrite storage
  - appwrite databases
- [shadcn-ui](https://ui.shadcn.com) as my component library.
- [Tanstack-react-query](https://tanstack.com) for realtime mutations and queries


## ```enviorment variable``` example

```path:``` root directiory - outside app/ anywhere

```
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_URL=

NEXT_PUBLIC_APPWRITE_STORAGE_ID=
NEXT_PUBLIC_APPWRITE_DATABASE_ID=

NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=
NEXT_PUBLIC_APPWRITE_COMMENT_COLLECTION_ID=
```
