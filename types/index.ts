export type INewUser = {
    name: string
    email: string
    password: string
    username: string
}

export type IContextType = {
 user: IUser
 isLoading: boolean
 setUser: React.Dispatch<React.SetStateAction<IUser>>
 isAuthenticated: boolean
 setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
 checkAuthUser: () => Promise<boolean>
}

export type IUser = {
    id: string
    name: string
    username: string
    email: string
    imageUrl: string
    bio: string
}

export type INewPost = {
    userId: string
    caption: string
    file: File[]
    location?: string
    tags?: string
}

export type ICommentType = {
    comment: string
    postId: string
    userId: string
}

export type IUpdateUser = {
    userId: string | undefined
    name: string
    username: string
    bio: string
    imageUrl: URL | string
    imageId: string
    file: File[]
}

export type IUpdatePost = {
    postId: string
    caption: string
    imageId: string
    imageUrl: URL | string
    file: File[]
    location?: string | undefined
    tags?: string | undefined
}