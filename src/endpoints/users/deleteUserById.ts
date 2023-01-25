import { Response, Request } from "express";
import { db } from "../../database/knex";

const deleteUserById =  async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if (id !== undefined) {

            if (id === ":id") {
                res.status(400)
                throw new Error("'id' do usuário não pode ser vazio.")
            }
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' do usuário deve ser string.")
            }
            if (id[0] != "u" || id[1] != "s" || id[2] != "e" || id[3] != "r") {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve iniciar com 'user'")
            }
            if (id.length < 5 || id.length > 10) {
                res.status(400)
                throw new Error("'id' do usuário inválido. Deve conter de 5 a 8 caracteres")
            }

        } else {
            res.status(400)
            throw new Error("'id' do usuário deve ser informado.")
        }


        const [userInPurchase] = await db.raw(`SELECT *
        FROM purchases
        WHERE buyer = "${id}";`)


        if (userInPurchase) {
            res.status(422)
            throw new Error(" 'id' do usuário cadastrado em uma 'purchases'")
        }

        const [userIndex] = await db.raw(`SELECT *
        FROM users
        WHERE id = "${id}";`)

        if (userIndex) {
            await db.raw(`DELETE FROM users 
        WHERE id = "${id}";`)

            res.status(200).send("Usuário apagado com sucesso")
        } else {
            res.send("User não encontrado")
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

}

export default deleteUserById