
  import Person from './person.js';
  import Task from './task.js';
  
  //Array declaration
  var valorinput=[];
  var students = [
    new Person("Paco", "Vañó", 5),
    new Person("Lucia ", "Botella", 10),
    new Person("German", "Ojeda", 3),
    new Person("Salva", "Peris", 1),
    new Person("Oscar", "Carrion", 40),
  ];
  var itemstask = [ 
    new Task("exam"),
    new Task("task")
  ];

//GETRANKING FUNCTION
function getRanking(students) {
  students.sort(function(a, b) {
    return (b.points - a.points)
  });
  
  var studentsEl = document.getElementById("res");
  while (studentsEl.firstChild) {
    studentsEl.removeChild(studentsEl.firstChild);
  }

  var cont=-1;
  students.forEach(function(studentItem) {
    cont++;
    var liEl = document.createElement("li");
    var t = document.createTextNode(studentItem.surname + ", " + studentItem.name + ", " + studentItem.points + " "); // Create a text node
    liEl.appendChild(t);

    var addPointsEl = document.createElement("button");
    var tb = document.createTextNode("+20");
    
    addPointsEl.appendChild(tb);
    studentsEl.appendChild(liEl);
    liEl.appendChild(addPointsEl);

    itemstask.forEach(function(itemtask){    
      var input = document.createElement("input");
      input.setAttribute("id",cont);
      input.setAttribute("name",cont);
      var idd= valorinput[cont][itemtask.title];
      input.setAttribute(itemtask.title,idd);
      input.setAttribute("default", idd);
      input.setAttribute("value",idd);
      var previusvalue = input.value;
      liEl.appendChild(input);

      //Onchange inputs
      input.addEventListener("change", function(){
        myFunction(input.id,input.name,itemtask.title,input.value,previusvalue);
      });
    });
    
    //Onclick button +20
    addPointsEl.addEventListener("click", function() {
      studentItem.addPoints(20);
      setTimeout(function(){getRanking(students)},1000);
    });
  });
}
//ONLOAD
window.onload = function() {
  start();
  getRanking(students);
  clicktask();
}

//Click task
function clicktask(){
  document.getElementById("bt").addEventListener("click", function(){
    document.getElementById("taskname").style.visibility="visible";
  });
  document.getElementById("taskname").addEventListener("change", function(){
    itemstask.push(new Task(document.getElementById("taskname").value));
    document.getElementById("taskname").style.visibility="hidden";
    document.getElementById("taskname").value="";
    console.log(itemstask.length);
    var leng = itemstask.length;
    console.log(leng);
    start(itemstask[leng-1].title);
    getRanking(students);
  });
}

function start(last){
  console.log(last);
  if(last===undefined){
    students.sort(function(a, b) {
      return (b.points - a.points)
    });
    for(var l=0;l<valorinput.length;l++){
      delete valorinput[l];
    }
    valorinput = [];
    var aq=-1;
    var key3;
    students.forEach(function(studentItem) {
    aq++;
    var i ={name:studentItem.name}
    valorinput.push({i});
    for(var y=0;y<itemstask.length;y++){
      key3 = itemstask[y].title;
      valorinput[aq][key3]=0;
    }
    var pointsstudent = studentItem.points;
    valorinput[aq].points=pointsstudent;
    valorinput.sort(function(a, b) {
      return (b.points - a.points)
    });
    });
    console.log(valorinput);
  }else{
    for(var l=0;l<valorinput.length;l++){
      
      valorinput[l][last]=0;
    }
  }
  
}



//MYFUNCTION (first substrac the previus value, and add the new points,finaly order the inputs)
function myFunction(id,name,task,value,previusvalue){

  var prevparse = parseInt(previusvalue);
  students[id].restpoints(prevparse);
  var c = document.getElementById(id);
  var v= c.getAttribute(task);
  var t= task;
  var parse = parseInt(value);
  students[id].addPoints(parse);
  valorinput[id][task]=parse;
  valorinput[id].points=students[id].points;
  valorinput.sort(function(a, b) {
    return (b.points - a.points)
  });
  console.log(valorinput);  
  getRanking(students);
}