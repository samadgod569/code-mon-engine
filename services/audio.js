// services/audio.js
export class AudioService{
 constructor(){
  this.ctx=new (window.AudioContext||window.webkitAudioContext)();
  this.buffers=new Map();
  this.master=1;
  this.musicVol=1;
  this.sfxVol=1;
 }

 async load(key,url){
  const res=await fetch(url);
  const buf=await res.arrayBuffer();
  const audio=await this.ctx.decodeAudioData(buf);
  this.buffers.set(key,audio);
 }

 play(key,{loop=false,volume=1,spatial=false,pos=null}={}){
  const buf=this.buffers.get(key);
  if(!buf) return;

  const src=this.ctx.createBufferSource();
  src.buffer=buf;
  src.loop=loop;

  const gain=this.ctx.createGain();
  gain.gain.value=volume*this.master;

  src.connect(gain);
  gain.connect(this.ctx.destination);

  src.start();
  return src;
 }

 setMaster(v){ this.master=v; }
 setMusic(v){ this.musicVol=v; }
 setSfx(v){ this.sfxVol=v; }

 stopAll(){ this.ctx.close(); }
}
