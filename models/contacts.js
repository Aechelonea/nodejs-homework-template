const fs = require("fs/promises");
const path = require("path");
let nanoid;

(async () => {
  if (!nanoid) {
    nanoid = (await import("nanoid")).nanoid;
  }
})();

const contactsPath = path.join(__dirname, "contacts.json");

const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const listContacts = async () => {
  return await readContactsFile();
};

const getContactById = async (contactId) => {
  const contacts = await readContactsFile();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readContactsFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const [removed] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removed;
  }
  return null;
};

const addContact = async (body) => {
  const contacts = await readContactsFile();
  const newContact = { id: nanoid(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContactsFile();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
