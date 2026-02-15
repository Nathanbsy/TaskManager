import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "EU",
    password: "S4r!nh4",
    database: "dbBiblioteca",
    insecureAuth: true
});