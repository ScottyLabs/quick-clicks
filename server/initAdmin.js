const User = require("./User");

module.exports = async () => {
    const adminUsername = process.env["ADMIN_USERNAME"];
    const adminPassword = process.env["ADMIN_PASSWORD"];

    try {
        const user = await User.find({adminUsername});
        console.log(user);

        if (user.length == 0) {

            var storePassword = User.generateHash(adminPassword);
            const user = new User({username: adminUsername, password: storePassword});

            try {
                await user.save();

                console.log("created admin account");

            } catch (err) {
                console.log("error saving admin user")
                console.log(err);
            }         
        }
        else {
            console.log("admin already exists; don't need to create");
        }
    } catch (error) {
        console.log("error looking up admin user on startup")
        console.log(error);
    }


}