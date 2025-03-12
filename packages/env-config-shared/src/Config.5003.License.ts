
export class microLicenseConfig {

    host: string;
    port: number;

    constructor() {
      this.host = process.env.LICENSE_SERVICE_HOST ?? '0.0.0.0';
      this.port = this.getPort();
    }

    getPort() : number {
     if(process.env.LICENSE_SERVICE_PORT){
       return parseInt(process.env.LICENSE_SERVICE_PORT, 5003);
     }else{
       return 5003;
     }
   }
  }