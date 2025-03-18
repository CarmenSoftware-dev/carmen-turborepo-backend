
export class microMasterConfig {

    host: string;
    port: number;
  
    constructor() {
      this.host = process.env.MASTER_SERVICE_HOST ?? '0.0.0.0';
      this.port = this.getPort();
    }
  
    getPort() : number {
     if(process.env.MASTER_SERVICE_PORT){
       return parseInt(process.env.MASTER_SERVICE_PORT, 5011);
     }else{
       return 5011;
     }
   }
  }