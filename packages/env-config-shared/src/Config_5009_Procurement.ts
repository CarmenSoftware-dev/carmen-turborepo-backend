
export class microProcurementConfig {

    host: string;
    port: number;
  
    constructor() {
      this.host = process.env.PROCUREMENT_SERVICE_HOST ?? '0.0.0.0';
      this.port = this.getPort();
    }
  
    getPort() : number {
     if(process.env.PROCUREMENT_SERVICE_PORT){
       return parseInt(process.env.PROCUREMENT_SERVICE_PORT, 5009);
     }else{
       return 5009;
     }
   }
  }