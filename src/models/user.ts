import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document{
    email: string;
    password: string;
    comparePassword: () => Promise<boolean>
}

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    }
});

userSchema.pre<IUser>('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next()
    //si el usuario es nuevo:
    const salt = await bcrypt.genSalt(10); //string para cifrar
    const hash = await bcrypt.hash(user.password, salt); //dato cifrado
    user.password = hash;
    next();
});

//comparar contraseñas:
userSchema.methods.comparePassword = async function (password: string): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);