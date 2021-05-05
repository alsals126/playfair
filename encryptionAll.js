//var keyword = ""    //암호화에 쓰일 키
var plaintext = ""  //암호화 할 문자열

function setValue()  { // 암호화에 쓰일 키, 암호화 할 문자열 가져오기
  localStorage.setItem('keyword', document.getElementById('keyword').value)
  localStorage.setItem('plaintext', document.getElementById('plaintext').value)
}

function encryption(){
  // 보드판
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var keyForSet = deduplication(localStorage.getItem('keyword').toUpperCase() + alphabet) //중복된 문자가 제거된 문자열을 저장할 변수
  const alphabetBoard = setBoard(keyForSet) 

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
      tmpArr[0] = alphabetBoard[(x1+1)%5][y1];
      temArr[1] = alphabetBoard[(x2+1)%5][y2];
    } 
    else { //행, 열 모두 다른경우
      temArr[0] = alphabetBoard[x2][y1];
      temArr[1] = alphabetBoard[x1][y2];
    }
    
    encPlayFair.push(temArr)  
  }

  console.log(playFair)
  console.log(playFair.join('').replace(/,/g,"")) 

  console.log(encPlayFair)
  console.log(encPlayFair.join('').replace(/,/g,"")) 
  
  console.log(keyForSet) 
  console.log(plaintext) 

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
  return alphabetBoard
}