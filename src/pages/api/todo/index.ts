import { NextApiHandler } from "next";
import prisma from "@/libs/prisma";
import api from "@/libs/api";

const handlerGet:NextApiHandler = async (req,res)=>{
    const {userId} = req.query

    const todos = await api.getTodoByUserId(parseInt(userId as string))

    res.json({status:true, todos})
}

const handlerPost:NextApiHandler = async (req,res)=>{
    const {title, userId} = req.body

    const newTodo = await prisma.todo.create({
        data:{
            title,
            userId: parseInt(userId)
        }
    })

    if(newTodo){
        res.json({status:true, newTodo})
        return
    }

    res.json({error: 'Não foi possível adicionar'})
}


const Handler: NextApiHandler = async (req,res) =>{
    switch(req.method){
        case "GET":
            handlerGet(req,res);
            break;
        case "POST":
            handlerPost(req,res);
            break;
    }
}

export default Handler