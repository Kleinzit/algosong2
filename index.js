
/**
 * @name algosong2
 */


var bpm = 120;
var bar = bpm / 60;


export function dsp(t) {
  
  var freq = 220;
  var freq2 = 880;
  var decay = 20;
  var seq = [880,770,660,880,880,880,880,880,0];
  var measures = [2,2,2,2,2,2];
  
  var bass_sq = [110,130,110,130,100,100];
  var bass_ms = [1/2,1/3,1/3,1/3,1/2];
  
  return 1* (
    0.1 * sqw(freq+sqw(freq*2,t)+0.1*sqw(freq*1.5,t),t)*env(1/8,t,decay)
    + 0.2 * drum(1/4,120,10,1,t)
    + 0.2 * drum(1/1.6,120,10,1,t)
    + 0.1 * tri(sequence(seq,measures,t,6)+2*sqw(3,t),t)*env(2/1,t,1)
    + 0.1 * tri(sequence(seq,measures,t,6)/2,t)*env(2/1,t,1)
    + 0.1 * tri(sequence(bass_sq,bass_ms,t,1),t)
    );
  
}
 

function env(measure,t,decay){
  var t_bar = t % bar % measure;
  return Math.exp(-t_bar*decay);
}

function env2(measure,t,decay){
  var t_bar = t % bar;
  
  return Math.abs(-t_abs*decay);
}

function sin(freq,t){
  return Math.sin(2 * Math.PI * t * freq);
}

function sqw(freq,t){
  return sin(freq,t) >0 ? 1:0;
}
function saw(freq,t){
  return (t % (1/freq));
}
function tri(x, t) {
  return Math.abs(1 - (2 * t * x) % 2) * 2 - 1;
}

function drum(measure, x, y, z, t){
  var ts = t / 2 % measure;
  return Math.sin(x * (Math.exp(-ts * y))) * Math.exp(-ts * z);
}

function sequence(seq,measures,t,bars){
  var t_bar = t % (bar * bars);
  var sum = 0;
  for (var i = 0;i<measures.length;i++)
  {
    sum +=measures[i];
    if(t_bar <= sum)
      return seq[i];
  }
  return 0;
}