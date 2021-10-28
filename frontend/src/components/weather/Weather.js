import React, {useState} from 'react';

import { Line } from "react-chartjs-2";
import { MDBContainer, MDBCol, MDBFormInline, MDBBtn } from "mdbreact";
import axios from 'axios'


async function  allApi(diadiem) {
  const appid = '5c645c97ea7528a19f56f09500a810d6'
  var data = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${diadiem}&appid=${appid}`)
  return data
}



function Weather(props) {
  const [data, setData] = useState('')
  const [once, setOnce] = useState(false)
  const [dataW, setDataW] = useState(
    {
      dataLine: {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
          {
            label: "My First dataset",
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(225, 204,230, .3)",
            borderColor: "rgb(205, 130, 158)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgb(205, 130,1 58)",
            pointBackgroundColor: "rgb(255, 255, 255)",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgb(0, 0, 0)",
            pointHoverBorderColor: "rgba(220, 220, 220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [34, 34, 34, 34, 34]
          },
        ]
      }
    }
  )

function handleChange(e) {
  setData(e.target.value)
}

function handleClick() {
    allApi(data).then((req) => {
      console.log(req.data.list);
      var temp = []
      var day = []
      req.data.list.map((value, index) => {
        var ts = ''
        var tp
        if(index % 8 === 0){
          ts = value.dt_txt.split(' ')[0].split('-')[2] + '-' + value.dt_txt.split(' ')[0].split('-')[1]
          tp = Math.ceil(value.main.temp - 273.15)
          temp.push(tp)
          day.push(ts)
        }
      })
      console.log(temp);
      console.log(day);
      setDataW({
        dataLine: {
          labels: day,
          datasets: [
            {
              label: "Nhiệt độ",
              fill: true,
              lineTension: 0.3,
              backgroundColor: "rgba(225, 204,230, .3)",
              borderColor: "rgb(205, 130, 158)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgb(205, 130,1 58)",
              pointBackgroundColor: "rgb(255, 255, 255)",
              pointBorderWidth: 10,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgb(0, 0, 0)",
              pointHoverBorderColor: "rgba(220, 220, 220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: temp
            },
          ]
        }
      })
    })

}
  return (
    <div>
      <MDBContainer>
        <MDBCol md="12">
          <MDBFormInline className="md-form mr-auto mb-4">
            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" onChange={handleChange} />
            <MDBBtn gradient="aqua" rounded size="sm" className="mr-auto" onClick={handleClick}>
              Search
            </MDBBtn>
          </MDBFormInline>
        </MDBCol>
        <h3 className="mt-5">{data}</h3>
        <Line data={dataW.dataLine} options={{ responsive: true }} />
      </MDBContainer>

    </div>
  )
}


export default Weather
