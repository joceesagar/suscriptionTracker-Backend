import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import CONFIG from "../config/env.js";


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession(); //This session has nothing to do with user session rather it'a a session for mongoose transaction.
    session.startTransaction();
    // Starting a transaction makes your operations atomic. (This operation can be performed without transaction also simply remove session and transaction and it will be normal operation)

    // Atomic = All or nothing.

    // Either every operation inside the transaction succeeds and gets saved to the database,

    // Or none of them do — and the database goes back to how it was before.

    // No half-updated, broken, or inconsistent data.

    try {
        //Create a new user
        const { name, email, password } = req.body;

        //Check if the user already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        //If user doesnot exist hash user password
        const salt = await bcrypt.genSalt(10) //complexity for hashing password
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session }) //session indicate if anything went wrong or if later on transaction is aborted user will not be created.
        // And to pass a `session` to `Model.create()` in Mongoose, you **must** pass an array as the first argument that's why array is passed.

        const token = jwt.sign({ userId: newUsers[0]._id }, CONFIG.jwt_secret, { expiresIn: CONFIG.jwt_expiry })


        await session.commitTransaction(); //Everthing went correact user will be created
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User Created Successfully',
            data: {
                token: token,
                user: newUsers[0],
            }
        })
    } catch (error) {
        await session.abortTransaction(); //if anypoint anything goes wrong just abort transaction
        session.endSession();
        next(error); //this error will be handled by error middleware

    }
}

//no need for transaction here in signIn
export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });



        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            const error = new Error("Invalid Password");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, CONFIG.jwt_secret, { expiresIn: CONFIG.jwt_expiry })

        // //✅ Best practice:
        // //If the token is sensitive (e.g., JWT), better to let the backend set the cookie with HttpOnly flag → this makes it unreadable by JavaScript, and helps prevent XSS attacks.
        // res.cookie('token', token, {
        //     httpOnly: true,  // Prevents JavaScript access
        //     secure: true,    // Cookie only sent over HTTPS
        //     sameSite: 'Strict', // CSRF protection
        //     maxAge: 24 * 60 * 60 * 1000, // 1 day expiration (in milliseconds)
        //     path: '/',       // Available on all routes
        // });

        res.status(200).json({
            success: true,
            message: "User signed in succssfully",
            data: {
                token,
                user
            }
        });
    } catch (error) {
        next(error)
    }
}

export const signOut = async (req, res, next) => { }