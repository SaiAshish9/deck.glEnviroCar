 
  import React from "react";
    
  import {Route,Switch} from 'react-router-dom'
  
  import Analyse from './deckgl'


  const App =()=>{
    return(

<Switch>

  <Route exact path="/" component={Analyse}/>
  <Route  path="/track2" component={Analyse}/>
  <Route  path="/track3" component={Analyse}/>
  <Route  path="/track4" component={Analyse}/>

</Switch>

)
  }
  
  
  
  
  export default App;