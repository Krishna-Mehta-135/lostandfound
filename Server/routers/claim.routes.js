import {Router} from "express";
import {createClaim, getClaimsForItem, approveClaim, rejectClaim} from "../controllers/claim.controller.js";
import {protect} from "../middlewares/auth.middleware.js";

const claimRouter = Router();

claimRouter.use(protect); // protect everything below

claimRouter.route("/create").post(createClaim); // create a claim
claimRouter.route("/:itemId").get(getClaimsForItem); //get all the claims submitted on a particular item
claimRouter.route("/approve/:claimId").post(approveClaim);
claimRouter.route("/reject/:claimId").post(rejectClaim);

export {claimRouter};