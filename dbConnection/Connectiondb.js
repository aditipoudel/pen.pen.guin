const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://zayazzp:EGriy9tK48kOcM7z@softwarica.emril.mongodb.net/penpenguin?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})

