import React,{useRef,useState,useEffect} from "react";

import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";

import * as d3 from "d3";

import {withRouter} from 'react-router-dom'
  
const MAPBOX_ACCESS_TOKEN = '';

const MALE_COLOR = [0, 128, 255];
const FEMALE_COLOR = [255, 0, 128];

const TRACK1_COLOR = [6,226,94];
const TRACK2_COLOR = [241,162,21];


const {curveCardinal, line,select, axisBottom, axisRight, scaleLinear, scaleBand }=d3


const Analyse=({history})=>{
    const svgRef=useRef()
    const svgRef1=useRef()
    const svgRef2=useRef()
    
    
    const [hover,isHover]=useState(false)
    
    const [data1, setData1] = useState([]);
    
    const [data,setData]=useState([])
    
    const [X,setX]=useState('')
    
    const [Y,setY]=useState('')
    
    const [layers,setLayers]=useState('')
    
    const [modelNo,setModelNo]=useState(0)
    
    

    const tracks=[
      ['Caliber','5e70ef5577e02d42aaa975bb',[9.02,53.09],8.5,TRACK1_COLOR],
      ['Movano','5e61078a77e02d42aa9844dc',[12.92,50.84],11.5,TRACK2_COLOR],
      ['Picanto','5e74b21765b80c5d6bdf7eb9',[7.8,51.68],10.5,MALE_COLOR],
      ['C180 W204','5e70e16877e02d42aaa8e125',[6.57,51.34],11.5,FEMALE_COLOR]
    ]
    
    const [id,setId]=useState(tracks[0][1])
    
    useEffect(()=>{
    
var a=history.location.pathname.split('k')[1]
if(a)
{setId(tracks[a-1][1])
setModelNo(a-1)
}



    fetch(`https://envirocar.org/api/stable/tracks/${id}`)
    .then(res=>res.json())
    .then(data=>{
      var y=data['features'].map(x=>x['geometry']['coordinates'])
      var z=data['features'].map(x=>x['properties']['phenomenons']['GPS Speed']['value'])
    

     setData1(z)
      
      y.forEach((x,k)=>{
        var i=Math.floor(Math.random() *3)  
        x.push(i,z[k])}
        )
console.log(y)
      setData(y)
    })
    
    },[id])
    
    
    
    
     useEffect(()=>{
      setLayers([
        new ScatterplotLayer({
          id: 'scatter-plot',
          data:data,
          radiusScale: 10,
          radiusMinPixels: 2,
          pickable: true,
          getPosition: d => [d[0], d[1], 0],
          getColor: d =>  tracks[modelNo][4],
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
        .domain([30, 70, 130])
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
                     .y(val=>val)
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
    
    <a href="/" style={{color:'white',cursor:'pointer',marginLeft:20}}>
    <i className="fa fa-car" aria-hidden="true" style={{color:'white',fontSize:20}}></i>
    </a>
    <a href="/" style={{cursor:'pointer',color:'white'}}>

    <h2 href="/" className="navbar-brand" style={{marginLeft:10}}>
    enviroCar
    </h2>
    </a>

    <a
     href="/"

    style={{cursor:'pointer',position:'absolute',right:260}}>
    
    <h6 className=" navbar-brand pull-right" style={{color:'white'}}>
    track1
    </h6>
    
    </a>
    
    <a  
  href="/track2"

    style={{cursor:'pointer',position:'absolute',right:180}}>
    
    <h6 className=" navbar-brand pull-right" style={{color:'white'}}>
    track2
    </h6>
    </a>
    
    <a 

href="/track3"

    
    style={{cursor:'pointer',position:'absolute',right:100}}>
    
    <h6 className=" navbar-brand pull-right" style={{color:'white'}}>
    track3
    </h6>
    
    </a>
    
    <a 
    
  href="/track4"

    style={{cursor:'pointer',position:'absolute',right:20}}>
    
    <h6 className=" navbar-brand pull-right" style={{color:'white'}}>
    track4
    </h6>
    
    </a>
    
    </div>
    I
    <div style={{marginTop:'8vh',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
    
    <h4 style={{marginTop:'2vh'}}>
      Car Model :
      <span style={{color:'blue',marginLeft:20}}>
    {tracks[modelNo][0]}
      </span>
    
    </h4>
    
    </div>
    
            <DeckGL
            initialViewState= {{
              longitude: tracks[modelNo][2][0],
              latitude: tracks[modelNo][2][1],
              zoom: tracks[modelNo][3],
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


export default withRouter(Analyse)
