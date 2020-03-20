 
  import React from "react";
    
  import DeckGL from "@deck.gl/react";
  import { ScatterplotLayer } from "@deck.gl/layers";
  import { StaticMap } from "react-map-gl";
  
  

  
  const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2FpYXNoaXNoIiwiYSI6ImNrMWdyNTc4cjA3dzEzb2sxaTlrdzFiOHoifQ.B1JQ-8A43BNcL-0kMxO9Bg';
  
  const MALE_COLOR = [0, 128, 255];
  const FEMALE_COLOR = [255, 0, 128];
  


  class App extends React.Component  {

state={
  data:[],
  X:'',
  Y:''
}



componentDidMount(){
  fetch('https://envirocar.org/api/stable/measurements')
  .then(data=>data.json())
  .then(d=>{

var messages=d.features.map(x=>x['properties']['phenomenons']['GPS Speed']['value'])    

d=d.features.map(x=>x['geometry']['coordinates'])

d.forEach((x,k)=>{
var i=Math.floor(Math.random() *3)  
x.push(i,messages[k])}
)

console.log(d)
this.setState({data:d})
  })

}

render(){
  
  const layers = [

    new ScatterplotLayer({
      id: 'scatter-plot',
      data:this.state.data,
      radiusScale: 12,
      radiusMinPixels: 3,
      pickable: true,
      getPosition: d => [d[0], d[1], 0],
      getColor: d => (d[2] === 1 ? MALE_COLOR : FEMALE_COLOR),
      onHover:d=>this.setState({...this.state,X:d.x, Y:d.y})
    })
]

      return (
<div>

<a className='btn btn-dark bg-white' style={{color:'black',fontWeight:'bold',position:'absolute',top:'15vh',left:'10%',zIndex:1}} 
href="https://github.com/SaiAshish9/deck.glEnviroCar" >
Source Code
</a>


<a className='btn btn-dark bg-white' style={{color:'black',fontWeight:'bold',position:'absolute',bottom:'15vh',right:'10%',zIndex:1}} href="https://envirocar.org/api/stable/measurements" >
Show JSON Data
</a>

<a className='btn btn-dark ' style={{color:'white',fontWeight:'bold',position:'absolute',bottom:'15vh',left:'10%',zIndex:1}} >
Check Console Data
</a>

<div className="bg-dark" style={{color:'white',textAlign:'center',fontWeight:'bold',position:'absolute',zIndex:1,top:0,width:'100%',minHeight:'8vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
<h3>
deck.gl React Based Visualization Of Envirocar Measurements Api Data
</h3>
</div>

        <DeckGL
        initialViewState= {{
          longitude: 6.4847,
          latitude: 51.26,
          zoom: 12,
          maxZoom: 16
        }}
          controller={true}
          layers={layers}
        >
          <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} mapStyle={'mapbox://styles/mapbox/light-v9'} />
    {
      this.state.X?(
<div style={{display:'flex',alignItems:'center',justifyContent:'center',background:'white',border:'1px solid black',textAlign:'center',fontWeight:'bold',height:'5vh',width:'8%',position:'absolute',zIndex:1, left:this.state.X, top:this.state.Y}}>
  <h6 style={{fontWeight:'bold',margin:'auto'}}>
  {this.state.X} km/h
  </h6>
</div>
      ):null
    }
    
    
        </DeckGL>

<div className="bg-dark" style={{color:'white',textAlign:'center',fontWeight:'bold',position:'absolute',zIndex:1,bottom:0,width:'100%',minHeight:'6vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
<h3>

Made with 💖 by Sai Ashish

</h3>
</div>

        </div>

      );
    }
    }
  
  
  
  
  export default App;