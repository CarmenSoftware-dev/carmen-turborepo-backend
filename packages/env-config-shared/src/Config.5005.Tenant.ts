

export class microTenantConfig {

    host: string;
    port: number;
  
    constructor() {
      this.host = process.env.TENANT_SERVICE_HOST ?? '0.0.0.0';
      this.port = this.getPort();
    }
  
    getPort() : number {
     if(process.env.TENANT_SERVICE_PORT){
       return parseInt(process.env.TENANT_SERVICE_PORT, 5005);
     }else{
       return 5005;
     }
   }
  }