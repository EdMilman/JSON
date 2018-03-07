function getJSON(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send(null);
  return JSON.parse(xhr.responseText);
}

function showResults(){
  var category = checkCategory(document.getElementById('category').value.toLowerCase())
  var year = formatYear(document.getElementById('year').value)
  var share = formatShare(document.getElementById('share').value) || ">0"
  var surname = document.getElementById('surname').value
  var data = getJSON('nobel.json')
  var path = '.prizes'

  if (category){
    path += '{..category == "' + category + '"'
  }
  if(year){
    if(!path.endsWith("s")){
      path += ' && '
      if((checkOperator(year))){
        if(year.charAt(0) == "="){
          path += '.year == ' + year.substring(1)
        }
        else{
          path += '.year ' + year.charAt(0) + ' ' + year.substring(1)
        }
      }
      else{
        path += '.year == ' + year
      }
    }
    else{
      path += '{'
      if((checkOperator(year))){
        if(year.charAt(0) == "="){
          path += '.year == ' + year.substring(1)
        }
        else{
          path += '.year ' + year.charAt(0) + ' ' + year.substring(1)
        }
      }
      else{
        path += '.year == ' + year
      }
    }
  }

  if(surname){
    if(!path.endsWith("s")){
      path += ' && ..surname *= "' + surname + '"'

    }else{
      path += '{..surname *= "' + surname + '"'
    }
  }

  if(share){
    if(!path.endsWith("s")){
      path += ' && '
      if((checkOperator(share))){
        if(share.charAt(0) == "="){
          path += '..share == ' + share.substring(1)
        }
        else{
          path += '..share ' + share.charAt(0) + ' ' + share.substring(1)
        }
      }
      else{
        path += '..share == ' + share
      }
    }
    else{
      path += '{'
      if((checkOperator(share))){
        if(share.charAt(0) == "="){
          path += '..share == ' + share.substring(1)
        }
        else{
          path += '..share ' + share.charAt(0) + ' ' + share.substring(1)
        }
      }
      else{
        path += '..share == ' + share
      }
    }
  }

  if(!path.endsWith("s")){
    path += '}'
  } else{
    path += "."
  }
    var data = JSPath.apply(path, data)
    var header = "<table><tr><td><h3>Year</h3></td><td><h3>Category</h3></td><td><h3>Name</h3></td><td><h3>Share</h3></td></tr>"
    var end = "</table>"
    var result = header
    if(!checkOperator(share)){
    for(row = 0; row < data.length; row++){
        result += "<tr>"
        for(j = 0; j < data[row].laureates.length; j++){
          if((data[row].laureates[j].surname.toLowerCase()).indexOf(surname.toLowerCase()) >= 0 && data[row].laureates[j].share == share){
            result += "<td>" + data[row].year + "</td>"
            result += "<td>" + data[row].category + "</td>"
            result += "<td>" + data[row].laureates[j].firstname + " " + data[row].laureates[j].surname + "</td>"
            result += "<td>" + data[row].laureates[j].share + "</td>"
            result += "</tr>"
          }
        }
      }
    }
    else{
      if(share.charAt(0) == "<"){
        for(row = 0; row < data.length; row++){
            result += "<tr>"
            for(j = 0; j < data[row].laureates.length; j++){
              if((data[row].laureates[j].surname.toLowerCase()).indexOf(surname.toLowerCase()) >= 0 && data[row].laureates[j].share < share.substring(1)){
                result += "<td>" + data[row].year + "</td>"
                result += "<td>" + data[row].category + "</td>"
                result += "<td>" + data[row].laureates[j].firstname + " " + data[row].laureates[j].surname + "</td>"
                result += "<td>" + data[row].laureates[j].share + "</td>"
                result += "</tr>"
            }
          }
        }
      }
      else{
        for(row = 0; row < data.length; row++){
            result += "<tr>"
            for(j = 0; j < data[row].laureates.length; j++){
              if((data[row].laureates[j].surname.toLowerCase()).indexOf(surname.toLowerCase()) >= 0 && data[row].laureates[j].share > share.substring(1)){
                result += "<td>" + data[row].year + "</td>"
                result += "<td>" + data[row].category + "</td>"
                result += "<td>" + data[row].laureates[j].firstname + " " + data[row].laureates[j].surname + "</td>"
                result += "<td>" + data[row].laureates[j].share + "</td>"
                result += "</tr>"
            }
          }
        }
      }
    }
    if(result.length > (header.length + end.length)){
      document.getElementById("resultArea").innerHTML = result + end
    } else{
      document.getElementById("resultArea").innerHTML = "<h2>No results found :(</h2>"
    }
}

function isNumeric(num){
  return !isNaN(num)
}

function checkOperator(word){
  return (word.startsWith("<") || word.startsWith(">") || word.startsWith("="))
}

function checkYear(year){
  return (isNumeric(year) && (Number(year) > 1900 && Number(year) < 2018))
}

function checkShare(share){
  return (!isNumeric(share) || Number(share) <= 0)
}

function formatYear(year){
  if(year){
    if(checkOperator(year)){
      if(checkYear(year.substring(1))){
        return year
      } else {
        return ""
      }
    }
    else{
      if(checkYear(year)){
        return year
      } else {
        return ""
      }
    }
  }
}

function formatShare(share){
  if(checkOperator(share)){
    if(checkShare(share.substring(1))) {
      return ""
    } else{
      return share
    }
  }
  else {
    if(checkShare(share)) return ""
    else return share
  }
}

function checkCategory(category){
  var cat = ["physics", "chemistry", "medicine", "literature", "peace", "economics"]
  if(cat.indexOf(category.toLowerCase()) >= 0) {return category.toLowerCase()} else return ""
}

function reset(){
  document.getElementById("category").value = ""
  document.getElementById("year").value = ""
  document.getElementById("surname").value = ""
  document.getElementById("share").value = ""
}
