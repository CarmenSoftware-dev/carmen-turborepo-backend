
export class microReportsConfig {

    host: string;
    port: number;
  
    constructor() {
      this.host = process.env.REPORTS_SERVICE_HOST ?? '0.0.0.0';
      this.port = this.getPort();
    }
  
    getPort() : number {
     if(process.env.REPORTS_SERVICE_PORT){
       return parseInt(process.env.REPORTS_SERVICE_PORT, 5004);
     }else{
       return 5004;
     }
   }
  }