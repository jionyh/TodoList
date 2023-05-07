import prisma from "./prisma"

export default {

    getTodoByUserId: async(userId:number)=>{

        const todos = await prisma.todo.findMany({
            where:{
                userId
            },
            select:{
                id: true,
                title: true,
                done: true
            },
            orderBy:{
                createdAt: 'asc'
            }
        })

        return todos
    },

    getUserEmail: async(email:string)=>{
        return await prisma.user.findFirst({where:{email}})
    }

}