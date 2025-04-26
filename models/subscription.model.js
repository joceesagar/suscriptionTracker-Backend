import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription is required'],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Price must be greater than 0'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'NPR'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other'],
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: (value) => value > this.startDate,
            message: 'Start date must be in the past'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
        index: true
    }
}, { timestamps: true })


// Pre-save middleware for subscriptionSchema
// This runs automatically before saving a subscription document
subscriptionSchema.pre("save", function (next) {

    // Check if the subscription doesn't have a renewal date set
    if (!this.renewalDate) {
        // Define the number of days for each renewal frequency
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        // Set the renewal date based on the start date and frequency
        this.renewalDate = new Date(this.startDate); // start with the start date
        this.renewalDate.setDate(
            this.renewalDate.getDate() + renewalPeriods[this.frequency] // add the appropriate number of days
        );
    }

    // Check if the renewal date is already past the current date
    if (this.renewalDate < new Date()) {
        // If the subscription has already expired, update the status
        this.status = 'expired';
    }

    // Call next() to continue with the save operation
    next();
});


const Subscription = mongoose.model("Subscription", subscriptionSchema)

export default Subscription;
