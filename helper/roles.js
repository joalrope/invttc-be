// const { Genders } = require('./models/person');

// // Conditional logic becomes very clear and you are able to
// // avoid errors where a literal might not match the intended enumerated value.
// function conditionalExample(person) {
//   // This is bad because the enumerated value was 'female'.  Also, consider what
//   // happens if the enumerated value changes?  You would have to update
//  //  many places in code.
//   if (person.gender === 'Female') {}
//   // This is better:
//   if (person.gender === Genders.Female) {} 
// }

// // My favorite is using  switch statements with enums:
// function getSalutation(person) {
//   switch (person.gender) {
//     case Genders.Male: return 'Mr.';
//     case Genders.Female: return 'Mrs.';
//     default: return '';
//   }
// }

const Roles = Object.freeze({
    Basic: 'basic',
    Freelance: 'freelance',
    Storer: 'storer',
    StorerChief: 'storer-chief',
    Seller: 'seller',
    Admin: 'admin',
    StoreManager: 'store-manager',
    Owner: 'owner',
    Developer: 'developer' 
});

const rtcreateprod = [Roles.Storer, Roles.StorerChief, Roles.StoreManager, Roles.Admin]; 

module.exports = {
    Roles,
    rtcreateprod
}