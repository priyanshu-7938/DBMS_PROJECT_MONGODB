import React,{ useState } from "react";
 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area"
import { BASE_URL, PORT, REMOVE_STOCK, STORE_STOCK_QUERRY } from "@/env";
import { Button } from "@/components/ui/button";
import { useTheContext } from "@/context";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

export default function SubBillingAddMed({ setData }) {
    
    const [ querry, setQuerry ] = useState("");
    const [ medData, setmedData ] = useState([]);
    const { token, userEmail } = useTheContext();
    const handelChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setQuerry(event.target.value);
        fetchQuerry(event.target.value);
    };
    const fetchQuerry = (str)=> {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", token);
                myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
                
                var urlencoded = new URLSearchParams();
                urlencoded.append("storeEmail", userEmail);
                urlencoded.append("query", str);
                
                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow' as RequestRedirect | undefined
                };
                const uri = BASE_URL+PORT+STORE_STOCK_QUERRY;
                fetch(uri, requestOptions)
                .then(response => response.text())
                .then(result => setmedData(JSON.parse(result)))
                .catch(error => console.log('error', error));
    }


    return (
        <>
                <div className="flex flex-col gap-3 w-full relative">
                    <div className="flex gap-2">
                        <div className="flex items-center gap-5">
                            <Label htmlFor="medNameAdd" className="font-bold text-[16px]">Search Med.</Label>
                            <Input type="text" id="" className="w-[400px]" onChange={handelChange} placeholder="medID / name" />
                        </div>
                    </div>
                    <div>
                    <ScrollArea className="h-[150px] w-full rounded-md border p-4 flex flex-col gap-3 absolute z-10 ">
                        {medData.map((data,i)=> (<MedComponent key={i} data={data} setData={setData}/>))}
                    </ScrollArea>
                    </div>
                </div>
                <br />
            
        </>
    );
}


function MedComponent({ data, setData }){    
    const [ QuantityToAdd, setQuantityToAdd ] = useState(0);
    const handle = (event) => {
        setQuantityToAdd(event.target.value);
    }
    const addToLocalBill = () => {
        setData({medData:data.medData, quantity:QuantityToAdd});
    }
    
    return (
        <div className="flex border-b items-center border-[#353535] justify-between p-2">
            <div className="flex flex-col">
                <h1 className="text-[12px] text-wite font-bold">{data.medData.medID}</h1>
                <h1 className="text-[18px] text-wite font-bold">{data.medData.name}</h1>
                <h1 className="text-[12px] text-wite font-bold">In Stock: {data.quantity}</h1>
            </div>
            <div className="flex gap-2">
                <Input type="text" onChange={handle} value={QuantityToAdd} className="w-[100px] text-right text-[24px]" onChange={handle} value={QuantityToAdd} placeholder="Q."></Input>
                <Button className={`font-bold ${ ((QuantityToAdd)&&(QuantityToAdd<=parseInt(data?.quantity))&&(QuantityToAdd>0))?"":"hidden"}`} onClick={addToLocalBill}>Add</Button>
            </div>
            

        </div>
    );
}