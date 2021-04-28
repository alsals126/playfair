var keyword = ""    //암호화에 쓰일 키
var plaintext = ""  //암호화 할 문자열

function getValue()  { // 암호화에 쓰일 키, 암호화 할 문자열 가져오기
  localStorage.setItem('keyword', document.getElementById('keyword').value)
  localStorage.setItem('plaintext', document.getElementById('plaintext').value)
}

function encryption(){
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var keyForSet = deduplication(localStorage.getItem('keyword').toUpperCase() + alphabet) //중복된 문자가 제거된 문자열을 저장할 변수
  console.log(keyForSet)  
}

function deduplication(word){ //중복제거
  const set = new Set(word.split(""))
  var result = [...set]
  Array.isArray(result)
  result = result.join('').toUpperCase()
  return result
}

function setBoard(){ //암호화에 쓰일 암호판 세팅
  const alphabetBoard = Array.from(Array(5), () => new Array(5)) //빈 배열 생성
}