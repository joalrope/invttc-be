const Roles = Object.freeze({
  Basic: 'basic',
  Freelance: 'freelance',
  Storer: 'storer',
  StorerChief: 'storer-chief',
  Seller: 'seller',
  Admin: 'admin',
  StoreManager: 'store-manager',
  Owner: 'owner',
  Developer: 'developer',
});

const createReg = [Roles.Storer, Roles.StorerChief, Roles.StoreManager, Roles.Admin, Roles.Developer]; // Crear o agregar Nuevos Productos
const updateReg = [Roles.Storer, Roles.StorerChief, Roles.StoreManager, Roles.Admin]; // Modificar Productos
const deleteReg = [Roles.Storer, Roles.StorerChief, Roles.StoreManager, Roles.Admin]; // Eliminar Productos
const updateRol = [Roles.StoreManager, Roles.Admin, Roles.Owner]; // Modificar rol del usuario

module.exports = {
  Roles,
  createReg,
  updateReg,
  deleteReg,
  updateRol,
};
