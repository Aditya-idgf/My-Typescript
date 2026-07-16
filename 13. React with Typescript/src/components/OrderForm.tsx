import React, { useState } from "react"

interface OrderFormProps {
    SubmitFuntion(order: {name: string, cups: number}) : void
}

function OrderForm({SubmitFuntion}: OrderFormProps) {
    const [name, setName] = useState<string>('Masala');
    const [cups, setCup] = useState<number>(1);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        SubmitFuntion({name, cups})
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="">Tea Name</label>
            <input 
                value={name}
                onChange={(e : React.ChangeEvent<HTMLInputElement>)=> {
                    setName(e.target.value);
                }}
            />
            <label htmlFor="">Cups</label>
            <input 
                type="number"
                value={cups}
                onChange={(e : React.ChangeEvent<HTMLInputElement>)=> {
                    setCup(Number(e.target.value) || 1);
                }}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default OrderForm