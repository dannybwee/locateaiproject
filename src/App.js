import React, {useState} from 'react';
import {useFetch} from "./useFetch"; 
import useForm from 'react-hook-form'


const App = () =>{
  
  //initialize the states
  const [values, handleChange] = useState('California');
  const [profit, handleProfit] = useState('10000');
  const {register, handleSubmit, errors } = useForm()

  //sets state to data from api call
  const {data, setState} = useFetch(`https://odn.data.socrata.com/resource/tx2x-uhib.json?name=${values}`);
  
  //on submit function to handle data input
  // can use lower or upper case
  const onSubmit = data => { 
    console.log(data.profit)
    let formatState = data.state.charAt(0).toUpperCase() + data.state.substring(1).toLowerCase();
    formatState = formatState.replace(/[^\w\s]/gi, "")
    console.log(formatState);
    handleChange(formatState);
    handleProfit(data.profit)
  }

  
  return (
    

    //Form with quick and dirty breaks to seperate the divs
    //could potentially format data on the usefetch or on submit functions.
    <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="state" defaultValue={values} required pattern ="[0-9a-zA-Z_.-]*" ref={register({ required: true })}/>
          <br/>
          <input name="profit" defaultValue={profit} ref={register({ required: true })} />
          {errors.exampleRequired && <span>This field is required</span>}
          <br/>
          <input type="submit" />
        </form>
        <br/>
        <br/>
        <br/>
      <div>
        State Name: {values? values: 'no state collected'}
      </div>

      <div>
        Avg Anual Pop: {data ? data: 'no data collected'}
      </div>

      <div>
        Potential Store Count:{(data / profit) > 0 ? (data / profit).toFixed()  : 'no profit available'}
      </div>
    </div>
  );
}

export default App;
