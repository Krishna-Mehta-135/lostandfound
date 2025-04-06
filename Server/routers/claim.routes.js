import express from "express";
import {createClaim, getClaimsForItem, approveClaim, rejectClaim} from "../controllers/claim.controller.js";

const claimRouter = express.Router();

claimRouter.post("/submit", createClaim); // ✅ route is still /submit
claimRouter.get("/item/:itemId", getClaimsForItem);
claimRouter.post("/approve/:claimId", approveClaim);
claimRouter.post("/reject/:claimId", rejectClaim);

export default claimRouter;
