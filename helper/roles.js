const roles = Object.freeze({
  basic: 'basic',
  freelance: 'freelance',
  storer: 'storer',
  storerChief: 'storer-chief',
  seller: 'seller',
  admin: 'admin',
  storeManager: 'store-manager',
  owner: 'owner',
  developer: 'developer',
});

const createReg = [
  roles.storer,
  roles.storerChief,
  roles.storeManager,
  roles.admin,
  roles.developer,
]; // Crear o agregar Nuevos Productos
const updateReg = [
  roles.storer,
  roles.storerChief,
  roles.storeManager,
  roles.admin,
  roles.developer,
]; // Modificar Productos
const deleteReg = [
  roles.storer,
  roles.storerChief,
  roles.storeManager,
  roles.admin,
]; // Eliminar Productos
const updateRol = [roles.storeManager, roles.admin, roles.owner]; // Modificar rol del usuario

module.exports = {
  Roles: roles,
  createReg,
  updateReg,
  deleteReg,
  updateRol,
};
