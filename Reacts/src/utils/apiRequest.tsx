import { useEffect } from "react"
import api from "../utils/api"
import { useDispatch, useSelector } from "react-redux"
import { setAllData } from "../store/slice/DataSlice"
import { useParams } from "react-router-dom"


export default function apiRequest() {  
    const AllParams=useSelector((state:any)=>state.secondStates.AllParams)
    const dispatch=useDispatch()
    const products = 'products'
    const params=useParams()
    useEffect(() => {
        api.get(`${products}/?id=${params}`).then(res =>dispatch(setAllData(res.data)) ).catch(err => console.log(err))
          console.log(AllParams,"all params are here")
          console.log(params,"params are here")
    }, [params])

    return (
        <>
        </>
    )
}


