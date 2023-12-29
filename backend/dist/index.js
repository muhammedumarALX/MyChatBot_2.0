import app from "./app.js";
import connectToDatabase from "./db/connection.js";
const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log('serve is runnng and connected to mongoDB');
    });
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map