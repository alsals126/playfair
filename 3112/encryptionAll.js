var keyword = ""
var plaintext = ""

function setValue()  { // 암호화에 쓰일 키, 암호화 할 문자열 가져오기
  localStorage.setItem('keyword', document.getElementById('keyword').value)
  localStorage.setItem('plaintext', document.getElementById('plaintext').value)
}

function encryption(){
  // 보드판
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var keyForSet = deduplication(localStorage.getItem('keyword').toUpperCase() + alphabet) //중복된 문자가 제거된 문자열을 저장할 변수
  const alphabetBoard = setBoard(keyForSet) 
  localStorage.setItem('board', alphabetBoard)

  // 키
  plaintext = localStorage.getItem('plaintext').replace(/ /g,"").toUpperCase() //공백제거 + 대문자로 치환
  plaintext = plaintext.replace(/Z/g, 'Q') //z를 q로 치환

  // 암호화에 필요한 변수들
  var playFair = new Array() //암호화 하기 전
  var encPlayFair = new Array() //암호화 후
  var x1=0, x2=0, y1=0, y2=0

  // 글이 반복되면 X 추가
  for(var i=0; i<plaintext.length; i+=2){
    var temArr = new Array(2)
    temArr[0] = plaintext.charAt(i)

    if(plaintext.charAt(i) == plaintext.charAt(i+1)) {
			temArr[1] = 'X'
			i = i-1
		}else {
			temArr[1] = plaintext.charAt(i+1)
		}
    if(temArr[1]==""){
      temArr[1] = 'X'
    }
		playFair.push(temArr)
  }
  localStorage.setItem('pairtext', playFair.join(' ').replace(/,/g,""))

  // 암호화
  for(var i = 0 ; i < playFair.length; i++ ) {
    var temArr = new Array(2)
    for( var j = 0 ; j < alphabetBoard.length ; j++ ) { //쌍자암호의 각각 위치체크
      for( var k = 0 ; k < alphabetBoard[j].length ; k++ ) {
        if(alphabetBoard[j][k] == playFair[i][0]) {
          x1 = j;
          y1 = k;
        }
        if(alphabetBoard[j][k] == playFair[i][1]) {
          x2 = j;
          y2 = k;
        }
      }
    }
    
    if(x1==x2) { //행이 같은경우
      temArr[0] = alphabetBoard[x1][(y1+1)%5];
      temArr[1] = alphabetBoard[x2][(y2+1)%5];
    }
    else if(y1==y2) {//열이 같은 경우
      temArr[0] = alphabetBoard[(x1+1)%5][y1];
      temArr[1] = alphabetBoard[(x2+1)%5][y2];
    } 
    else { //행, 열 모두 다른경우
      temArr[0] = alphabetBoard[x2][y1];
      temArr[1] = alphabetBoard[x1][y2];
    }
    
    encPlayFair.push(temArr)  
  }

  localStorage.setItem('encPlayText', encPlayFair.join(' ').replace(/,/g,""))

  var decry = decryption(localStorage.getItem('keyword').toUpperCase, encPlayFair.join('').replace(/,/g,""), alphabetBoard)
  localStorage.setItem('decryText', decry)

  return encPlayFair.join('').replace(/,/g,"")
}

function deduplication(word){ //중복제거
  const set = new Set(word.split(""))
  var result = [...set]
  Array.isArray(result)
  result = result.join('').toUpperCase()
  return result
}

function setBoard(key){ //암호화에 쓰일 암호판 세팅
  var keyLengthCount = 0
  //빈 배열 생성
  var alphabetBoard = new Array(5);
  for (var i = 0; i < alphabetBoard.length; i++) {
    alphabetBoard[i] = new Array(5);
  }

  for(var i=0; i<alphabetBoard.length; i++){
    for(var j=0; j<alphabetBoard[i].length; j++){
      alphabetBoard[i][j] = key.charAt(keyLengthCount++)
    }
  }

  return alphabetBoard
}

function getBoard(){
  return localStorage.getItem('board').replace(/,/g,"")
}

function getPairtext(){
  return localStorage.getItem('pairtext')  
}

function getEncPlayFair(){
  return localStorage.getItem('encPlayText')  
}

function decryption(key, str, alphabetBoard){
  var playFair = new Array()
	var decPlayFair = new Array() 
	var x1=0, x2=0, y1=0, y2=0
	var decStr =""

	var lengthOddFlag = 1
		
	for( var i = 0 ; i < str.length; i+=2 ) {
    var temArr = new Array(2)
		temArr[0] = str.charAt(i);
		temArr[1] = str.charAt(i+1);
		playFair.push(temArr);
	}
		
	for(var i = 0 ; i < playFair.length ; i++ ) {
    var temArr = new Array(2)
		for( var j = 0 ; j < alphabetBoard.length ; j++ ) {
			for( var k = 0 ; k < alphabetBoard[j].length ; k++ ) {
				if(alphabetBoard[j][k] == playFair[i][0]) {
          x1 = j;
          y1 = k;
        }
        if(alphabetBoard[j][k] == playFair[i][1]) {
          x2 = j;
          y2 = k;
        }
			}
		}
			
		if(x1==x2) //행이 같은 경우 각각 바로 아래열 대입
		{
			temArr[0] = alphabetBoard[x1][(y1+4)%5];
			temArr[1] = alphabetBoard[x2][(y2+4)%5];
		}
		else if(y1==y2) //열이 같은 경우 각각 바로 옆 열 대입
		{
			temArr[0] = alphabetBoard[(x1+4)%5][y1];
			temArr[1] = alphabetBoard[(x2+4)%5][y2];
		}
		else //행, 열 다른경우 각자 대각선에 있는 곳.
		{
			temArr[0] = alphabetBoard[x2][y1];
			temArr[1] = alphabetBoard[x1][y2];
		}
		decPlayFair.push(temArr);
	}
		
	for(var i = 0 ; i < decPlayFair.length ; i++) //중복 문자열 돌려놓음
	{
		if(i!=decPlayFair.length-1 && decPlayFair[i][1]=='X' 
				&& decPlayFair[i][0]==decPlayFair[i+1][0])
		{	
	  	decStr += decPlayFair[i][0];
		}
		else {
      decStr += decPlayFair[i][0]+""+decPlayFair[i][1];
		}
	}

  var plainStr = localStorage.getItem('plaintext').toUpperCase()
  var arr1 = new Array()
  var arr2 = new Array()

  // z위치 찾기
  for(var i=0; i<plainStr.length; i++){
    if(plainStr.charAt(i) == 'Z'){
      arr1.push(i)
    }
  }

  // 공백위치 찾기
  for(var i=0; i<plainStr.length; i++){
    if(plainStr.charAt(i) == ' '){
      arr2.push(i)
    }
  }

  // Z로 바꾸기
	for(var i = 0 ; i < decStr.length ; i++ )
	{
    for(var j=0; j<arr1.length; j++){
      if(i == arr1[j]) 
			  decStr = decStr.substring(0,i)+'Z'+decStr.substring(i+1,decStr.length);
		}
  }

  if(str.length %2 != 0) decStr = decStr.substring(0, decStr.length-1); 

  // 공백 추가
  for(var i = 0 ; i < decStr.length ; i++ )
	{
    for(var j=0; j<arr2.length; j++){
      if(i == arr2[j]) 
			  decStr = decStr.substring(0,i)+' '+decStr.substring(i,decStr.length);
		}
  }
		
  return decStr;
}

function getdecry(){
  return localStorage.getItem('decryText')  
}