export class Logger {
  static step(message: string): void {
    console.log(`[STEP] ${message}`);
  }

  static info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  static error(message: string, error?: unknown): void {
    console.error(`[ERROR] ${message}`);

    if (error instanceof Error) {
      console.error(error.message);
      console.error(error.stack);
    }
  }
}
