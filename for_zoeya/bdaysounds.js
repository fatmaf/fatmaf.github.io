var synth = window.speechSynthesis;
var document_body = document.getElementById('bdaytext');
/*var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');
var Hvar = document.querySelector('#H');
*/
var voices = [];
var strcount = -1;
function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
 /* var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;*/
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

//function speak(){
/*    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);*/
//  }
//}
/*function create_char_element(chartext)
{
    var node = document.createElement('H1');
    var nodeText= document.createTextNode(chartext);
    
    node.appendChild(nodeText);
    node.addEventListener('click', function(){
    speak_text(chartext);
    });
    document.getElementById("bdaytext").appendChild(node);​
    }*/

function just_speak(inputtext)
{
       if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputtext !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputtext);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
	//var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
	var selectedOption = 'en-GB';
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].lang === selectedOption) {
        utterThis.voice = voices[i];
      }
     }
    //utterThis.voice = 
	utterThis.pitch =1;// pitch.value;
	utterThis.rate = 1;//rate.value;
	synth.speak(utterThis);
	console.log('Saying '+inputtext);

    }
}

    function speak_text(inputtext,elemid){
	just_speak(inputtext);
 	document.getElementById(elemid).setAttribute("style","color:red");
	
  
}

function speak_text_last(inputtext,elemid,alltext){
    just_speak(inputtext);
    document.getElementById(elemid).setAttribute("style","color:red");
    while(synth.speaking);
    just_speak(alltext);
	
  
}

function create_text_elem(a,idnum){
    var node = document.createElement("span");
    var id = "text"+a+idnum;
    node.setAttribute("id",id);
    var textnode = document.createTextNode(a);
    if(a!=' '){
	node.addEventListener('click', function(){
	    
	speak_text(a,id);
    });}
    
    node.appendChild(textnode); 
    document.getElementById("bdaytext").appendChild(node);
}
function anotherFunction(a,idnum,islast,text){
    var node = document.createElement("span");
    var id = "text"+a+idnum;
    node.setAttribute("id",id);
    var textnode = document.createTextNode(a);
    if(a!=' '){
	node.addEventListener('click', function(){
	    if(islast){
		speak_text_last(a,id,text);
	    }
	    else
	speak_text(a,id);
    });}
    
    node.appendChild(textnode); 
    document.getElementById("bdaytext").appendChild(node);
}
function meh(a)
{
var node = document.createElement("H2");
    var textnode = document.createTextNode(a); 
    
    
    node.appendChild(textnode); 
    document.body.append(node);
}
function addImage(img_url,id,tosay) {
    var x = document.createElement("IMG");
    x.setAttribute("id",id);
  x.setAttribute("src", img_url);
  //x.setAttribute("width", "304");
  x.setAttribute("height", "100em");
    x.setAttribute("alt", " ");
    x.addEventListener('click',function(){
	just_speak(tosay); });
	
  document.getElementById("bdaytext").appendChild(x);
}
function display_text(text,img_url,tosay){
    strcount++;
    for(var i=0; i<text.length; i++){
	var isLast = (i==(text.length-1));

	create_text_elem(text[i]+" ",strcount+""+i);
    
    //}
    }
    if (img_url !=""){
	addImage(img_url,strcount+""+text.length,tosay);}
    var node = document.createElement("BR");
    document.getElementById("bdaytext").appendChild(node);

}
function display_text_say(text,say){
    strcount++;
    for(var i=0; i<text.length; i++){
	var isLast = (i==(text.length-1));

	anotherFunction(text[i]+" ",strcount+""+i,isLast,say);
    
    //}
    }
    var node = document.createElement("BR");
    document.getElementById("bdaytext").appendChild(node);

}
var hpsay = "img/sky.jpg";//"https://drive.google.com/uc?export=view&id=1qZfFj7LjKU4ilYYhpSW0zLvlS4A_p_BV";
var zoe= "img/z.jpg";//"https://drive.google.com/uc?export=view&id=17ANGLkM-uz1acpSBohV3YYZHkF-A3VQU";//https://drive.google.com/open?id=17ANGLkM-uz1acpSBohV3YYZHkF-A3VQU
var me="img/m.jpg";//"https://drive.google.com/uc?export=view&id=1PZXUmj15-Fz_MW3-eu4mM8x5cYRwCgQ0";//https://drive.google.com/open?id=1PZXUmj15-Fz_MW3-eu4mM8x5cYRwCgQ0//https://drive.google.com/open?id=17ANGLkM-uz1acpSBohV3YYZHkF-A3VQU
var text_to_say = 'birth day';
var text_to_display='HAPPY'; 
var text_to_display2='BIRTHDAY';
var text_to_display3= 'ZOEYA';
display_text(text_to_display,"","happy!");
display_text(text_to_display2,hpsay,"happy birth day!!");
display_text(text_to_display3,zoe,"zo ya");
display_text('LOVE,',"","");
display_text('PHUPPO',me,"love, pooh po");
//speak_text('Hi');
/*inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}

voiceSelect.onchange = function(){
  speak();
}
*/
function myFunction() {
    //document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
    speak_text("You clicked me");
}
