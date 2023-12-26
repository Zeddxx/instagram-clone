import * as z from "zod"

export const signUpSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3, "Username must be at least 3 characters!"),
    name: z.string().min(3, "Name should be more then 3 characters!"),
    password: z.string(),
})

export const signInValidation = z.object({
    email: z.string().email(),
    password: z.string()
})

export const PostValidation = z.object({
    caption: z.string().min(4, "Atleast 4 characters required!"),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string()
})

export const UpdateProfileValidation = z.object({
    file: z.custom<File[]>(),
    name: z.string().min(3).max(30),
    username: z.string().min(3).max(34),
    bio: z.string().max(2200)
})