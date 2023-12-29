> Basicaly i don't know how to write a better readme.md if this contains any mistake please let me know, otherwise let's go.

<img src="./public/assets/logo-white.svg" alt="instagram logo" width="1000px"/>

# Instagram Clone  
[Link](https://instagram-clone-zeddxx.vercel.app)
This is just made for learning purposes i have no intension to use this as marketing and other things 👍

## Table of contents:

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

## Brief description

This is a social media clone made with NextJs 13.
- Reactjs as frontend
- [Appwrite](https://www.appwrite.io) as my database
    - appwrite auth
    - appwrite storage
    - appwrite databases
- [shadcn-ui](https://ui.shadcn.com) as my component library.
- [Tanstack-react-query](https://tanstack.com) for realtime mutations and queries.


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
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
