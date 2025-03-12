
export class microNotificationConfig {

    host: string;
    port: number;
  
    constructor() {
      this.host = process.env.NOTIFICATION_SERVICE_HOST ?? '0.0.0.0';
      this.port = this.getPort();
    }
  
    getPort() : number {
     if(process.env.NOTIFICATION_SERVICE_PORT){
       return parseInt(process.env.NOTIFICATION_SERVICE_PORT, 5006);
     }else{
       return 5006;
     }
   }
  }