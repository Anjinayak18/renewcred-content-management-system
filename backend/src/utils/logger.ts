type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

class Logger {
  private format(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();

    return `[${timestamp}] [${level}] ${message}`;
  }

  info(message: string, ...meta: unknown[]): void {
    console.log(this.format("INFO", message), ...meta);
  }

  warn(message: string, ...meta: unknown[]): void {
    console.warn(this.format("WARN", message), ...meta);
  }

  error(message: string, ...meta: unknown[]): void {
    console.error(this.format("ERROR", message), ...meta);
  }

  debug(message: string, ...meta: unknown[]): void {
    if (process.env.NODE_ENV !== "production") {
      console.debug(this.format("DEBUG", message), ...meta);
    }
  }
}

export const logger = new Logger();
export default logger;