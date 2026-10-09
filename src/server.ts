import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorlogger, logger } from "./shared/logger";

dotenv.config();

const uri =
  process.env.MONGODB_URI ||
  `mongodb://reuse:1nDZJP4BP3NlMi1g@cluster0-shard-00-00.bnqcs.mongodb.net:27017,cluster0-shard-00-01.bnqcs.mongodb.net:27017,cluster0-shard-00-02.bnqcs.mongodb.net:27017/reuse_db?ssl=true&replicaSet=atlas-vi1kvm-shard-0&authSource=admin&appName=Cluster0`;

// ─── Serverless connection cache ────────────────────────────────────────────
// In serverless environments (Vercel), each invocation may reuse the same
// Node.js process (warm start) or spin up a new one (cold start).
// We cache the connection promise globally so warm invocations reuse the
// existing connection instead of opening a new one every request.
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}

// ─── In serverless environments, process.exit() kills the function container ─
process.on("unhandledRejection", (reason: any) => {
  errorlogger.error(
    reason instanceof Error ? reason.stack || reason.message : String(reason)
  );
  if (!process.env.VERCEL) {
    process.exit(1);
  }
});

process.on("uncaughtException", (error: Error) => {
  errorlogger.error(error.stack || error.message);
  if (!process.env.VERCEL) {
    process.exit(1);
  }
});

async function connectDB(): Promise<void> {
  mongoose.set("strictQuery", false);

  // If we already have a live connection, reuse it (warm invocation)
  if (global._mongooseCache.conn) {
    return;
  }

  // If a connection is already in progress, wait for it
  if (!global._mongooseCache.promise) {
    global._mongooseCache.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 10000, // 10s timeout
        socketTimeoutMS: 45000,
        bufferCommands: false, // Fail immediately if not connected — no silent buffering
      })
      .then((m) => {
        const nowDateTime: any = new Date();
        const time = nowDateTime.toLocaleTimeString();
        const date = nowDateTime.toLocaleString("en-us", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        console.log(
          "\x1b[36m%s\x1b[0m",
          "[FC]",
          time,
          ":",
          date,
          ": Database is connected Successfully"
        );
        logger.info(`Database connected at ${date}, ${time}`);
        return m;
      })
      .catch((err: Error) => {
        // Reset cache on failure so next request retries
        global._mongooseCache.promise = null;
        console.error(`Error connecting to MongoDB: ${err.message}`);
        errorlogger.error(err.message);
        throw err;
      });
  }

  global._mongooseCache.conn = await global._mongooseCache.promise;
}

export default connectDB;
