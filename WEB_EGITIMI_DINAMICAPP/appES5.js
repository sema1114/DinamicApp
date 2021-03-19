
function Course(title,instructor,image){
this.title=title;
this.instructor=instructor;
this.image=image;
}
//UI Contructor

function UI(){
const list=document.getElementById('course-list');

}

UI.prototype.addCourseList=function(course){

}

UI.prototype.clearControls=function(){}



document.getElementById('new-course').addEventListener('submit',
function(e){
  
    const title=document.getElementById('title').value;
    const instructor=document.getElementById('intructor').value;
    const image=document.getElementById('image').value;

 //create course obje

const course=new Course(title,instructor,image);

console.log(course);

//save to database

const ui=new UI();
//Show on the ui
//add course to list
ui.addCourseList(course);

//clear controls
ui.clearControls();






    e.preventDefault();//submit olayını kesmek için kesilmezse sayfa refresh olur
});