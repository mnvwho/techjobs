import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  ath: './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`)
  })
})
.catch(() => {
    console.log("MongoDB Connection Failed !!",  err)
})