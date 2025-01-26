const db = require('../jsonstore.json');
const fs = require('fs').promises;
const path = require('path');

//Get all entries
export const getEntriesByType = (entryType) => {
    if (db[entryType]) {
        return db[entryType];
    } else throw Error('⚡ No such collection found.');
}
// Create entry
export const addEntry = async (entryType, key, value) => {
    const filePath = path.join(__dirname, '..', 'jsonstore.json');
    try {

        // Read the file
        const data = await fs.readFile(filePath, 'utf-8');
        let entries = JSON.parse(data);

        // Ensure the collection exists
        if (!entries[entryType]) {
            entries[entryType] = {};
        }
        // Modify the object
        entries[entryType][key] = value;

        // Write back to the file
        await fs.writeFile(filePath, JSON.stringify(entries, null, 2), 'utf-8');
        console.log(`Successfully added ${key}:${value} to ${entryType}`);
    } catch (err) {
        console.error('Error updating the JSON file:', err);
        throw err; // Propagate the error to the calling function
    }
}
//Update collection
export const updateEntry = async (entryType, key, value) => {
    const filePath = path.join(__dirname, '..', 'jsonstore.json');
    
    try {
        // Read the file
        const data = await fs.readFile(filePath, 'utf-8');
        let entries = JSON.parse(data);

        //Modify the object
        entries[entryType][key] = value;

        // Write back to the file
        await fs.writeFile(filePath, JSON.stringify(entries, null, 2), 'utf-8');
        console.log(`Successfully added ${key}:${value} to ${entryType}`);
        return `Successfully added ${key}:${value} to ${entryType}`;
    } catch (e) {
        console.error('Error updating the JSON file:', e);
        throw e; // Propagate the error to the calling function
    }
}