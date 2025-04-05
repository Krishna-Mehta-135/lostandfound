import mongoose from "mongoose";

const verificationQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
    },
    {_id: false}
);
//We aren't adding individual id because it is only used inside its parent foundItem. And it is not updated occasionally.

const foundItemSchema = new mongoose.Schema(
    {
        itemType: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Jewelry", "Clothes", "Electronics", "Stationary", "Bottles&Tiffin"]
        },
        finderName: {
            type: String,
            required: true,
        },
        finderPhone: {
            type: String,
            required: true,
        },
        finderEmail: {
            type : String,
            required : true
        },
        verificationQuestions: {
            type: [verificationQuestionSchema],

            validate: {
                validator: function (val) {
                    return val.length >= 3 && val.length <= 5;
                },
                message: "Please provide between 3 to 5 verification questions.",
            },
        },
        isClaimed: {
            type: Boolean,
            default: false,
        },
    },
    {timestamps: true}
);

const FoundItem = mongoose.model("FoundItem", foundItemSchema);
export default FoundItem;
