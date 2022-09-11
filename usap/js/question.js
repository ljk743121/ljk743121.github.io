var exp = new Date("December 31, 9998");
exp = exp.toGMTString();
function add_id(){
    var collect = document.getElementsByTagName("input")
    for (var i=0;i<collect.length;i++){
        if (collect[i].type=="radio"){
            collect[i].id=collect[i].name+"_"+collect[i].value;
        };
    };
    collect = document.getElementsByClassName("question");
    for (var i=0;i<collect.length;i++){
        collect[i].id="q"+(i+1).toString();
    };
    check_cookie()
};
function choose(tagA){
    var getId = RegExp(/id=\"q[1-5]?[0-9]_[1-5]\"/);
    select = tagA.innerHTML;
    id = select.match(getId).toString().replace(/\"|id=/g,"");
    document.getElementById(id).checked = "checked";
    document.getElementById(id.match(/q[1-5]?[0-9]/).toString()).style.backgroundColor = "#ffffff";
    save_cookie(id);
};
function save_cookie(id){
    var q = id.split("_");
    document.cookie = q[0] + "=" + q[1] + ";expires=" + exp + ";path=/";
};
function check_cookie(){
    var cookie = document.cookie.split(";");
    for (var i=0;i<cookie.length;i++){
        var c=cookie[i].toString().trim().split("=");
        if (c[0]=="finish" && c[1]=="1"){
            window.location.href = "./submit.html"
            return 0;
        };
        var s=document.getElementById((c[0]+"_"+c[1]))
        if (s.type=="radio"){
            s.checked = "true";
        };
    };
};
function check_form(){
    for (var i=1;i<51;i++){
        question = document.getElementsByName("q"+i.toString());
        var t = true;
        var jump;
        for (var j=0;j<question.length;j++){
            if (question[j].checked==true){
                t = false;
                jump = question[j];
                break;
            };
        };
        if (t==true){
            if (jump==undefined){
                window.location.hash = "";
                window.location.hash ='#q1';
                document.getElementById("q1").style.backgroundColor = "rgba(255,0,0,0.5)";
            }else{
                window.location.hash = "";
                window.location.hash ='#q'+(parseInt((jump.name).replace("q",""))+1).toString();
                document.getElementById(("q"+(parseInt((jump.name).replace("q",""))+1).toString())).style.backgroundColor = "rgba(255,0,0,0.5)";
            };
            return false;
        };
    };
    return true;
};
function identify_form(){
    if (check_form()){
        document.getElementById("submit").style.display = "none";
        document.getElementById("identify").style.display = "block";
    };
};
function ok(){
    document.getElementById("submit").style.display = "block";
    document.getElementById("identify").style.display = "none";
    var exp = new Date("December 31, 9998")
    exp.setTime(exp.getTime());
    document.cookie =  "finish=1;expires=" + exp.toGMTString() + ";path=/";
    window.location.href = "./submit.html";
};
function no(){
    document.getElementById("submit").style.display = "block";
    document.getElementById("identify").style.display = "none";
}