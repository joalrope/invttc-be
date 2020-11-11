
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

const rtCreateProd = [Roles.Storer, Roles.StorerChief, Roles.StoreManager, Roles.Admin]; 
const rtUpdateUser = [Roles.StoreManager, Roles.Admin, Roles.Owner]; 

module.exports = {
    Roles,
    rtCreateProd,
    rtUpdateUser
}