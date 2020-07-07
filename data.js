//Array with 5 objects and 4 attributes each
const dogs = [
    {name: 'Nutmeg', breed: 'Bull Mastif', age: '9 months', sex: 'Female'},
    {name: 'Lucy', breed: 'Pug', age: '12 years', sex: 'Female'},
    {name: 'Fig', breed: 'Bull Mastif', age: '2 months', sex: 'Male'},
    {name: 'Lucy', breed: 'Yorkie', age: '12 years', sex: 'Female'},
    {name: 'Bear', breed: 'Yorkie', age: '6 months', sex: 'Male'},
]

//export the array
exports.getAll = () => {
    return dogs;
}