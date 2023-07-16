import Database from './firebase';
import { ref, set,get,child,update } from "firebase/database";
const db=Database;

export function writeUserData() {
    

  }

  export async  function  addWorkerToDb(e,id,data,obj) {
    e.preventDefault();
    if(validateId(id,obj)){
      await set(ref(db, 'workers/'+id),data);
    }
  }

  export async function addCustomerToDb(e,id,data,obj) {
    e.preventDefault();
    if(validateId(id,obj)){
    await set(ref(db, ('customers/' + id)),data);
    }
  }

  export async function getWorkers(setData,setLoading){
    await get(ref(db, 'workers/')).then((snapshot) => {
      if (snapshot.exists()) {
          setData(snapshot.val());
          setLoading(true);
      } else {
        console.log("No data available");
        return -1;
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  export async function getCustomers(setData,setLoading){
    await get(ref(db, 'customers/')).then((snapshot) => {
      if (snapshot.exists()) {
          setData(snapshot.val());
          setLoading(true);
      } else {
        console.log("No data available");
        return -1;
      }
    }).catch((error) => {
      console.error(error);
    });
  }

export function validateId(id,obj){
   let keys=Object.keys(obj);
   if(keys.includes(id)){
     alert('this id is already there');
     return false;
   }
   if(id.includes(" ")){
     alert("no sapces aloud")
     return false;
   }
   const reg = new RegExp('^[0-9]+$');
   if(!reg.test(id)){
     alert('Id mus contain numbers')
     return false
   }
  return true
}
/*        id: 0,
        customerId: '',
        date: '2021-05-24',
        customerName: '',
        size: '20f',
        others: '',
        notes: '',
        workersId: [],
        price: '',
        bonus:'' */


export function praparingContainerObject(data){
  let date=fromDatetoArray(data.date);
   
  let customer={
    id: data.id,
    customerId: data.customerId,
    date: data.date,
    customerName: data.customerName,
    size: data.size,
    notes: data.notes,
    price: data.price,
    workers:data.workersId
  }
  const updates = {};
  updates['/customers/' + customer.customerId+'/'+date[0]+'/'+(+date[1])+'/'+(+date[2])+'/container/'+data.id] = customer;
  return update(ref(db), updates);
}


export function fromDatetoArray(str){
  return str.split("-");
}

export function calcuteContainerSalary(size){
  if(size==='20Ft'){
     return 80;
  }
  return 130
}


// for container writing data
export function writeFormToWorker(data){
  let date=fromDatetoArray(data.date);
  const updates = {};
  
  for(let i=0;i<data.workersId.length;i++){
  let worker={
    id: data.id,
    workersId:data.workersId[i],
    customerId: data.customerId,
    date: data.date,
    customerName: data.customerName,
    size: data.size,
    notes: data.notes,
    sallary: calcuteContainerSalary(data.size),
    bonus:+data.bonus[i].bonus,
  }
  updates['/workers/' +data.workersId[i]+'/'+date[0]+'/'+(+date[1])+'/'+(+date[2])+'/container/'+data.id] = worker;
   update(ref(db), updates);
}
return 1;
}

// wrtinig hourly form to customer 

/*        id: 0,
        customerId: '',
        date: '2021-05-24',
        customerName: '',
        start: '',
        end: '',
        others: '',
        notes: '',
        workersId: [],
        myHourRate: '',
        workerHourRate: '',
        bonus: [] */
export function writingHourFormToDb(data){
  let date=fromDatetoArray(data.date);
   
  let customer={
    id: data.id,
    customerId: data.customerId,
    date: data.date,
    customerName: data.customerName,
    start:data.start,
    end:data.end,
    hours:calcHour(data.start,data.end),
    notes: data.notes,
    myHourRate: data.myHourRate,
    workerHourRate: data.workerHourRate,
    price: calcuatePrice(data.myHourRate,calcHour(data.start,data.end)),
    workers:data.workersId
  }
  const updates = {};
  updates['/customers/' + customer.customerId+'/'+date[0]+'/'+(+date[1])+'/'+(+date[2])+'/hour/'+data.id] = customer;
  return update(ref(db), updates);
}

function calcHour(start,end){
   let temp=start.split(":");
   let temp2=end.split(":");
   let res= parseFloat(temp2[0])- parseFloat(temp[0])- parseFloat((+temp[1])/60)+ parseFloat((+temp2[1])/60);
   console.log(res)
   res=res.toFixed(2);
   return res;
}
function calcuatePrice(rate,hours){
  return rate*hours
}

export function writeHoursToWorker(data){
  let date=fromDatetoArray(data.date);
  const updates = {};
  
  for(let i=0;i<data.workersId.length;i++){
  let worker={
    id: data.id,
    workersId:data.workersId[i],
    customerId: data.customerId,
    date: data.date,
    customerName: data.customerName,
    start:data.start,
    end:data.end,
    hours:calcHour(data.start,data.end),
    notes: data.notes,
    workerHourRate: data.workerHourRate,
    sallary: calcuatePrice(data.workerHourRate,calcHour(data.start,data.end)),
    bonus:+data.bonus[i].bonus,
  }
  updates['/workers/' +data.workersId[i]+'/'+date[0]+'/'+(+date[1])+'/'+(+date[2])+'/hour/'+data.id] = worker;
   update(ref(db), updates);
}
return 1;
}


export function writeMafToWorker(data){
  

  
  let updates={}
  updates['/workers/' +data.id+'/maf/'+data.date] = {maf:data.mafria,date:data.date};
   update(ref(db), updates);

return 1;
}