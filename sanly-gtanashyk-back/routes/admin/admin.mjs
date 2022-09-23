import express from "express";
import { loginRouter } from "./auth/login.mjs";
import { addLogs } from "./logs/add-logs.mjs";
import { getAllLogs } from "./logs/get-all-logs.mjs";
import { sendSms } from "./logs/send-sms.mjs";
import { smsResultRouter } from "./logs/sms-result.mjs";
import { getFields } from "./other/get-fields.mjs";
import { addReason } from "./reason/add-reason.mjs";
import { getReason } from "./reason/get-reason.mjs";
import { getSms } from "./sms/get-sms.mjs";
import { updateSms } from "./sms/update-sms.mjs";
import { getAllStudentsRouter } from "./student/get-all-students.mjs";
import { syncAllStudents } from "./student/sync-all-students.mjs";

const adminRouter = express.Router();

adminRouter.use('/sync-all-students', syncAllStudents);
adminRouter.use('/sign-in', loginRouter);
adminRouter.use('/get-all-students', getAllStudentsRouter);
adminRouter.use('/get-all-logs', getAllLogs);
adminRouter.use('/send-sms', sendSms);
adminRouter.use('/get-sms', getSms);
adminRouter.use('/update-sms', updateSms);
adminRouter.use('/get-fields', getFields);
adminRouter.use('/add-logs', addLogs);
adminRouter.use('/get-reason', getReason);
adminRouter.use('/add-reason', addReason);
adminRouter.use('/sms-result', smsResultRouter);

export { adminRouter };