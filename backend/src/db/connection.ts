import {connect} from "mongoose"

async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error)
        throw new Error("Cannot connect to mongoDB")
    }
}

export default connectToDatabase;