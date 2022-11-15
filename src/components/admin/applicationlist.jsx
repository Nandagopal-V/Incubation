import React,{useEffect,useState} from 'react'
import axios from 'axios' 
import {useNavigate } from 'react-router-dom';


export const Applicationlist = () => {
  const navigate = useNavigate();
  
  const [applicationlist ,  setApplication] = useState([])
  const [notification , setNotification] = useState([])
  const [modalOpen,setModal] = useState(false)
  const [view,setView]=useState({})
const  token  = localStorage.getItem('admintoken') 



  useEffect(()=>{
    if(token){
        navigate('/admin/applicationlist')

    }
    else{
        navigate('/adminlogin')

    }
},[])


  const openModal = (applicant_id) => {
    console.log("appplicant id is ",applicant_id);
    setModal(true)
    axios.post('http://localhost:4000/viewModal',{applicant_id}).then((response)=>{
      console.log(response.data.response);
      const data= response.data.response
      setView(data)
      console.log(view,'kooo');
    
    })
    }

    const changeLatest = (formId) => {
        axios.post('http://localhost:4000/changeLatest',{formId}).then((response)=>{
        console.log(response.data,"booom");
        // const data= response.data
        // setView(data)
        setApplication([response.data.datas])
        setNotification([response.data.latest])
        setModal(false)
        // console.log(,'kooo');
      
      })
      }

      const approvelist=(formId)=>{
        axios.post('http://localhost:4000/approvelist',{formId}).then((response)=>{
        setApplication([response.data.datas])



        })
      }

     
      const  declinelist=(formId)=>{
        axios.post('http://localhost:4000/declinelist',{formId}).then((response)=>{
        setApplication([response.data.datas])



        })
      }





  useEffect(()=>{
    axios.post('http://localhost:4000/newapplicationlist').then((response)=>{   
        console.log(response.data);
        setNotification([response.data])})
        axios.post('http://localhost:4000/pendingapplicationlist').then((response)=>{   
            console.log(response.data);
            setApplication([response.data])})

  },[])

    return (
        <div>





{modalOpen && <div className='duration-300  ease-in-out absolute z-[1000] rounded-md bg-white left-[500px] top-[100px] shadow-md  w-[450px]'>
<div className=''>
    <div className=' bg-white flex justify-end w-full py-1'>
    <button className='bg- px-2 mr-2 rounded-sm text-purple-700' onClick={()=>{
       setModal(false)
    }}> x </button>
    </div>
    <div className="text-center">
<h1 className='font-bold text-slate-700 text-2xl'>Application Details</h1>
    </div>
    <div className="modalBody pt-8 ">  
<div className='flex justify-between px-8'>
<div className='text-left'>
<h4 className='font-bold pt-2 pb-1'>Applicant Name</h4>
 <h5 className='font-medium text-slate-500 '>{view.name}</h5>
</div>
<div  className='text-right'>
<h6 className='font-bold  pt-2 pb-1'>address</h6>
 <h5 className='font-medium text-slate-500'>{view.address}</h5>
</div>
</div>
<div className='flex justify-between px-8 pt-2'>
<div className='text-left'>
<h4 className='font-bold pt-2 pb-1'>city</h4>
 <h5 className='font-medium text-slate-500 '>{view.city}</h5>
</div>
<div  className='text-right'>
<h6 className='font-bold  pt-2 pb-1'>State</h6>
 <h5 className='font-medium text-slate-500'>{view.state}</h5>
</div>
</div>
<div className='flex justify-between px-8 pt-2'>
<div className='text-left'>
<h4 className='font-bold pt-2 pb-1'>Company name</h4>
 <h5 className='font-medium text-slate-500 '>{view.companyName}</h5>
</div>
<div  className='text-right'>
<h6 className='font-bold  pt-2 pb-1'>Incubation type</h6>
 <h5 className='font-medium text-slate-500'>{view.Incubation}</h5>
</div>
</div>
<div  className='text-center pt-5 px-2'>
<h6 className='font-bold  pt-2 pb-1'>Problem Facing</h6>
 <h5 className='font-medium text-slate-500'>{view.problem}</h5>
</div>
    </div>
    <div className="modalFooter flex justify-center pt-5 pb-5">
{
  view.latest ? <button className='rounded bg-orange-700 text-white px-3 py-1 mx-2 '  onClick={()=>{
    changeLatest(view._id)
}} >Close</button> : <button className='rounded bg-orange-700 text-white px-3 py-1 mx-2 ' onClick={()=>{
  setModal(false)
}}>Close</button>
}
    </div>
</div>
</div>}



        
















        
            <div className='text-center text-2xl font-bold pt-5'>New Application List</div>
            <div className='px-6'>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center">
                                    <thead className="border-b bg-orange-600">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                SL NO
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                Company Name
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                E-mail
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4"></th>
                                         
                                        </tr>
                                    </thead >
                                    <tbody>
                                        {
                                          notification.map((item)=>{
                                            console.log(item,"ssuuiiiiiii");

                                            return(
                                                item.map((items,index)=>{

                                                    return(


                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {items.companyName}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {items.email}
                                            </td>
                                            <td >
                                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={()=>{openModal(items._id)}}>Open</button>
                                            </td>
                                         
                                        </tr >
                                                    )
                                                })
                                            )
                                          })
                                        }                   


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='text-center text-2xl font-bold pt-5'>Pending Application List</div>

            <div className=' px-6'>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center">
                                    <thead className="border-b bg-orange-600">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                SL NO
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                Company Name
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                E-mail
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4"></th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4"></th>
                                            <th scope="col" className="text-sm font-medium text-white px-6 py-4"></th>
                                        </tr>
                                    </thead >
                                    <tbody>
                                    {
          applicationlist.map((item)=>{
            console.log(item,"konichiwa");
            return(

              item.map((items,index)=>{
  
                return(
                                        <tr className="bg-white border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {items.companyName}

                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {items.email}
                                            </td>
                                            <td >
                                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'  onClick={()=>{openModal(items._id)}}>View</button>
                                            </td>
                                            <td >
                                                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full' onClick={()=>{approvelist(items._id)}}>Approve</button>
                                            </td>
                                            <td >
                                                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full' onClick={()=>{declinelist(items._id)}}>Decline</button>
                                            </td>
                                        </tr >
                                               )
                                            })
                                          )
                                         }) 
                                         }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
