import app from "./app"
import config from "./app/config"
import mongoose from "mongoose"
async function main() {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.znucezt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    app.listen(config.port, () => {
      console.log("app listning on port", config.port)
    })
  } catch (err) {
    console.log(err)
  }
}

main()

