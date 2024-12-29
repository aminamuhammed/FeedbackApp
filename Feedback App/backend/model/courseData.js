const mongoose=require("mongoose")
const courseSchema=new mongoose.Schema({
    name: String,
    duration: Number,
    comments: String,
    rating: Number
});

const courseModel = mongoose.model('courseData', courseSchema)
module.exports=courseModel