const { MongoClient, ObjectId } = require('mongodb');
const uri = require('./atlas_uri');

const dbname = 'bank';
const collectionName = 'accounts';
const client = new MongoClient(uri);
const accountsCollection = client.db(dbname).collection(collectionName);


const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log('successful connection 🌍')
    } catch (error) {
        console.log(`Error connecting in the database ${error}`)
    }
}

const documentsToDelete = { balance: { $lt: 500 } };

const main = async () => {
    try {
        await connectToDatabase()
        let result = await accountsCollection.deleteMany(documentsToDelete);
        result.deletedCount > 0 
         ? console.log(`deleted ${ result.deletedCount } documents`)
         : console.log('no documents deleted')

    } catch (error) {
        console.log(`Error deleting documents ${error}`)
    } finally {
        await client.close()
    }
}

main();