// services/logger.js
export class Logger{
 static info(m){ console.log("[INFO]",m); }
 static warn(m){ console.warn("[WARN]",m); }
 static error(m){ console.error("[ERROR]",m); }
}
