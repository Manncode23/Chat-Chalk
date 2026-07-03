import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string().email({ message: "Please enter a valid email" }).max(100),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    name: z.string().min(1, { message: "Name cannot be empty" })
});

export const SigninSchema = z.object({
    username: z.string().email({ message: "Please enter a valid email" }).max(100),
    password: z.string(),
});

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20),
});