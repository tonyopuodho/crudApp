import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({

    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
    
}).promise()

export async function getDetails() {
    const [result] = await pool.query("SELECT * FROM crud")
    return result;
}

export async function getuserById(id) {
    const [userId] = await pool.query("SELECT * FROM crud WHERE id = ?",[id])
    return userId;
}

export async function insertUser(firstName,lastName,email,phone) {
    const newuser = await pool.query("INSERT INTO crud(firstName,lastName,email,phone) VALUES(?,?,?,?)",[firstName,lastName,email,phone])
    return newuser
}

export async function searchUser(firstName,lastName,email,phone) {
    const [searchedUser] = await pool.query("SELECT * FROM crud WHERE firstName = ? OR lastName = ? OR email = ? OR phone = ?",[firstName,lastName,email,phone])
    return searchedUser
}

export async function deleteUser(id) {
    const user = await pool.query("DELETE FROM crud WHERE id = ?",[id])
    return user
}

export async function editUser(firstName,lastName,email,phone,id) {
    const newuser = await pool.query("UPDATE crud SET firstName = ?,lastName = ?, email = ?, phone = ? WHERE id = ?",[firstName,lastName,email,phone,id])
    return newuser
}