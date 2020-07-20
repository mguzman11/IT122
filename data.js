//Array with 5 objects and 4 attributes each
const dogs = [
    {name: 'Nutmeg', breed: 'Bull Mastif', age: '9 months', sex: 'Female'},
    {name: 'Lucy', breed: 'Pug', age: '12 years', sex: 'Female'},
    {name: 'Fig', breed: 'Bull Mastif', age: '2 months', sex: 'Male'},
    {name: 'Lucie', breed: 'Yorkie', age: '12 years', sex: 'Female'},
    {name: 'Bear', breed: 'Yorkie', age: '6 months', sex: 'Male'},
]

//export the array
const getAll = () => {
    return dogs;
}

const getDetail = name => {
    const dog = dogs.find(dogs => dogs.name === name);
    if (dog===undefined){
        return {"details": false, "msg":"Dog not found"};
    }else{
        return dog;
    }
}

const addDog= (name, breed, age, sex) =>{
    if ([name, breed, age, sex].includes(undefined)){
        return {"added":false, "msg":"Please complete all information before adding" };
    }else{
        const newDog={name: name, breed: breed, age: age, sex: sex};
        dogs.push(newDog);
        return newDog;
    }
}


const delDog= name =>{
    const delDog= dogs.findIndex(dogs => dogs.name === name)
        if (delDog === -1){
            return {"deleted":false, "msg":"That dog does not exist in the database"};
        }else{
            dogs.splice(delDog,1);
            return {"deleted": true, "msg": `"${name}" removed`};
        } 
}

module.exports= {getAll, getDetail, addDog, delDog};