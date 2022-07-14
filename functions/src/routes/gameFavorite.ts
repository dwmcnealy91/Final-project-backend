import express from "express";
import { getClient } from "../db";
// import { ObjectId } from 'mongodb';
//import ShoutOut from '../models/shoutout';

const routes = express.Router();

routes.get("/gamefavorite", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection("gamefavorite")
      .find()
      .toArray();
    res.json(results); // send JSON results
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default routes;
