import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate } from 'react-router-dom';


const Bookingslots = () => {
  const navigate = useNavigate();


  const [allSlots, setAllSlots] = useState([])
  const [approved, setApproved] = useState([])
  const [companyId,setCompanyId]= useState([])
  const [modalOpen, setModal] = useState(false)
  const [greenmodalOpen, setGreenModal] = useState(false)
  const [view, setView] = useState({})
   const  token  = localStorage.getItem('admintoken') 



  useEffect(()=>{
    if(token){
        navigate('/admin/bookingslots')

    }
    else{
        navigate('/adminlogin')

    }
},[])
  


  useEffect(() => {
    console.log('going to get all bookingslots from frontend');
    axios.get('http://localhost:4000/getallslots').then((response) => {
      console.log('going to get all bookingslots from frontend 222')

      setAllSlots([response.data])
    })
  }, [])


  const getApprovedApplication = () => {
    axios.get('http://localhost:4000/getApprovedApplication').then((response) => {
      setApproved([response.data])
    })
  }

  const bookSlot=async(e)=>{
    e.preventDefault()

    if(companyId[0] === undefined){
      alert('please choose one')
    }else{
      await axios.post('http://localhost:4000/bookslot',{companyId,view}).then((response)=>{  
              //  setApproved([response.data.list])
               console.log('approved list is  ',approved);
               setAllSlots([response.data.slots])
               setModal(false)
        
          })
    }


// console.log('company id issssssssssssssssssss   ',companyId);

    

//    
}

  return (
    <div >
      <div className='text-center pt-12'><h1 className={modalOpen  && approved.length>=1 || greenmodalOpen ?'blur-lg text-3xl font-bold':'text-3xl font-bold'}>Slot Booking</h1></div>
      <div className={modalOpen  && approved.length>=1 || greenmodalOpen ?"blur-lg grid grid-cols-2 lg:grid-cols-7 gap-7 pl-5 pr-3 pt-16 md:grid-cols-4":"grid grid-cols-2 lg:grid-cols-7 gap-7 pl-5 pr-3 pt-16 md:grid-cols-4"}>

        {

          allSlots.map((item) => {
            return (
              item.map((items) => {
                // { console.log(items.number); }


                return (


                  // <div className={ ` ${items.status && "bg-green-900 h-32 w-32 rounded-md"}bg-blue-900 h-32 w-32 rounded-md`} onClick={items.status ?
                  <div className={ items.status?'bg-green-900 h-32 w-32 rounded-md':'bg-blue-900 h-32 w-32 rounded-md'} onClick={items.status ?
                    () => { setGreenModal(true)} :
                    () => {
                      console.log('approved is  ',approved)
                      console.log('company id is  ',companyId)

                      getApprovedApplication();
                      setView(items._id);
                      setModal(true);


                    }}>
                    <p className='text-white pl-8 pt-12'> Room:{items.number}</p>
                  </div>
                )
              })
            )
          })
        }
      </div>




      {modalOpen &&  <div className='duration-300  ease-in-out absolute z-[1000] rounded-md bg-white left-[500px] top-[100px] shadow-md  w-[450px]'>
        <div className=''>
          <div className=' bg-white flex justify-end w-full py-1'>
            <button className='bg- px-2 mr-2 rounded-sm text-purple-700' onClick={() => {
              setModal(false)
            }}> x </button>
          </div>
          <div className="text-center">
            <h1 className='font-bold text-slate-700 text-2xl'>Book Slot</h1>
          </div>
          <div className="modalBody pt-8 ">



            <div className='text-center pt-5 px-2'>
              <h6 className='font-bold  pt-2 pb-1'>Select Company</h6>
              <form onSubmit={ bookSlot}>

              <div className='content-center gap-6'><select name='companyid' onClick={(e)=>{
    //  console.log(booking,'hello dude');
setCompanyId([e.target.value])
console.log('company id isss   ',companyId);
 }}>
  <option value=" " className='hidden ' selected='selected'>Choose</option>
                {
                  approved.map((items) => {

                    return (
                      items.map((item, index) => {
                        // console.log(item,"hello");
                        // console.log(item._id)
                        return (
                          <option key={index} value={item._id}  className='rounded-none text-slate-800 bg-white'>{item.companyName}</option>
                        )
                      })
                    )
                  })
                }
              </select></div>
              <button type='Submit' class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded-full">
Submit
</button>
              </form>
            </div>
          </div>
          <div className="modalFooter flex justify-center pt-5 pb-5">

          </div>
        </div>
      </div>}





      
      {greenmodalOpen && <div className='duration-300  ease-in-out absolute z-[1000] rounded-md bg-white left-[500px] top-[100px] shadow-md  w-[450px]'>
        <div className=''>
          <div className=' bg-white flex justify-end w-full py-1'>
            <button className='bg- px-2 mr-2 rounded-sm text-purple-700' onClick={() => {
              setGreenModal(false)
            }}> x </button>
          </div>
          <div className="text-center">
            <h1 className='font-bold text-green-600 text-2xl pt-7'>This slot is alrady Booked</h1>
          </div>
          <div className="modalBody pt-8 ">

          </div>
          <div className="modalFooter flex justify-center pt-5 pb-5">

          </div>
        </div>
      </div>}




    </div>
  )
}

export default Bookingslots