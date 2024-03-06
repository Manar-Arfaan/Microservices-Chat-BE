const mongoose= require('mongoose');
const { ObjectId } = mongoose.Schema;

const chatMessageSchema=new mongoose.Schema({
    sender:{type: ObjectId, ref:'User', required: true},
    receiver:{type:ObjectId, ref:'User', required: true},
    message:{type:String, required:true}
});

//Define indexes
chatMessageSchema.index({sender:1});
chatMessageSchema.index({receiver:1});
chatMessageSchema.index({timestamps:1});

module.exports=mongoose.model('ChatMessage', chatMessageSchema);