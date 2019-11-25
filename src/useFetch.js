import {useEffect, useState} from 'react'


export const useFetch = (url) => {

    const [state, setState] = useState({data: null, loading: true});

    useEffect(() =>{
        setState(state => ({data: state.data, loading: true}))
        fetch(url).then(x => x.json())
        .then(y => {
            if (y.length === 0){
                setState({data: "no data please check spelling", state: "no data please check spelling" ,loading: false})
            } else {
                let total = 0;
                for (let i = 0; i< y.length;i++){
                    let toInt = parseInt(y[i].population)
                    total = toInt + total;
                }
                total = Math.trunc(total / y.length);
            
            setState({data: total, state: y[0].name ,loading: false})
            }
            
        });
    }, [url])



return state;
};
