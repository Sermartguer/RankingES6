  import Person from './person.js';
  import Task from './task.js';
  
  //Array declaration
  var tasksvalues=[];
  var students = [
    
    new Person("Paco", "Vañó", 5),
    new Person("Lucia ", "Botella", 10),
    new Person("German", "Ojeda", 3),
    new Person("Salva", "Peris", 1),
    new Person("Oscar", "Carrion", 40),
  ];
  var tasks = [ 
    new Task("exam"),
    new Task("task")
  ];

//GETRANKING FUNCTION
function getRanking(students) {
  order(students);
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
    addPointsEl.setAttribute("id",cont);
    liEl.appendChild(addPointsEl);

    
    tasks.forEach(function(itemtask){
      
      var input = document.createElement("input");
      var idinput= tasksvalues[cont][itemtask.title];
      
      input.setAttribute("id",cont);
      input.setAttribute("name",cont);
      input.setAttribute(itemtask.title,idinput);
      input.setAttribute("value",idinput);
      var previusvalue = input.value;

      liEl.appendChild(input);

      //Onchange inputs
      input.addEventListener("change", function(){
        var integer = parseInt(input.value);
        integer = Number.isInteger(integer);
        console.log(integer);
        if (integer){
          changeValues(input.id,input.name,itemtask.title,input.value,previusvalue);
        }else{
          input.value="0";
        }
        
      });
    });
    
    //Onclick button +20
    addPointsEl.addEventListener("click", function() {
      studentItem.addPoints(20);
      var idddd = addPointsEl.id;
      tasksvalues[idddd].points=+20;
      order(tasksvalues);
      setTimeout(function(){getRanking(students)},1000);
    });
  });
}
//ONLOAD
window.onload = function() {
  start();
  getRanking(students);
  clicktask();
  titles();
}

function titles(newtitle){
  var titles = document.getElementById("demo");
  if (newtitle===undefined){
    for (var a=0;a<students.length;a++){
      var ty=tasks[a].title;
      var newstrong = document.createElement("strong");
      var t = document.createTextNode(ty);
      newstrong.appendChild(t);
      titles.appendChild(newstrong);
    }

    }else{
      var newstrong = document.createElement("strong");
      var t = document.createTextNode(newtitle);
      newstrong.appendChild(t);
      titles.appendChild(newstrong);
  }
}

//Click task
function clicktask(){
  var taskname = document.getElementById("taskname");
  document.getElementById("bt").addEventListener("click", function(){
    taskname.style.visibility="visible";
  });
  document.getElementById("taskname").addEventListener("change", function(){
    tasks.push(new Task(taskname.value));
    taskname.style.visibility="hidden";
    taskname.value="";
    start(tasks[tasks.length-1].title);
    getRanking(students);
    titles(tasks[tasks.length-1].title);
  });
}

function start(last){
  var aq=-1;
  var key3;
  if(last===undefined){
    students.sort(function(a, b) {
      return (b.points - a.points)
    });
    for(var i=0;i<tasksvalues.length;i++){
      delete tasksvalues[i];
    }

    students.forEach(function(studentItem) {
    aq++;
    tasksvalues.push({name:studentItem.name});

    for(var i=0;i<tasks.length;i++){
      key3 = tasks[i].title;
      tasksvalues[aq][key3]=0;
    }
    var pointsstudent = studentItem.points;
    tasksvalues[aq].points=pointsstudent;
    tasksvalues.sort(function(a, b) {
      return (b.points - a.points)
    });
    });
    console.log(tasksvalues);

  }else{

    for(var l=0;l<tasksvalues.length;l++){
      tasksvalues[l][last]=0;
    }
  }
}
//changeValues (first substrac the previus value, and add the new points,finaly order the inputs)
function changeValues(id,name,task,value,previusvalue){
  var previusvalueparse = parseInt(previusvalue);
  var input = document.getElementById(id);
  var parsednewvalue = parseInt(value);

  students[id].restpoints(previusvalueparse);
  students[id].addPoints(parsednewvalue);
  tasksvalues[id][task]=parsednewvalue;
  tasksvalues[id].points=students[id].points;
  order(tasksvalues);
  console.log(tasksvalues);  
  setTimeout(function(){getRanking(students)},500);
}
function order(item){
  //Order array tasksvalues
  item.sort(function(a, b) {
    return (b.points - a.points)
  }); 
}