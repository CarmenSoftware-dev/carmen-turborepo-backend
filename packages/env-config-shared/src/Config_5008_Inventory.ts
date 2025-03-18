
export class microInventoryConfig {

    host: string;
    port: number;
  
    constructor() {
      this.host = process.env.INVENTORY_SERVICE_HOST ?? '0.0.0.0';
      this.port = this.getPort();
    }
  
    getPort() : number {
     if(process.env.INVENTORY_SERVICE_PORT){
       return parseInt(process.env.INVENTORY_SERVICE_PORT, 5008);
     }else{
       return 5008;
     }
   }
  }