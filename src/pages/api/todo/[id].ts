import { NextApiHandler } from "next";
import prisma from "@/libs/prisma";

const handlerGet:NextApiHandler = async(req,res) =>{

    return
}

const handlerPut:NextApiHandler = async(req,res) =>{
    const {id} = req.query
    const {done} = req.body  
    
    
    if(id && done){
        const updatedTodo = await prisma.todo.update({
            where:{
                id: parseInt(id as string)
            },
            data:{
                done: done === 'false' ? true : false
            }
    })
        .catch((e)=>{
        res.json({error: e})
    })
        res.json({status:true, updatedTodo})
        return
    }
    
    res.json({status:false})

}

const handlerDelete:NextApiHandler = async(req,res) =>{
    const {id} = req.query

    if(id){
        await prisma.todo.delete({where:{id: parseInt(id as string)}})
        .catch((e)=>{
            res.json({error: e})
            return
        })
        res.json({status:true})
        return
    }

    res.json({status:false})
}


const Handler: NextApiHandler = async (req,res) =>{
    switch(req.method){
        case "GET":
            handlerGet(req,res);
            break;
        case "PUT":
            handlerPut(req,res);
            break;
        case "DELETE":
            handlerDelete(req,res);
            break;
    }
}

export default Handler