import { config } from "dotenv";

config();

const cookie = process.env.COOKIE!;
const maxFails = parseInt(process.env.MAX_FAILS!);
const outputPath = process.env.OUTPUT_PATH!;

export default {
    cookie,
    maxFails,
    outputPath
}