function quickSort(tempArr){
    if(tempArr.length<=1){
        return tempArr;
    };
    var pivotIndex = Math.floor(tempArr.length/2);
    var pivot2 = tempArr.splice(pivotIndex,1);
    var pivot = parseInt(pivot2[0].trim());
    var leftArr = [];
    var rightArr = [];
    for(var i=0;i<tempArr.length;i++){
        var g = parseInt(tempArr[i].split("=")[0].trim())
        if(g>pivot){
            rightArr.push(tempArr[i]);
        }else{
            leftArr.push(tempArr[i]);
        };
    };
    return quickSort(leftArr).concat(pivot2,quickSort(rightArr));
};
function get_answer(){
    var answer = document.cookie.split(";");
    for (var i=0;i<answer.length;i++){
        var j = answer[i].split("=");
        if (j[0].trim()!="finish"){
            answer[i] = j[0].trim().replace(/q/g,"")+"="+j[1].trim();
        }else {
            answer.splice(i,1);
        };
    };
    answer = quickSort(answer);
    var change = {
                    "1":"A",
                    "2":"B",
                    "3":"C",
                    "4":"D",
                    "5":"E"
                };
    var table = document.getElementById("answer");
    var write = table.innerHTML;
    for (var i=0;i<answer.length;i++){
        var q = answer[i].split("=")[0];
        var a = change[answer[i].split("=")[1]];
        write = write+"<tr><td>"+q+"</td><td>"+a+"</td>"+"</tr>";
    };
    table.innerHTML = write;
};
function delete_cookie(){
    var day = new Date("January 1, 1960");
    var cookie = document.cookie.split(";");
    for (var i=0;i<cookie.length;i++){
        var key = cookie[i].trim().split("=")[0];
        document.cookie = key+"=;expires="+day.toGMTString()+";path=/";
    };
    window.location.href = "./index.html"
}