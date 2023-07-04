import { DatePicker } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
// import 'antd/dist/antd.css';
const Form = () => {
  const [selectLocation, setSelectLocation] = useState("")
  const [inputs, setInputs] = useState({})
  const [cctt, setCctt] = useState("0")
  const [orData, setOrData] = useState([])
  const [origin, setOrigin] = useState("")

  const [cctts, setCctts] = useState({
    Location1: null,
    Location2: null,
    Location3: null,
    Location4: null
  })

  function onOriginChange(so) {

    switch (so) {
      case "KODAK- APML CHOWK, MUMBAI":
        setSelectLocation("MUMABI")
        break;

      case "KODAK-MAXIMO, CHENNAI,TAMIL NADU":
        setSelectLocation("CHENNAI")
        break;

      default:
        break;
    }

    let data = []
    data[0] = selectLocation;
    data[1] = so;

    return data;
  }

  const handlecctt = (e) => {

    setCctts({ ...cctts, [e.target.name]: e.target.value })
    console.log(cctts, "cctt")
    console.log(cctts.Location1, "cctt")
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }))
    console.log(inputs, "inputs")
    console.log(cctt, "cctt")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm()
  }

  const submitForm = () => {

    let dateTime = inputs.PickupDate;
    let date = new Date(dateTime).toString();
    let formattedDate = date.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    let dateTime1 = inputs.ExpectedDeliveryDate;
    let date1 = new Date(dateTime1);
    let formattedDate1 = date1.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    var orders = [];

    var order = {
      Destination: null,
      "Vehicle Type": inputs.VehicleType,
      "Transportation Service": "FTL",
      "Customer(*)": "KODAK INDIA LIMITED",
      "Consignor(*)": orData[1],
      "Consignee(*)": "Unknown",
      "Pickup Date(DD-MM-YYYY)": "16-02-2023",
      "Booking Branch": "Mumbai",
      "Contract Number": null,
      Freight: "100",
      "Measurement Type(*)": "weight",
      "Quantity(*)": "1",
      "Quantity UOM(*)": "Units",
      "cf_Kodak - MATERIAL": inputs.Material,
      "cf_expected pickup date and time": formattedDate,
      "cf_EXPECTED TARGET DATE:": formattedDate1,
      "cf_Number of location": cctt,
      "cf_Consignee 1": cctts.Location1,
      "cf_Consignee 2": cctts.Location2,
      "cf_Consignee 3": cctts.Location3,
      "cf_Consignee 4": cctts.Location4,
      "cf_Special Instructions": inputs.SpecialInstructions,
    };
    orders.push(order);
    console.log(order, "order")
    console.log(orders, "order")

    var config = {
      method: 'post',
      url: "https://apis.fretron.com/automate/autoapi/run/80f5e63d-19e5-4160-817f-ba260f7fe3a4",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzI0MjAxNTcsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.QkU9OIMz0yf76zUJOtp7kVS3yAPZmJS1BMIiM4kxuzk",
        "Content-Type": "application/json",
      },
      data: orders,
    }

    axios(config).then(async (res) => {
      console.log(orders, "orders")
      console.log(res, "rs")
      if (
        res.data.data.successCount === 1 &&
        res.data.data.successCount === 1
      ) {
        alert("order has been placed");

      }
    }).catch(function (error) {
      alert("order has not been placed")
    })

  }


  return (
    <div className='container'>
      <form onSubmit={(e) => { handleSubmit(e) }}>
        <div>
          <label>Origin:</label>
          <select
            name="Origin"
            id='Origin'
            onChange={(e) => {
              handleChange(e)
              setOrData(onOriginChange(e.target.value))
              console.log(orData, "data")
              console.log(orData[1], "data")

            }}
            value={inputs.Origin}
          >
            <option value="">Select an option</option>
            <option value="KODAK- APML CHOWK, MUMBAI">
              KODAK- APML CHOWK, MUMBAI
            </option>
            <option value="KODAK-MAXIMO, CHENNAI,TAMIL NADU">
              KODAK-MAXIMO, CHENNAI,TAMIL NADU
            </option>
            <option value="Others">
              Others
            </option>
          </select>
          {
            orData[1] === "Others" && (
              <div>
                <label htmlFor="otherLocations">Other Locations</label>
                <select name="otherLocations" id="otherLocations" type='text' onChange={(e)=> {setOrigin(e.target.value)}}>
                  <option value="">--select--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            )
          } 
          {
            origin  >= 1 && (
              <div>
                <label htmlFor="originLocation">locations 1</label>
                <input type="text" name='originLocation' />
              </div>
            )
          }
           {
            origin >= 2 && (
              <div>
                <label htmlFor="originLocation">locations 1</label>
                <input type="text" name='originLocation' />
              </div>
            )
          }
           {
            origin >= 3 && (
              <div>
                <label htmlFor="originLocation">locations 1</label>
                <input type="text" name='originLocation' />
              </div>
            )
          }
           {
            origin >= 4 && (
              <div>
                <label htmlFor="originLocation">locations 1</label>
                <input type="text" name='originLocation' />
              </div>
            )
          }

          <label>Location :</label>
          <input
            type="text"
            onChange={(e) => { handleChange(e) }}
            value={selectLocation}
            name="Location"
            required
            disabled
          />

          <label>Vehicle Type:</label>
          <select
            onChange={handleChange}
            value={inputs.VehicleType}
            name="VehicleType"
            required
          >
            <option value="10Ft SXL (C)">10Ft SXL (C)</option>
            <option value="12 FT/CONTAINER REGULAR/SA">12 FT/CONTAINER REGULAR/SA</option>
            <option value="12 FT/CONTAINER REGULAR/SA/TATA 407">12 FT/CONTAINER REGULAR/SA/TATA 407</option>
            <option value="12 FT/PLATFORM REGULAR/SA/10.59">12 FT/PLATFORM REGULAR/SA/10.59</option>
            <option value="14 FT/CONTAINER REGULAR/SA">14 FT/CONTAINER REGULAR/SA</option>
            <option value="14 FT/OPEN BODY/SA">14 FT/OPEN BODY/SA</option>
            <option value="14 FT/PLATFORM REGULAR/SA">14 FT/PLATFORM REGULAR/SA</option>
            <option value="14FT/CLOSED/SA/7.49T/CNG/Eicher Pro 2059XP CNG F CBC">14FT/CLOSED/SA/7.49T/CNG/Eicher Pro 2059XP CNG F CBC</option>
            <option value="16 FT/CONTAINER REGULAR/SA">16 FT/CONTAINER REGULAR/SA</option>
            <option value="16 FT/OPEN BODY/SA">16 FT/OPEN BODY/SA</option>
            <option value="16 FT/PLATFORM REGULAR/SA">16 FT/PLATFORM REGULAR/SA</option>
            <option value="17 FT/CONTAINER REGULAR/SA/10.95">17 FT/CONTAINER REGULAR/SA/10.95</option>
            <option value="17 FT/OPEN BODY/SA/10.95">17 FT/OPEN BODY/SA/10.95</option>
            <option value="17 FT/PLATFORM REGULAR/SA/10.95">17 FT/PLATFORM REGULAR/SA/10.95</option>
            <option value="18 FT/CONTAINER REGULAR/SA/LPT 1613">18 FT/CONTAINER REGULAR/SA/LPT 1613</option>
            <option value="19 FT/CONTAINER REGULAR/SA">19 FT/CONTAINER REGULAR/SA</option>
            <option value="19 FT/OPEN BODY/SA">19 FT/OPEN BODY/SA</option>
            <option value="20 FT/CAR CARRIER /SA">20 FT/CAR CARRIER /SA</option>
            <option value="20 FT/CONTAINER REGULAR/SA">20 FT/CONTAINER REGULAR/SA</option>
            <option value="20 FT/PLATFORM REGULAR/SA">20 FT/PLATFORM REGULAR/SA</option>
            <option value="22 FT/OPEN TAURAS/DA">22 FT/OPEN TAURAS/DA</option>
            <option value="24 FT/CAR CARRIER /SA">24 FT/CAR CARRIER /SA</option>
            <option value="24 FT/CONTAINER REGULAR/DA">24 FT/CONTAINER REGULAR/DA</option>
            <option value="24 FT/CONTAINER REGULAR/SA">24 FT/CONTAINER REGULAR/SA</option>
            <option value="24 FT/OPEN BODY/DA">24 FT/OPEN BODY/DA</option>
            <option value="24 FT/OPEN TAURAS/DA">24 FT/OPEN TAURAS/DA</option>
            <option value="24 FT/PLATFORM REGULAR/SA">24 FT/PLATFORM REGULAR/SA</option>
            <option value="24Ft SXL (P) Air Suspension">24Ft SXL (P) Air Suspension</option>
            <option value="28 FT/PLATFORM REGULAR/DA">28 FT/PLATFORM REGULAR/DA</option>
            <option value="28 FT/PLATFORM REGULAR/SA">28 FT/PLATFORM REGULAR/SA</option>
            <option value="32 FT/ PLATFORM / SA">32 FT/ PLATFORM / SA</option>
            <option value="32 FT/CAR CARRIER TK-5/SA">32 FT/CAR CARRIER TK-5/SA</option>
            <option value="32 FT/CONTAINER REGULAR/DA">32 FT/CONTAINER REGULAR/DA</option>
            <option value="32 FT/CONTAINER REGULAR/SA">32 FT/CONTAINER REGULAR/SA</option>
            <option value="32 FT/PLATFORM REGULAR/DA">32 FT/PLATFORM REGULAR/DA</option>
            <option value="32 FT/PLATFORM REGULAR/DA/FOUZI SCHEME">32 FT/PLATFORM REGULAR/DA/FOUZI SCHEME</option>
            <option value="40 FT/TRAILER FLAT BED/DA">40 FT/TRAILER FLAT BED/DA</option>
            <option value="40 FT/TRAILER FLAT BED/TA">40 FT/TRAILER FLAT BED/TA</option>
            <option value="40 FT/TRAILER SEMI BED">40 FT/TRAILER SEMI BED</option>
            <option value="40FT HB">40FT HB</option>
            <option value="40FT SB">40FT SB</option>
            <option value="40FT SXL (C)">40FT SXL (C)</option>
            <option value="48FT HB">48FT HB</option>
          </select>

        </div>

        <div>

          <label>Transportation Service:</label>
          <select
            onChange={handleChange}
            value={inputs.TransportationService}
            name="TransportationService"
            required
          >
            <option value="">--Select--</option>
            <option value="FTL">FTL</option>
            <option value="PTL">PTL</option>
            <option value="Express">Express</option>
          </select>

          <label>Pickup Date:</label>
          <input
            type="datetime-local"
            onChange={handleChange}
            value={inputs.PickupDate}
            name="PickupDate"
            required
          />

          <label>Special Instructions</label>
          <input
            type="text"
            onChange={handleChange}
            value={inputs.SpecialInstructions}
            name="SpecialInstructions"
          />

        </div>

        <div>

          <label>Material</label>
          <select
            onChange={handleChange}
            value={inputs.Material}
            name="Material"
            required
          >
            <option value="">--Select--</option>
            <option value="Printing pallets">Printing pallets</option>
            <option value="liquid drums">liquid drums</option>

          </select>

          <label>Expected Delivery Date:</label>
          <input
            type="datetime-local"
            onChange={handleChange}
            value={inputs.ExpectedDeliveryDate}
            name="ExpectedDeliveryDate"
            required
          />

          <label htmlFor="cctt">Number of Delivery Locations:</label>
          <select
            onChange={(e) => setCctt(e.target.value)}
            value={inputs.cctt}
            name="cctt"
            id="cctt"
            required
          >
            {console.log(cctt)}

            <option>-- Select --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        {cctt >= 1 && (
          <div>
            <label htmlFor="Location1">Location 1</label>
            <input type="text" id='Location1' name='Location1' onChange={handlecctt} value={cctts.Location1} />
          </div>
        )}
        {cctt >= 2 && (
          <div>
            <label htmlFor="Location2">Location 2</label>
            <input type="text" id='Location2' name='Location2' onChange={handlecctt} value={cctts.Location2} />
          </div>
        )}
        {cctt >= 3 && (
          <div>
            <label htmlFor="Location3">Location 3</label>
            <input type="text" id='Location3' name='Location3' onChange={handlecctt} value={cctts.Location3} />
          </div>
        )}
        {cctt >= 4 && (
          <div>
            <label htmlFor="Location4">Location 4</label>
            <input type="text" id='Location4' name='Location4' onChange={handlecctt} value={cctts.Location4} />
          </div>
        )}
        <div>
          <button>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form