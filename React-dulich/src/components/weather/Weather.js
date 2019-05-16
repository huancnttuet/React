import React, {useState} from 'react';
import { Area, AreaChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios'


async function  allApi() {
  const appid = '5c645c97ea7528a19f56f09500a810d6'
  var diadiem = 'Haiphong'
  var data = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${diadiem}&appid=${appid}`)
  return data
}



function Weather(props) {
  const [data, setData] = useState([])
  const [once, setOnce] = useState(false)
  if(!once){
    allApi().then((req) => {
      console.log(req.data.list);
      var array = []

      req.data.list.map((value, index) => {
        var ts = ''
        var tp
        if(index % 8 === 0){
          ts = value.dt_txt.split(' ')[0].split('-')[2] + '-' + value.dt_txt.split(' ')[0].split('-')[1]
          tp = Math.ceil(value.main.temp - 273.15)
          array.push(
            {day: ts, temp: tp}
          )
        }
      })
      console.log(array)
      setData(array)
      setOnce(true)
    })
  }
  return (
    <div>
      <AreaChart width={500} height={180} data={data}
        margin={{ top: 50, right: 30, left: 90, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>

        </defs>
        <XAxis dataKey="day" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="temp" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />

      </AreaChart>
    </div>
  )
}

export default Weather
