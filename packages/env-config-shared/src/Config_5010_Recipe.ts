
export class microRecipeConfig {

    host: string;
    port: number;
  
    constructor() {
      this.host = process.env.RECIPE_SERVICE_HOST ?? '0.0.0.0';
      this.port = this.getPort();
    }
  
    getPort() : number {
     if(process.env.RECIPE_SERVICE_PORT){
       return parseInt(process.env.RECIPE_SERVICE_PORT, 5010);
     }else{
       return 5010;
     }
   }
  }