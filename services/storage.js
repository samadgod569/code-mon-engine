// services/storage.js
export class StorageService{
 set(k,v){ localStorage.setItem(k,JSON.stringify(v)); }
 get(k){ return JSON.parse(localStorage.getItem(k)); }
}
