import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'

import uiRoute from "./ui/ui.route"
import pageRoute from "./page/page.route";
import assetRoute from "./assets/assets.route";
import projectRoute from "./project/project.route";
import renderHtml from "./render/render.controller";

const app = express();
app.use(express.json());

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    },
};

corsOptions.credentials = true;
app.use(cors(corsOptions));

app.use("/resources", express.static(path.join(__dirname, "public")))
app.use("views", express.static(path.join(__dirname, "views")))
app.set("view engine", "hbs")

const mongoUri = 'mongodb+srv://qwerty:qwerty11@cluster0.k3v8o.mongodb.net/webpage_builder?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
/*    useCreateIndex: true,*/
/*    useFindModify: false,*/
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if(err) throw err;
    console.log('Connected to Mongo')
})

app.use('/api/projects', projectRoute);
app.use('/api/pages', pageRoute); // <-- здесь будет метод для img
app.use('/api/assets', assetRoute);
app.use('/api/', uiRoute);
app.get('/:pageId?', renderHtml);

const PORT = process.env.PORT || 8080
app.listen(PORT,() => {
    console.log(`Server working on ${PORT}`)
})