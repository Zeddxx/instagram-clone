'use client';

import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from "@tanstack/react-query"
import { createPost, createUserAccount, deleteSavedPost, getCurrentUser, getRecentPosts, getSpecificPostComments, likePost, postComment, savePost, signInAccount, signOutAccount } from "../appwrite/api"
import { ICommentType, INewPost, INewUser } from "@/types"
import { QUERY_KEY } from "./query-key";

export const useCreateAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user),
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string,
            password: string
        }) => signInAccount(user),
    })
}

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_RECENT_POSTS],
        queryFn: getRecentPosts
    })
}

export const useLikePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ postId, likesArray } : { postId: string; likesArray: string[] }) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_POST_BY_ID, data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_CURRENT_USER]
            })
        }
    })
}
export const useSavePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ postId, userId } : { postId: string; userId: string }) => savePost(postId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_CURRENT_USER]
            })
        }
    })
}
export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_CURRENT_USER]
            })
        }
    })
}

export const usePostComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (comment : ICommentType) => postComment(comment),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_POST_BY_ID, data?.$id],
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_RECENT_POSTS]
            })
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.GET_COMMENTS]
            })
        }
    })
}

export const useGetCurrentPostComments = (postId: string) => {
    return useQuery({
        queryFn: () => getSpecificPostComments(postId),
        queryKey: [QUERY_KEY.GET_COMMENTS]
    })
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}