
export class microAuthenConfig {

    host: string;
    port: number;

    constructor() {
      this.host = process.env.AUTH_SERVICE_HOST ?? '0.0.0.0';
      this.port = this.getPort();
    }

    getPort(): number {
      return parseInt(process.env.AUTH_SERVICE_PORT ?? '5001', 10);
    }
  }
