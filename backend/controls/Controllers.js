module.exports = class Controller {
    static home = (req, res) => {
        res.send("Hello Word")
    }

    static registerUser = (req, res) => {
        const name = req.body.name
        res.send("oin")
    }
}