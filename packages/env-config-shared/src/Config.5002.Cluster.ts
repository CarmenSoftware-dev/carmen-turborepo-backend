
export class microClusterConfig {

    host: string;
    port: number;
  
    constructor() {
      this.host = process.env.CLUSTER_SERVICE_HOST ?? '0.0.0.0';
      this.port = this.getPort();
    }
  
    getPort() : number {
     if(process.env.CLUSTER_SERVICE_PORT){
       return parseInt(process.env.CLUSTER_SERVICE_PORT, 5002);
     }else{
       return 5002;
     }
   }
  }