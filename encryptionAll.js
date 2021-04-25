var keyword = ""
var plaintext = ""

function getValue()  {
  localStorage.setItem('keyword', document.getElementById('keyword').value)
  localStorage.setItem('plaintext', document.getElementById('plaintext').value)
}

function encryption(){
  // 암호키 중복 제거
  var keyForSet = localStorage.getItem('keyword')
  console.log(deduplication(keyForSet))

  // 암호판 중복 제거
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  uniqueArr += alphabet
  console.log(uniqueArr)
  
  
}

function deduplication(word){ //중복제거
  const set = new Set(word.split(""))
  var result = [...set]
  Array.isArray(result)
  result = result.join('').toUpperCase()
  return result
}