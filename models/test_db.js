const Dog= require('./dogs');

//find all documents
Dog.find({}, (err, result) => {
    //output error if one has occured
    if (err){
        console.log(err);
    }else{
        //otherwise output
        console.log(result);
    }




});