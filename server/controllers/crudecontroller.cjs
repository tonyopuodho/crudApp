const { getDetails, deleteUser, getuserById, insertUser, searchUser, editUser } = require("../database")

exports.showusers = async (request,response) => {
    const results = await getDetails()
    response.status(200).json(results)
}

exports.showuserbyId = async (request,response) => {
    const { id } = request.params
    const parseid = parseInt(id);
    if (isNaN(parseid)) {
        return response.status(400).send({message:"Invalid request"})
    }
    const result = await getuserById(parseid)
    response.status(200).json(result)
}

exports.createuser =  async (request,response) => {
    const {firstName, lastName,email,phone} = request.body
    const newuser = await insertUser(firstName,lastName,email,phone)
    if (newuser) {
        response.status(201).json([{message:"User added successfully"}])
    } else{
        response.status(400).json([{message:"An error occured try again later"}])
    }

    return newuser
}

exports.searchuser = async (request,response) => {
    const {firstName,lastName,email,phone} = request.body
    const user = await searchUser(firstName,lastName,email,phone)
    return response.status(201).json(user)
}

exports.deleteuser = async (request,response) => {
    const { id } = request.params
    const parseId = parseInt(id)
    
    if (isNaN(parseId)) 
        return response.status(400).json([{message:"invalid request"}])

    const result = await deleteUser(parseId)

    if (result) 
        return response.status(201).json([{message:"user deleted successfully"}])
}

exports.edituser = async (request,response) => {
    const {firstName,lastName,email,phone,id} = request.body
    const updates = await editUser(firstName,lastName,email,phone,id)
    if (updates) {
        response.status(200).json([{message:"User updated successfully"}])
    } else {
        response.status(400).json([{message:"An error occured"}])
    }
}