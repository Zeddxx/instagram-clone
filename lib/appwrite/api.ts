import { ICommentType, INewPost, INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Query } from "appwrite";

export const createUserAccount = async (user: INewUser) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if(!newAccount) throw Error;
        
        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl
        })
        return newUser
    } catch (error: unknown) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId: string
    email: string
    name: string
    imageUrl: URL
    username?: string
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user: { email: string, password: string }) {
    try {
        const session = await account.createEmailSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log(error);
    }
}

export async function getAccount(){
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser(){
    try {
        const currentAccount = await getAccount()

        if(!currentAccount) throw new Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw new Error

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export async function uploadFile(file: File){
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )

        return uploadedFile;
    } catch (error) {
        console.log(error);
    }
}

export function getFilePreview(fieldId: string){
    try {
    const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fieldId,
        2000,
        2000,
        "top",
        100
    )

    if(!fileUrl) throw Error

    return fileUrl
    } catch (error) {
        console.log(error);
    }
}

export async function deleteFile(fileId: string){
    try {
        await storage.deleteFile(
            appwriteConfig.storageId,
            fileId
        )

        return { status: "ok" }
    } catch (error) {
        console.log(error);
    }
}

export async function createPost(post: INewPost){
    try {
        const uploadedFile = await uploadFile(post.file[0])

        if(!uploadedFile) throw new Error;

        const fileUrl = getFilePreview(uploadedFile.$id)

        if(!fileUrl){
            await deleteFile(uploadedFile.$id);
            throw Error;
        }

        const tags = post.tags?.replace(/ /g, "").split(" ") || []

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )

        if(!newPost){
            await deleteFile(uploadedFile.$id)
            throw Error
        }

        return newPost;
    } catch (error) {
        console.log(error);
    }
}

export async function getRecentPosts(){
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if(!posts) throw Error;

    return posts
}

export async function likePost(postId: string, likesArray: string[]){
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray
            }
        )    
        
        if(!updatedPost) throw Error

        return updatedPost
    } catch (error) {
        console.log(error);
    }
}

    export async function savePost(postId: string, userId: string ) {
    try {
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: userId,
                post: postId
            }
        )    
        
        if(!updatedPost) throw Error

        return updatedPost
    } catch (error) {
        console.log(error);
    }
}
export async function deleteSavedPost(savedRecordId: string) {
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordId
        )    
        
        if(!statusCode) throw Error

        return { status: "ok" }
    } catch (error) {
        console.log(error);
    }
}

export async function postComment(comment: ICommentType){
    try {
        const postComment = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.commentCollectionId,
            ID.unique(),
            {
                post: comment.postId,
                postId: comment.postId,
                comment: comment.comment,
                user: comment.userId
            }
        )

        if(!postComment) throw Error;

        return postComment;
    } catch (error) {
        console.log(error);
    }
}

export async function getSpecificPostComments(postId?: string){
    if(!postId) throw Error;

    try {
        const comments = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.commentCollectionId,
            [Query.equal("postId", postId), Query.orderDesc("$createdAt")]
        )
        
        if(!comments) throw Error;

        return comments;
    } catch (error) {
        console.log(error);
    }
}

export async function signOutAccount(){
    try {
        const session = await account.deleteSession("current")

        return session
    } catch (error) {
        console.log(error);
    }
}

export async function getPostById(postId?: string){
    if(!postId) throw Error

    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )

        if(!post) throw Error

        return post;
    } catch (error) {
        console.log(error);
    }
}