import express from "express";
import {
    submitClaim,
    getClaimsForFinder,
    approveClaim,
    rejectClaim,
    getClaimsForItem, // make sure it's imported
} from "../controllers/claim.controller.js";

const router = express.Router();

router.post("/submit", submitClaim);
router.get("/finder/:email", getClaimsForFinder);
router.get("/item/:itemId", getClaimsForItem); // 🔥 NEW ROUTE
router.post("/approve/:claimId", approveClaim);
router.post("/reject/:claimId", rejectClaim);

export default router;
