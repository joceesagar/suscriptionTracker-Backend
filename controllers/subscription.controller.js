import Subscription from "../models/subscription.model.js"

export const createSubscription = async (req, res, next) => {
    const { name } = req.body;
    const user = req.user._id;
    const existingSubscription = await Subscription.findOne({ user, name });
    if (existingSubscription) {
        const error = new Error("Subscription already exists");
        error.status = 500;
        throw error;
    }
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id, //this .user is not a part of req.body because user information is attached by auth middleware(from token) if user is logged in otherwise not.
        })

        res.status(201).json({ success: true, data: subscription })
    } catch (error) {
        next(error)
    }
}

export const getUserSubscription = async (req, res, next) => {
    try {
        // Check if the user is trying to access own's subscriptions or not
        if (req.user._id == !req.params.id) {
            const error = new Error('You are not the owner of this account')
            error.status = 401;
            throw error;
        }

        const subscription = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscription })
    } catch (error) {
        next(error)
    }
} 