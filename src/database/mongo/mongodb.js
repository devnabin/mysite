var mongoose = require("mongoose");
mongoose.connect(process.env.MongoUrl,{ 
    useNewUrlParser: true ,
    useUnifiedTopology : true,
    useCreateIndex: true,
});

