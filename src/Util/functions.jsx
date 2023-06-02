import {query, getDocs, where, limit, collection, updateDoc, arrayRemove, arrayUnion, doc, addDoc} from 'firebase/firestore'
import format from 'date-fns/format';


import Cookies from 'universal-cookie';
import { db } from '../firebaseConfig';



const cookie = new Cookies()
const user=cookie.get('useraidt');



export   const getData=async({sub, setChartData})=>{

    const sesRef = collection(db,'Users',user,'Sessions');

    var datesArray=[];
    var WTArray=[];
    var BTArray=[];
    const q = query(sesRef, where('subject','==',sub), limit(5));
    await getDocs(q).then((snapshot)=>{
      snapshot.docs.forEach(doc=>{
        var dc= doc.data();
        var date = dc.time;
        var WT = dc.WorkTime;
        var BT = dc.BreakTime;

        datesArray.push(date);
        WTArray.push(WT);
        BTArray.push(BT);
     
      })

    });setChartData({
      labels: datesArray,
      datasets:
      [
        {
        label:'WorkTime',
        data: WTArray
      },
      {
        label:'BreakTime',
        data: BTArray
      }
    ]
      
    })
    

  }


  
  
 
  

  export const movetask=async({id, task})=>{
    const ref = doc(db,'Users',user,'Scopes',id)
    await updateDoc(ref,{
      incomplete: arrayRemove(task),
      complete: arrayUnion(task)


    });
   
    
    
   }

  export  const movetaskBack=async({id,task})=>{
    const ref = doc(db,'Users',user,'Scopes',id)
    await updateDoc(ref,{
      incomplete: arrayUnion(task),
      complete: arrayRemove(task)
    })
   }

   

  export const newTassk=async({id, newTask})=>{
    const newRef=doc(db,'Users', user, 'Scopes', id)
    await updateDoc(newRef,{
      incomplete: arrayUnion(newTask)
    })
    
  }

  
