
//Course class
class Course {
    constructor(title,instructor,image){
        this.courseId=Math.floor(Math.random()*1000);
        this.title=title;
        this.instructor=instructor;
        this.image=image;
    }
}


//UI class
class UI{

    addCourseList(course){
        const list=document.getElementById('course-list');
        var html =`
        <tr>
            <td><img src="img/${course.image}"width="50" height="60"></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a></td>
       
        </tr>`;
        
       
        list.innerHTML+=html;
    }
    clearControls(){

        const title=document.getElementById('title').value="";
        const instructor=document.getElementById('intructor').value="";
        const image=document.getElementById('image').value="";
    }
    deleteCourse(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();

            return true;
        }
    }
    showAlert(message,className){
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
}

class Storage{

    static getCourses(){
     let courses;

    if(localStorage.getItem('courses')===null)
       {
     courses=[];
       }else{
       courses= JSON.parse(localStorage.getItem('courses'));
       }
       return courses;
     }

    static displayCourses(){
        const courses=Storage.getCourses();
        courses.forEach(course => {
            const ui=new UI();
            ui.addCourseList(course);
        });
    }

    static addCourse(course){
      const courses=Storage.getCourses();
      courses.push(course);
      localStorage.setItem('courses',JSON.stringify(courses));
    }

    static deleteCourse(element){
   if(element.classList.contains('delete')){
       const id=element.getAttribute('data-id');
       const courses=Storage.getCourses();

       courses.forEach((course,index)=>{
        if(course.courseId==id){
            courses.splice(index,1);//hangi indexte o indexten itibaren 1 elemanı sil
        }
       });

       localStorage.setItem('courses',JSON.stringify(courses));

   }
    }


}

document.addEventListener('DOMContentLoaded',Storage.displayCourses);


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

console.log(ui);
//Show on the ui
//add course to list

if(title===''|| instructor===''||image===''){
    ui.showAlert('Please complate the form','warning');
}else{

    ui.addCourseList(course);
    
  // save to LocalStorage
   Storage.addCourse(course);

    //clear controls
    ui.clearControls();
    ui.showAlert('The course has been added','success');
}







    e.preventDefault();//submit olayını kesmek için kesilmezse sayfa refresh olur
});


document.getElementById('course-list').addEventListener('click',function(e){

    const ui=new UI();
    //delete course
   if( ui.deleteCourse(e.target)==true){
  //delete from LocalStorege
  Storage.deleteCourse(e.target);

  ui.showAlert('The course has been deleted','danger');

   }

  
});

