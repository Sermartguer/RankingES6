
  import Person from './person.js';
  var valorinput=[];
var students = [
  new Person("Paco", "Vañó", 5),
  new Person("Lucia ", "Botella", 10),
  new Person("German", "Ojeda", 3),
  new Person("Salva", "Peris", 1),
  new Person("Oscar", "Carrion", 40),
];

function Task(title) {
  this.title = title;
  
}
//Array
var itemstask = [ 
  new Task("exam"),
  new Task("task")
];
function getRanking(students) {
  students.sort(function(a, b) {
    return (b.points - a.points)
  });
  
  var studentsEl = document.getElementById("res");
  //studentsEl.innerHTML = "";
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

      liEl.appendChild(input);
      input.addEventListener("change", function(){
        myFunction(input.id,input.name,itemtask.title,input.value);
      });
    });
    
    //Onclick
    addPointsEl.addEventListener("click", function() {
     
      studentItem.addPoints(20);
      setTimeout(function(){getRanking(students)},1000);
    });

    //console.log(studentItem.surname + ", "+studentItem.name+ ", "+studentItem.points ); 
  });

}

window.onload = function() {
  students.sort(function(a, b) {
    return (b.points - a.points)
  });
  start();
  console.log(valorinput);
  getRanking(students);
}
function start(){
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
    valorinput[aq][key3]=0
  }
  var pointsstudent = studentItem.points;
  valorinput[aq].points=pointsstudent;
  valorinput.sort(function(a, b) {
    return (b.points - a.points)
  });
  });
}

//MYFUNCTION
function myFunction(id,name,task,value){
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