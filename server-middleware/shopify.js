const fs = require("fs")
const bodyParser = require("body-parser")
const app = require("express")()

const modalJs = fs.readFileSync("static/modal/rdwv.js", "utf8")
const shopifyJs = fs.readFileSync("static/shopify/rdwv-shopify.js", "utf8")
const apiURL = process.env.RDWV_ADMIN_API_URL || "http://localhost:8000"
const rootPath = process.env.RDWV_ADMIN_ROOTPATH || "/"
const finalJs = modalJs + "\n" + shopifyJs

app.use(bodyParser.json())
app.all("/:storeId/integrations/shopify/shopify.js", (req, res) => {
  res.contentType("application/javascript")
  res.send(
    `var RDWV_API_URL = "${apiURL}"\nvar RDWV_ADMIN_URL = new URL(document.currentScript.src).origin+"${rootPath}"\nvar STORE_ID = "${req.params.storeId}"\n${finalJs}`
  )
})

module.exports = app
