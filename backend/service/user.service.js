import { User } from "../model/index.js";
import bcrypt from "bcryptjs";
import { tokenService } from "./index.js";

// Find one user
export async function findOne(query) {
    const user = await User.findOne(query);
    return user;
}

// Find user by id
export async function findById(id, options = {}) {
    const user = await User.findById(id, options);
    return user;
}

// Create user
export async function createUser(body) {
    const user = await User.create(body);
    return user;
}

// Update user by id
export async function updateUserById(id, body) {
    const user = await User.findByIdAndUpdate(id, body, {
        new: true,
    });

    return user;
}

// Register user
export async function registerUser(name, email, password) {
    const existUser = await findOne({ email });

    if (existUser) {
        throw new Error("User already exists");
    }

    const bcryptPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
        name,
        email,
        password: bcryptPassword,
    });

    return user;
}

// Login user
export async function login(email, password) {
    const existUser = await findOne({ email });

    if (!existUser) {
        throw new Error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(
        password,
        existUser.password
    );

    if (!isPasswordMatch) {
        throw new Error("Invalid credentials");
    }

    const token = tokenService.createToken(existUser._id);

    return {
        user: existUser,
        token,
    };
}

// Get current user
export async function getCurrentUser(id) {
    const user = await User.findById(id).select("name email");

    return user;
}

// Update user
export async function updateUser(body) {
    const existUser = await findOne({ email: body.email });

    if (!existUser) {
        throw new Error("User not found");
    }

    const updatedUser = await updateUserById(
        existUser._id,
        body
    );

    return updatedUser;
}

// Update password
export async function updatePassword(
    email,
    currentPassword,
    newPassword
) {
    if (currentPassword === newPassword) {
        throw new Error(
            "New password cannot be same as current password"
        );
    }

    const existUser = await findOne({ email });

    if (!existUser) {
        throw new Error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        existUser.password
    );

    if (!isPasswordMatch) {
        throw new Error("Invalid credentials");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await updateUserById(
        existUser._id,
        {
            password: hashPassword,
        }
    );

    return updatedUser;
}