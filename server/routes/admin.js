import express from "express";
const router = express.Router();
import {
  logindata,
  getcompany,
  getbuses,
  getalluser,
  getallbookings,
  getallcompany,
  newcoupen,
  allcoupen,
  deletecoupen,
  checkcoupen,
  newbanner,
  getallbanner,
  deletebanner,
  getweeklybooking,
} from "../helpers/admin/adminhelper.js";
import { protect } from "../helpers/admin/authadmin.js";

router.post("/login", logindata);

router.get("/getallcompany", protect, getcompany);

router.get("/getbuses/:id", protect, getbuses);

router.get("/getalluser", protect, getalluser);

router.get("/viewbookings/:id", protect, getallbookings);

router.get("/getsalesreport", protect,getallcompany);

router.post("/newcoupen", newcoupen);

router.get("/getallcoupen", protect, allcoupen);

router.post("/deletecoupen/:id", deletecoupen);

router.post("/checkcoupen", checkcoupen);

router.post("/newbanner", newbanner);

router.get("/getallbanner", protect , getallbanner);

router.post("/deletebanner/:id", deletebanner);

router.get("/getweeklybooking", getweeklybooking);

export default router;
