import mysql from "mysql2/promise";
import { dbConfig } from "../config/config"

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const getCharacter = async () => {
  const [rows] = await pool.query("select * from characters");
  return rows;
};

export const newVoice = async ({ id, voice }) => {
  const result = await pool.execute(
    "update characters SET `voice`= ? where `id` = ?",
    [voice, id])
  const [rows] = await pool.query("select * from characters where `id`=?", [id]);
  return rows[0];
}