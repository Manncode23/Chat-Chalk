"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomSchema = exports.SigninSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    username: zod_1.z.string().email({ message: "Please enter a valid email" }).max(100),
    password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters" }),
    name: zod_1.z.string().min(1, { message: "Name cannot be empty" })
});
exports.SigninSchema = zod_1.z.object({
    username: zod_1.z.string().email({ message: "Please enter a valid email" }).max(100),
    password: zod_1.z.string(),
});
exports.CreateRoomSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(20),
});
