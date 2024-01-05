import { useEffect, useState } from "react"


export default function SelectCurrency({textLabel, className, onSelect}) {
  
  const handleChange = (event) => {
    onSelect(event);
  }

  const [currencies, setCurrencies] = useState([])

  useEffect( () => {
    const getAllCurrencies  = async () => {
      try{
        const respuesta = await fetch("http://200.58.107.39:9090/currency/getAll");

        if(!respuesta.ok){
          throw new Error("Error while get currencies from database")
        }

        const datos = await respuesta.json();
        setCurrencies(datos);
      }catch(error){
        console.error("Error while get currencies from database: ", error)
      }
    };
    
    getAllCurrencies();
  }, [])
  
  return (
    <div className={className}>
        <label className="flex text-sm font-medium leading-6 text-gray-300">{textLabel}</label>
        <select
        name="currency"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        onChange={handleChange}
        >
          <option>Select Currency</option>
          {currencies.map((currency) => (
            <option key={'currency'+currency.value} value={currency.value}>{currency.name}</option>
          ))}    
        </select>
    </div>
  )
}
