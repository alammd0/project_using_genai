import mongoose from "mongoose";

const blockListTokenSchema = new mongoose.Schema({
    token : {
        type : String, 
        required : [true,  "Token is required to be added is blocklist"]
    }
}, {
    timestamps : true
});

const BlockListToken = mongoose.model('BlockListToken', blockListTokenSchema);
export default BlockListToken ;