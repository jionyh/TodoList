import { NextApiHandler } from "next";
import bcrypt from 'bcrypt'
import prisma from "@/libs/prisma";

const Handler : NextApiHandler = async (req,res)=>{
    if(req.method === 'POST'){
        const {name, email,password} = req.body
        const passwordHash = await bcrypt.hash(password,10)
        const hasEmail = await prisma.user.findFirst({where:{email}})

        if(hasEmail){
            res.json({status:false, error: 'Email já cadastrado'})
            return
        }

        if(name && email && password){
            const newUser = await prisma.user.create({
                data:{
                    name,
                    email,
                    passwordHash,
                    token: passwordHash
                }
            })
            if(newUser){
                res.json({status:true,newUser})
                return
            }
        }
        res.json({status:false,error:"Não foi possivel adicionar o usuario"})
        
    }

}

export default Handler;