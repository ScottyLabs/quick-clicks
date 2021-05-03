const { wait } = require("@testing-library/dom");
const jwt = require("jsonwebtoken")
const User = require('../server/User');

module.exports = (app) => {
    
    app.post("/login", async function (req, res) {
        var { username, password } = req.body;
        
        try {
            const user = await User.findOne({username});

            if (user == null) {
                return res.status(404).json({"message": "user not found"})
            }
            
            if (!user.checkPassword(password)) {
                return res.status(403).json({"message": "incorrect password"})
            }

            return res.json(user);

        } catch (error) {
            console.log(error);
        }
    })
}





