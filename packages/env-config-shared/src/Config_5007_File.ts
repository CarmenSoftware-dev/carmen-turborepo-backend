
export class microFileConfig {

    host: string;
    port: number;
  
    constructor() {
      this.host = process.env.FILE_SERVICE_HOST ?? '0.0.0.0';
      this.port = this.getPort();
    }
  
    getPort() : number {
     if(process.env.FILE_SERVICE_PORT){
       return parseInt(process.env.FILE_SERVICE_PORT, 5007);
     }else{
       return 5007;
     }
   }
  }