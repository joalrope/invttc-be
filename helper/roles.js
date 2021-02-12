
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

const rtCreateProd = [Roles.Storer, Roles.StorerChief, Roles.StoreManager, Roles.Admin];    // Crear o agregar Nuevos Productos
const rtUpdateProd = [Roles.Storer, Roles.StorerChief, Roles.StoreManager, Roles.Admin];    // Modificar Productos
const rtDeleteProd = [Roles.Storer, Roles.StorerChief, Roles.StoreManager, Roles.Admin];    // Eliminar Productos

const rtUpdateUserRole = [Roles.StoreManager, Roles.Admin, Roles.Owner];                        // Modificar rol del usuario

module.exports = {
  Roles,
  rtCreateProd,
  rtUpdateProd,
  rtDeleteProd,
  rtUpdateUserRole
}