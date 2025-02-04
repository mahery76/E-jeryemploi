const { sq } = require("../../config/db")
const Users = require("../../models/User")


const insertUser = async () => {
    sq.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;")

    // delete all records before inserting
    await Users.destroy({ truncate: true, cascade: true })

    const usersdata = [
        ["jeanmark@yahoo.com",  "t1", "ens"],
        ["mikantorand@gmail.com",  "t2", "ens"],
        ["harimananakoto@yahoo.com",  "t3", "ens"],
        ["sedsonmickael@gmail.com",  "t4", "ens"],
        ["mihajaheritiana@gmail.com",  "t5", "ens"],
        ["lucrafali@gmail.com",  "t6", "ens"],
        ["eaninerand@yahoo.com",  "t7", "ens"], 
        ["razakasedra@yahoo.com",  "t8", "ens"], 
        ["sandramanitra@yahoo.com",  "t9", "ens"], 
        ["ravololonaravalo@gmail.com","t10", "ens"], 
    ]
    const insertOneUser = async (a, b, c) => {
        await Users.create({
            email_user: a,
            mdp_user: b,
            role_user: c,
        })
    }

    // usersdata.forEach(async (u) => {
    //     await insertOneUser(u[0], u[1], u[2])
    // })
    const insertionPromise = usersdata.map(async (u) => {
        await insertOneUser(u[0], u[1], u[2])
    })
    await Promise.all(insertionPromise) 

    console.log("user inserted")
}

module.exports = insertUser