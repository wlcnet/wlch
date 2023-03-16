const noticemsg="* 인터넷 연결 필요. 핸드폰 데이터 사용시 주의.";

const kbook_f = ['창세기','출애굽기','레위기','민수기','신명기','여호수아','사사기',
		 '룻기','사무엘상','사무엘하','열왕기상','열왕기하','역대상','역대하','에스라',
         '느헤미야','에스더','욥기','시편','잠언','전도서','아가','이사야','예레미야',
         '예레미야 애가','에스겔','다니엘','호세아','요엘','아모스','오바댜','요나',
         '미가','나훔','하박국','스바냐','학개','스가랴','말라기','마태복음','마가복음',
         '누가복음','요한복음','사도행전','로마서','고린도전서','고린도후서','갈라디아서',
         '에베소서','빌립보서','골로새서','데살로니가전서','데살로니가후서','디모데전서',
         '디모데후서','디도서','빌레몬서','히브리서','야고보서','베드로전서','베드로후서',
         '요한일서','요한이서','요한삼서','유다서','요한계시록'];

const ebook = ['Ge','Ex','Lev','Nu','Dt','Jos','Jdg','Ru','1Sa','2Sa','1Ki',
				'2Ki','1Ch','2Ch','Ezr','Ne','Est','Job','Ps','Pr','Ecc','SS',
				'Isa','Jer','La','Eze','Da','Hos','Joel','Am','Ob','Jnh','Mic',
				'Na','Hab','Zep','Hag','Zec','Mal','Mt','Mk','Lk','Jn','Ac',
				'Ro','1Co','2Co','Gal','Eph','Php','Col','1Th','2Th','1Ti',
				'2Ti','Tit','Phm','Heb','Jas','1Pe','2Pe','1Jn','2Jn','3Jn',
				'Jude','Rev'];

const bskbook = ['gen','exo','lev','num','deu','jos','jdg','rut','1sa','2sa',
				'1ki','2ki','1ch','2ch','ezr','neh','est','job','psa','pro',
				 'ecc','sng','isa','jer','lam','ezk','dan','hos','jol','amo',
				 'oba','jnh','mic','nam','hab','zep','hag','zec','mal',
				 'mat','mrk','luk','jhn','act','rom','1co','2co','gal','eph',
				 'php','col','1th','2th','1ti','2ti','tit','phm','heb','jas',
				 '1pe','2pe','1jn','2jn','3jn','jud','rev'];

const gtvbook = ['gene','exod','levi','numb','deut','josh','judg','ruth','sam1','sam2',
				'kin1','kin2','chr1','chr2','ezra','nehe','esth','jobb','psal','prov',
				 'eccl','song','isai','jere','lame','ezek','dani','hose','joel','amos',
				 'obad','jona','mica','nahu','haba','zeph','hagg','zech','mala',
				 'matt','mark','luke','john','acts','roma','cor1','cor2','gala','ephe',
				 'phil','colo','the1','the2','tim1','tim2','titu','phim','hebr','jame',
				 'pet1','pet2','joh1','joh2','joh3','jude','reve'];

const booklen = [50,40,27,36,34,24,21,4,31,24,22,25,29,36,10,13,10,42,150,
			   31,12,8,66,52,5,48,12,14,3,9,1,4,7,3,3,3,2,14,4,28,16,24,
			   21,28,16,16,13,6,6,4,4,5,3,6,4,3,1,13,5,5,3,5,1,1,1,22];

const newhymnUrl = "http://online.goodtv.co.kr/hymn/new/";
const bibleUrl = "http://online.goodtv.co.kr/online_bible/goodtvbible/"; 
const goodtvUrl = "http://online.goodtv.co.kr/online_bible/";
const wlcUrl = "http://wlc.hopto.org:10480/";
const playbuttons = ['bcont','bonce','oldhymn','newhymn','mixplay'];

var oldhymnUrl = "pub2/hymnmp3/";
var mixplayUrl = "pub2/BP";
//oldhymnUrl = wlcUrl + oldhymnUrl;
//mixplayUrl = wlcUrl + mixplayUrl;

let hymnver = "new";
let biblever;
let song = "1";
let hymnurl;
let hymnmax;
let hymnaudio;
let bibleaudio;
let mixaudio;
let bookidx;
let playchap;


function getvalue(elmId){
		return document.getElementById(elmId).value;		
		}

function setvalue(elmId,svalue){
		document.getElementById(elmId).value = svalue;
		}

function getHTML(elmId){
		return document.getElementById(elmId).innerHTML;		
		}	

function resetHTML(elmId){
	document.getElementById(elmId).innerHTML = "";
	}
		
function echoHTML(elmId,eHTML){
//	if (getHTML(elmId) != "" ){	resetHTML(elmId); }
	document.getElementById(elmId).insertAdjacentHTML('afterbegin', eHTML);
	}
		
function echoText(elmId,eText){
	document.getElementById(elmId).innerText = eText;
	}
	
function hymnplay() {

	song = getvalue('hymnnum');

	if ( song >= 1 && song <= hymnmax ) {
		playsrc('hymn',hymnurl+('00'+song).slice(-3)+'.mp3');
	} else {
		setvalue('hymnnum',"");
	}	
	}
	
function setaudio(elmId){
	//audio = document.getElementById(elmId);
	if ( elmId == "bible"){ bibleaudio = document.getElementById(elmId);}
	if ( elmId == "hymn"){ hymnaudio = document.getElementById(elmId);}
	if ( elmId == "bhmix"){ mixaudio = document.getElementById(elmId);}	
	}

function playsrc(elmId,source) {  // reset & first play
	var audio = document.getElementById(elmId);	
	if ( typeof audio !== "undefined" ) {	
//		audio.pause();
		audio.setAttribute('src', source);
		audio.load();
		audio.play();
		}
	}

function stopPlay(audioId){
	if ( typeof audioId !== "undefined" ) {	
		audioId.pause();
//		audioId.currentTime = 0; // loaded, but stopped.
		audioId.src = "";     // unloaded
		}	
}
	
function clearPlay(){
	echoText('bibleinfo','');
	stopPlay(bibleaudio);
	stopPlay(hymnaudio);
	stopPlay(mixaudio);
	}

function radiobutton(btn1,btn2){
	activebutton(btn1);
	resetbutton(btn2);
	}

function resetbutton(btn) {document.getElementById(btn).style.color = "black";}
function activebutton(btn) {document.getElementById(btn).style.color = "red";}

function onlybutton(btn) {  // active btn and reset others.
	for( i = 0; i < 5; i++) {	
		if ( playbuttons[i] == btn ) {
			activebutton(btn);
		} else {
			resetbutton(playbuttons[i]);
		}
	}
}

function playhymn(ver) {
	
	clearPlay();
	onlybutton("");	// reset all play buttons

	if (ver == 'new')	{ 
			hymnurl = newhymnUrl;
			hymnmax = 645;
			
//			radiobutton("newhymn","oldhymn");
			activebutton("newhymn");
			}
	if (ver == 'old')	{ 
			hymnurl = oldhymnUrl;
			hymnmax = 558;

//			radiobutton("oldhymn","newhymn");
			activebutton("oldhymn")
			}	
	}

// bible audio control
function biblenext(){

		if ( playchap == booklen[bookidx]) {
			bibleaudio.pause();
			let bibleinfotext = "[ "+kbook_f[bookidx]+" "+String(playchap)+" 끝]";
			echoText('bibleinfo',bibleinfotext);
		} else {
		    playchap = playchap + 1;
			
			bibleaudio.src = biblesrc(biblever,bookidx,playchap)+".mp3";
			bibleaudio.play();
		}

	} 

function biblestop(){bibleaudio.pause();}

// hyme audio control
function hymnext(){

        song = song%hymnmax + 1;
		setvalue('hymnnum',song);
		let hnum = ('00'+song).slice(-3);	
		hymnaudio.src = hymnurl+hnum+'.mp3';
		hymnaudio.play();
	} 

function repeatplay(){hymnaudio.play();}

function stop(){hymnaudio.pause();}

function dorepeat(mode){
		let repeat = mode.value;

		if (repeat == "3"){
		    hymnaudio.addEventListener('ended', hymnext);
		}
		if (repeat == "2"){
		    hymnaudio.addEventListener('ended', repeatplay);
		}
		if (repeat == "1"){
		    hymnaudio.addEventListener('ended', stop);
		}
}

function playbible4(ptype) {
//	var srchtml = '<p><audio id="bible" controls controlsList="nodownload" ><source type="audio/mp3"></source>오디오 재생이 지원되지 않습니다.</audio>';

	clearPlay();
	onlybutton("");	// reset all play buttons

//	echoHTML('setbible',srchtml);

//	setaudio('bible');
	if ( ptype === 'cont'){	
		bibleaudio.addEventListener('ended', biblenext);
		radiobutton("bcont","bonce");
	} else {
		bibleaudio.addEventListener('ended', biblestop);
		radiobutton("bonce","bcont");
	}

	bookidx = getvalue('book');

	playchap = Number(getvalue('chap'));
	
	playsrc("bible",biblesrc(biblever,bookidx,playchap)+".mp3");

	}

function biblesrc(ver,bookidx,playchap){
	if ( ver == "grv" ){ 
		var gtver = 'Revision/Drama/';

		if ( bookidx < 39){
			var age = 'old/';
			var bookdir = goodtvUrl+gtver+age+gtvbook[bookidx]+"/"+gtvbook[bookidx]+"_";
			var biblemp3 = bookdir+('00'+String(playchap)).slice(-3);
		} else { 
			var age = 'new/';
			var bookdir = goodtvUrl+gtver+age+gtvbook[bookidx]+"/"+gtvbook[bookidx]+"_";
			var biblemp3 = bookdir+('00'+String(playchap)).slice(-2);
		}
		}

	if ( ver == "hrv" ){ 
		var gtver = 'goodtvbible/Hangeul/';
		var bookdir = goodtvUrl+gtver+String(Number(bookidx)+1)+"/";
		var biblemp3 = bookdir+('00'+String(playchap)).slice(-3);		

		}	

	let bibleinfotext = " [ "+kbook_f[bookidx]+" "+String(playchap)+" ]";
	echoText('bibleinfo',bibleinfotext);

	return biblemp3
	}

function bibleset(ver){
	biblever = ver;
	if ( ver == "hrv") {
		radiobutton( "hrv","grv");
	} else {
		radiobutton( "grv","hrv");
		}
	clearPlay();
	onlybutton("");	// reset all play buttons
	}

function changechap(bookId,chapId){    // when book is changed
		var target = document.getElementById(chapId);		
		target.options.length = 0;

		for( i = 1; i <= booklen[bookId.value]; i++) {	
			var opt = document.createElement("option");
			opt.value = i;
			opt.innerHTML = i;
			target.appendChild(opt);
		}

		target[0].selected = true;
		clearPlay();
		onlybutton("");	// reset all play buttons
	}

function chapset(){
	clearPlay();
	onlybutton("");	// reset all play buttons
	}

function domixplay(){
	//location.reload()
	let playsel = getvalue('playlist');
//	let srchtml = '<audio id="bhmix" controls controlsList="nodownload" ><source type="audio/mp3"></source>오디오 재생이 지원되지 않습니다.</audio>'

	clearPlay();
	onlybutton("");	// reset all play buttons
	activebutton("mixplay");

//	echoHTML('setbhmix',srchtml);

//	setaudio('bhmix');
	playsrc("bhmix",mixplayUrl+playsel+".mp3");
	}
	
function mixplayset(){
	clearPlay();
	onlybutton("");	// reset all play buttons
	}
	
function bibleinit(){
	let _str = '';

	for( i = 0; i < 66; i++) {	
		_str += ' <option value='+i;
		if( i == 0) { _str += ' selected';}
		_str += '>'+kbook_f[i]+'</option>';	
		}
	
	echoHTML('book',_str);
				
	_str = '';

	let bookidx = 0

	for( i = 1; i <= booklen[bookidx]; i++) {	
		_str += ' <option value='+i;
		if( i == 1) { _str += ' selected';}
		_str += '>'+i+'</option>';	
		}
	echoHTML('chap',_str);
				
	_str = '';
	}

function bibletext() { window.location = "http://wlc.hopto.org:10480/bible.html"; }
	
