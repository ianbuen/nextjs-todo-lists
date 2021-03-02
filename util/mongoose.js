import mongoose from "mongoose";

const connOptions = { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }

mongoose.connect(process.env.DBPATH, connOptions);