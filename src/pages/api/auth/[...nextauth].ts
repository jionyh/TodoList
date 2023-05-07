import api from "@/libs/api";
import { User } from "@/types/user";
import NextAuth,{NextAuthOptions} from "next-auth";
import bcrypt from 'bcrypt'

import CredentialsProvider from 'next-auth/providers/credentials'



export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers:[
        CredentialsProvider({
            id: 'credentials',
            credentials:{
                email: { label: 'email', type: 'text' },
                password:{label: "password", type: "password"}
            },
        async authorize(credentials,req){
            if(credentials && credentials.email && credentials.password){
                const user = await api.getUserEmail(credentials.email)                      
                if(user){
                    let hash = await bcrypt.compare(credentials.password, user.passwordHash)
                    if(hash){
                        return {
                            id: user.id.toString(),
                            name: user.name,
                            email: user.email,
                            token: user.token,
                            passwordHash: user.passwordHash
                        }
                    }
                    return null
                }
            }
                return null
            }                       
        })
    ],
    callbacks:{
        jwt: async({token,user}) =>{
            if(user){
                token.user = user
            }
            return token
        },
        session: async({session, token})=>{
            if(token){
                session.user = token.user as User
            }
            return session
        }
    },
    pages:{
        signIn: '/login',
    }
}

export default NextAuth(authOptions)