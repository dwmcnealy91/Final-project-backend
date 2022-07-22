import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import { Result } from "../GameFavorite";
// import { ObjectId } from 'mongodb';
//import ShoutOut from '../models/shoutout';

const routes = express.Router();

routes.get("/wishlist", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client.db().collection("gamelist").find().toArray();
    res.json(results); // send JSON results
  } catch (err) {
    console.error("FAIL", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

routes.post("/wishlist", async (req, res) => {
  const game = req.body as Result;
  try {
    const client = await getClient();
    await client.db().collection<Result>("gamelist").insertOne(game);
    res.status(201).json(game);
  } catch (err) {
    console.error(err);
  }
});

routes.delete("/wishlist/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Result>("gamelist")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.error(err);
  }
});

export default routes;
