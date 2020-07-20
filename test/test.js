const expect = require("chai").expect;
const dogs = require("../data");

const displayDogs= dogs.getAll();

describe("Dog module", () => {
    it("Returns requested dog", () => {
      const result = dogs.getDetail("Nutmeg");
      expect(result).to.deep.equal({name: "Nutmeg", breed:"Bull Mastiff", age:"9 months", sex: "female"});
    });
    
    it("Fails w/ invalid dog", () => {
      const result = dogs.getDetail("Striper");
      expect(result.msg).to.deep.equal("Striper not found");
    });

    it("Adds a new dog", () =>{
        dogs.addDog("Mudge", "English Mastiff", "3 years", "male");
        expect(displayDogs).to.deep.include({name: "Nutmeg", breed:"Bull Mastiff", age:"9 months", sex: "female"});
    });

    it("Fails w/ missing perameters", () => {
        dogs.addDog("Badger", "Springer Spanial", "6 years");
        expect(displayDogs).to.not.include({name: "Badger", breed:"Springer Spanial", age:"6 years", sex: undefined})
        expect(dogs.addDog("Badger", "Springer Spanial", "6 years").msg).to.deep.equal("incomeplete information");
    });

    it ("Deletes requested dog", () =>{
        dogs.delDog("Lucie");
        expect(displayDogs).to.not.include({name: 'Lucie', breed: 'Yorkie', age: '12 years', sex: 'Female'});
    });

    it("Fails w/ dog not listed", () =>{
        dogs.delDog("Juice");
        expect(dogs.getDetail("Juice").msg).to.deep.equal("Juice not found in database");
    })
    
   });