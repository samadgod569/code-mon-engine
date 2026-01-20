// services/net.js
export class NetworkService{
 constructor(url){
  this.ws=new WebSocket(url);
 }
 send(data){ this.ws.send(JSON.stringify(data)); }
}
