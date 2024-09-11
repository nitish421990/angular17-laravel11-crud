import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  StudentArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
 
  
  name: string ="";
  address: string ="";
  phone: Number =0;
 
  currentStudentID = "";
constructor(private http: HttpClient )
  {
    this.getAllStudent();
 
  }
  getAllStudent()
  {
    
    this.http.get("http://127.0.0.1:8000/api/student").subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.StudentArray = resultData;
    });
  }
 
  register()
  {
  
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone
    };
 
    this.http.post("http://127.0.0.1:8000/api/student",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully");
        this.getAllStudent();
        this.name = '';
      this.address = '';
        this.phone  = 0;
    });
  }
  setUpdate(data: any)
  {
   this.name = data.name;
   this.address = data.address;
   this.phone = data.phone;
   this.currentStudentID = data.id;
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "id" : this.currentStudentID,
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone
    };
    
    this.http.put("http://127.0.0.1:8000/api/student/"+bodyData.id,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Registered Updateddd")
        this.getAllStudent();
        this.name = '';
        this.address = '';
        this.phone = 0;
    });
  }
 
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
  setDelete(data: any)
  {
    
    
    this.http.delete("http://127.0.0.1:8000/api/student"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Employee Deletedddd")
        this.getAllStudent();
        this.name = '';
        this.address = '';
        this.phone = 0;
  
    });
 
  }
}
