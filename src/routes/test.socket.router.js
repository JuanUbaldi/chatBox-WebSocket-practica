import express from "express";
export const testSocketRouter = express.Router();

/* testSocketRouter.get("/", (req, res) => {
  res.status(200).json({
    msg: "hola para todoss",
  });
}); */

testSocketRouter.get("/", (req, res) => {
  res.status(200).render("test-socket", {});
});
