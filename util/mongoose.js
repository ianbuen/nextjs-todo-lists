import mongoose from "mongoose";

const connOptions = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }

mongoose.connect(process.env.DB_ATLAS, connOptions);

const itemSchema = new mongoose.Schema({
    name: String,
    category: String,
    done: Boolean
}); 

export default mongoose.models.Item || mongoose.model('Item', itemSchema);

