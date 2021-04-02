import Mongoose from "mongoose";

// cria o schema: definição do documento MongoDB
const userSchema = new Mongoose.Schema({
        firstName: String,
        lastName: String,
        email: {
            type: String,
            required: [true, "E-mail é obrigatório"], // required: [true, msg] => definie como obrigatório com msg de erro
            unique: true, // unique: true => define como chave única, não vai poder repetir e-mail para outro usuário
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'E-mail inválido'] // match: [regex, msg] => define uma validação contra um expressão regular com msg de erro
        },
        userName: {
            type: String,
            required: [true, "informar um nome de usuário"]
        },
        password: {
            type: String,
            required: [true, "informar uma senha"]
        }
    }, {
        timestamps: { createdAt: true, updatedAt: true },
        toJSON: {
            virtuals: true,
            transform(doc, ret) {
                ret.id = doc._id,
                delete ret._id
            }
        },
        optimisticConcurrency: true
    }
);

userSchema.virtual("fullName").get(function() {
    return this.firstName + " " + this.lastName;
});

export default Mongoose.model("User", userSchema);