
function Course(title,instructor,image){
this.title=title;
this.instructor=instructor;
this.image=image;
}
//UI Contructor

function UI(){
}

UI.prototype.addCourseList=function(course){
 const list=document.getElementById('course-list');
 var html =`
 <tr>
     <td><img src="img/${course.image}"width="50" height="60"></td>
     <td>${course.title}</td>
     <td>${course.instructor}</td>
     <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>

 </tr>`;
 

 list.innerHTML+=html;
}

UI.prototype.clearControls=function(){
    
    const title=document.getElementById('title').value="";
    const instructor=document.getElementById('intructor').value="";
    const image=document.getElementById('image').value="";
}


UI.prototype.deleteCourse=function(element){
 if(element.classList.contains('delete')){
     element.parentElement.parentElement.remove();
 }
}



UI.prototype.showAlert=function(message,className){
var alert =`
    <div class="alert alert-${className}">
      ${message}
    </div>

`;
  const row=document.querySelector('.row');
  //beforeBegin ,afterBegin ,beforeEnd ,afterEnd
  row.insertAdjacentHTML('beforeBegin',alert);


  setTimeout(()=>{
      document.querySelector('.alert').remove()
  },3000);

}



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

if(title===''|| instructor===''||image===''){
    ui.showAlert('Please complate the form','warning');
}else{

    ui.addCourseList(course);
    
    //clear controls
    ui.clearControls();
    ui.showAlert('The course has been added','success')
}







    e.preventDefault();//submit olayını kesmek için kesilmezse sayfa refresh olur
});


document.getElementById('course-list').addEventListener('click',function(e){

    const ui=new UI();

    ui.deleteCourse(e.target);
    ui.showAlert('The course has been deleted','danger');

});