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

export const getChapter = async () => {
  const [rows] = await pool.query("select * from series");
  return rows;
};

export const getScript = async ({series}) => {
  const [rows] = await pool.query(
    "select * from scripts where `series`=? order by line", [series]);
  return rows;
};

export const newVoice = async ({ id, voice }) => {
  const result = await pool.execute(
    "update characters SET `voice`= ? where `id` = ?",
    [voice, id])
  const [rows] = await pool.query(
    "select * from characters where `id`=?", [id]);
  return rows[0];
}

export const updateSpeaker = async ({ series, line, speaker }) => {
  const result = await pool.execute(
    "update scripts SET `speaker`= ? where `series` = ? and `line` = ?",
    [speaker, series, line])
  const [rows] = await pool.query(
    "select * from scripts where `series` = ? and `line` = ?", [series, line]);
  return rows[0];
}