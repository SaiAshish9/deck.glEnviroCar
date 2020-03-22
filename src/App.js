 
  import React,{useRef,useState,useEffect} from "react";
    
  import DeckGL from "@deck.gl/react";
  import { ScatterplotLayer } from "@deck.gl/layers";
  import { StaticMap } from "react-map-gl";
  
  import * as d3 from "d3";

  
  const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2FpYXNoaXNoIiwiYSI6ImNrMWdyNTc4cjA3dzEzb2sxaTlrdzFiOHoifQ.B1JQ-8A43BNcL-0kMxO9Bg';
  
  const MALE_COLOR = [0, 128, 255];
  const FEMALE_COLOR = [255, 0, 128];
  
const {curveCardinal, line,select, axisBottom, axisRight, scaleLinear, scaleBand }=d3

  const App =()=>{

const svgRef=useRef()
const svgRef1=useRef()
const svgRef2=useRef()


const [hover,isHover]=useState(false)

const [data1, setData1] = useState([]);

const [data,setData]=useState([])

const [X,setX]=useState('')

const [Y,setY]=useState('')

const [layers,setLayers]=useState('')


useEffect(()=>{
  fetch('https://envirocar.org/api/stable/measurements')
  .then(data=>data.json())
  .then(d=>{

var messages=d.features.map(x=>x['properties']['phenomenons']['GPS Speed']['value'])    

setData1(messages)

d=d.features.map(x=>x['geometry']['coordinates'])

d.forEach((x,k)=>{
var i=Math.floor(Math.random() *3)  
x.push(i,messages[k])}
)

console.log(d)
setData(d)
})

},[])

 useEffect(()=>{
  setLayers([
    new ScatterplotLayer({
      id: 'scatter-plot',
      data:data,
      radiusScale: 10,
      radiusMinPixels: 2,
      pickable: true,
      getPosition: d => [d[0], d[1], 0],
      getColor: d => (d[2] === 1 ? MALE_COLOR : FEMALE_COLOR),
      onHover:d=>{

        isHover(true)
        setX(d.x)
        setY(d.y)
        setTimeout(()=>{
      isHover(false)
        },3000)
      }
    })
])
 })
 
 
 useEffect(() => {
  const svg = select(svgRef.current);
  const xScale = scaleBand()
    .domain(data1.map((value, index) => index))
    .range([0, 400])
    .padding(0.1);

  const yScale = scaleLinear()
    .domain([0, 150])
    .range([150, 0]);

  const colorScale = scaleLinear()
    .domain([100, 130, 170])
    .range([`rgb(${MALE_COLOR})`, `rgb(${FEMALE_COLOR})`, "red"])
    .clamp(true);

  const xAxis = axisBottom(xScale)
               .ticks(data1.length)
               .tickFormat(index=>index+1)

  svg
    .select(".x-axis")
    .style("transform", "translateY(150px)")
    .call(xAxis);

  const yAxis = axisRight(yScale)


  svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

  svg
    .selectAll(".bar")
    .data(data1)
    .join("rect")
    .attr("class", "bar")
    .style("transform", "scale(1, -1)")
    .attr("x", (value, index) => xScale(index))
    .attr("y", -150)
    .attr("width", xScale.bandwidth())
    .transition()
    .duration(1000)
    .attr("fill", colorScale)
    .attr("height", value => 150 - yScale(value));
}, [data1]);


useEffect(()=>{

  const svg1=select(svgRef1.current)

  const myLine=line()
               .x((val,i)=>i*50)
               .y(val=>val)

svg1.selectAll('path')
    .data([data1])
    .join('path')
    .attr("d",val=>myLine(val))
    .attr("fill",'none')
    .attr('stroke',`rgb(${FEMALE_COLOR})`)

    const svg2=select(svgRef2.current)

    const myLine1=line()
                 .x((val,i)=>i*50)
                 .y(val=>20-val)
                 .curve(curveCardinal)
  
  svg2.selectAll('path')
      .data([data1])
      .join('path')
      .attr("d",val=>myLine1(val))
      .attr("fill",'none')
      .attr('stroke',`rgb(${MALE_COLOR})`)

},[data1])


      return (
<div style={{background: '#f4f4f4',height:'100vh',width:'100%'}}>



<div className="bg-dark" style={{color:'white',textAlign:'center',fontWeight:'bold',position:'absolute',zIndex:1,top:0,width:'100%',minHeight:'8vh',display:'flex',alignItems:'center'}}>

<a style={{color:'white',cursor:'pointer',marginLeft:20}}>
<i className="fa fa-car" aria-hidden="true" style={{color:'white',fontSize:20}}></i>
</a>
<h2 className="navbar-brand" style={{marginLeft:10}}>
enviroCar
</h2>

<h6 className=" navbar-brand pull-right" style={{color:'white',position:'absolute',right:260}}>
track1
</h6>

<h6 className=" navbar-brand pull-right" style={{color:'white',position:'absolute',right:180}}>
track2
</h6>

<h6 className=" navbar-brand pull-right" style={{color:'white',position:'absolute',right:100}}>
track3
</h6>

<h6 className=" navbar-brand pull-right" style={{color:'white',position:'absolute',right:20}}>
track4
</h6>

</div>

        <DeckGL
        initialViewState= {{
          longitude: 6.5,
          latitude: 51.255,
          zoom: 11,
          maxZoom: 16
        }}
          controller={true}
          layers={layers}
          style={{
            height:'60vh',
            width:'40%',
            margin:60,
            marginTop:'20vh',
            border:'2px solid white'
          }}
        >
          <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} mapStyle={'mapbox://styles/mapbox/light-v9'} />

{hover && X ?( 
<div style={{display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',fontWeight:'bold',height:'5vh',width:'8%',position:'absolute',zIndex:1, left:X, top:Y}}>
  <h6 style={{fontWeight:'bold',margin:'auto'}}>
  {X.toFixed(1)} km/h
  </h6>
</div>):null
  }
    
    
        </DeckGL>

<div style={{position:'absolute',left:'55%',top:'20vh'}}>

<svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
        </div>

<div style={{position:'absolute',left:'55%',top:'50vh'}}>

<svg ref={svgRef1}  >

</svg>

<br/>
<svg ref={svgRef2} style={{position:'relative',bottom:50}} >

</svg>
<br/>

<h5 style={{color:'red',position:'relative',bottom:130,left:50,fontWeight:'bold'}}>
<i class="fa fa-tachometer " style={{fontSize:30,color:'red',marginRight:10}}></i>
  GPS Speed Analysis
</h5>

        </div>

<h4 style={{position:'absolute',left:'35%',bottom:20,display:'flex',width:'100%',justfyContent:'center',textAlign:'center',margin:'auto',alignItems:'center'}}>
  Made with 💖 by Sai Ashish
</h4>

</div>
    

      );
    }
  
  
  
  
  export default App;