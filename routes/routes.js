import express from "express";
const router = express.Router();

import getTopClients from "../controllers/getTopClients.js";
import createAgencyAndClient from "../controllers/createAgencyAndClient.js";
import updateClient from "../controllers/updateClient.js";
import getAccessToken from "../controllers/getAccessToken.js";
import verifyToken from "../middlewares/verifyToken.js";

router.get("/top-clients", verifyToken, getTopClients);
router.post("/get-token", getAccessToken);
router.post("/client-agency", verifyToken, createAgencyAndClient);
router.patch("/clients/:clientId", verifyToken, updateClient);

export default router;
