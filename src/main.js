
  import Person from './person.js';
var students = [
  new Person("Paco", "Vañó", 5),
  new Person("Lucia", "Botella", 10),
  new Person("German", "Ojeda", 3),
  new Person("Salva", "Peris", 1),
  new Person("Oscar", "Carrion", 40),
];

function getRanking(students) {

  students.sort(function(a, b) {
    return (b.points - a.points)
  });

  var studentsEl = document.getElementById("llistat");
  //studentsEl.innerHTML = "";
  while (studentsEl.firstChild) {
    studentsEl.removeChild(studentsEl.firstChild);
  }
  students.forEach(function(studentItem) {

    var liEl = document.createElement("li");
    var t = document.createTextNode(studentItem.surname + ", " + studentItem.name + ", " + studentItem.points + " "); // Create a text node
    liEl.appendChild(t);

    var addPointsEl = document.createElement("button");
    var tb = document.createTextNode("+20");
    addPointsEl.appendChild(tb);

    studentsEl.appendChild(liEl);
    liEl.appendChild(addPointsEl);

    //Onclick
    liEl.addEventListener("click", function() {
     
      studentItem.addPoints(20);
      setTimeout(function(){getRanking(students)},1000);
    });

    //console.log(studentItem.surname + ", "+studentItem.name+ ", "+studentItem.points ); 
  });

}


window.onload = function() {
  getRanking(students);
  cl();
  start();
}


function Task(title) {
  this.title = title;
}

//Array
var tasks = [ 
  new Task("Exam")
];




function start(){
  tasks.forEach(function(itemsitem) {
   addColumn(itemsitem.title);
  });
}

function cl(){
var buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i++) {
  console.log(buttons[i]);
  if(buttons[i].id==="bt"){
  buttons[i].onclick = function(event){
    createvent();
};
}else if(buttons[i].id==="eventclick"){
  buttons[i].onclick = function(event){
    getinputvalue();
    };
  }else if(buttons[i].id==="sub"){
    buttons[i].onclick = function(event){
      repartirpoints();
      };
    }
 }
}


function createvent(){
  var text = document.createElement("p");
  var t = document.createTextNode("Insert name of event");
  var input = document.createElement("input");
  var butsub = document.createElement("button");
  var textbutton = document.createTextNode("Create event");

  input.setAttribute("id","inputa");
  text.appendChild(t);
  butsub.setAttribute("id","eventclick");
  butsub.appendChild(textbutton);
  document.getElementById("wasd").appendChild(text);
  document.getElementById("wasd").appendChild(input);
  document.getElementById("bt").style.visibility = "hidden";
  document.getElementById("wasd").appendChild(butsub);
  cl();
}


function getinputvalue(){
  var inputvalue = document.getElementById("inputa").value;
  tasks = [ new Task(inputvalue)]
  deletechilds();
  addColumn(inputvalue);
}

function deletechilds(){
  var myNode = document.getElementById("wasd");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  document.getElementById("bt").style.visibility = "visible";
  
}



function repartirpoints(){

  var buttons = document.getElementsByTagName("input");
  for (var i = 0; i < buttons.length-1; i++) {
    if((buttons[i].value==="")||(buttons[i].value==="null")){
    students[i].addPoints(0);
    }else{
      var num = parseInt(buttons[i].value);
      students[i].addPoints(num);
    }
    getRanking(students);
  }
  
}


//AddColums
function addColumn(titulo){
	var tblHeadObj = document.getElementById('myTable').tHead;
	for (var h=0; h<tblHeadObj.rows.length; h++) {
		var newTH = document.createElement('th');
		tblHeadObj.rows[h].appendChild(newTH);
		newTH.innerHTML = titulo
	}
  getAllExp();
	var tblBodyObj = document.getElementById('myTable').tBodies[0];
	for (var i=0; i<tblBodyObj.rows.length; i++) {
    console.log(i);
    
    

    var newCell = tblBodyObj.rows[i].insertCell(-1);
        newCell.innerHTML = '<input type="text" id="'+titulo+i+'" value="0" default="0" required></input>'
        document.getElementById(titulo+i).setAttribute("name",i);
        document.getElementById(titulo+i).addEventListener("change", function (event) {
          console.log("target"+event.target.name);
          myFunction(event.target.name,titulo);
        });
      }
    }
    
    
    var previus=0;
    var sum=0;
    var suma=0;
    var arrvalue=0;
    function myFunction(i,titulo) {
      var staticpoints = students[i].getpoints();
      console.log("Arrvalue: "+arrvalue);

      var x = document.getElementById(titulo+i);
      var a = parseInt(x.value);
      a = staticpoints+a;
      console.log("Titulo"+titulo+i);
      students[i].setPoints(a);



      

      getRanking(students);
    }

    function exp(exp) {
      this.exp = exp;
    
    }
    //Array
    var xa = [];
    function getAllExp(){

      students.forEach(function(studentexp) {
        console.log(studentexp.points);
        xa.push(new exp(studentexp.points));
      });
      console.log(xa);
    }