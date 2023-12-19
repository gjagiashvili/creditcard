
import { useEffect, useState } from "react";
import "./Form.scss";

import logo from '../images/card-logo.svg'
import back from '../images/bg-card-back.png'
import front from '../images/bg-card-front.png'
import background from '../images/bg-main-desktop.png'

import completed from '../images/icon-complete.svg'

const Form = () => {


  const [number, setNumber] = useState("0000 0000 0000 0000");

  const [name, setName] = useState("Jane Appleseed");

  const [month, setMonth] = useState("00");
  const [year, setYear] = useState("00");

  const [cvc, setCVC] = useState("000");

  const [submit, setSubmit] = useState(true);
  const [over, setOver] = useState(false);


  const submitHandler = (event) => {
    event.preventDefault();
    setSubmit(!submit);
  };


  const overHandler = () => {
    setOver(true);
  }


  const formatNums = (splitDigit) => {
    const digitString = splitDigit.toString();
    const formatNumsDigit = digitString.replace(/(\d{4})/g, '$1 ');
    return formatNumsDigit.trim();
  }

  return (
    <div className="main-form">
      <div className="imgs">
        <img src="../images/bg-main-desktop.png" />
      </div>
      <div className="front-card">
        <div className="logo-img">
          <img src={logo}/>
        </div>

        <div className="front-card-bg">
          <img src={front}/>
        </div>

        <div className="credentials">
          <p className="number">{formatNums(number)}</p>

          <div className="card-infos">

            <p className="name">{name}</p>
            <p className="dates">{`${month}/${year}`}</p>
          </div>
        </div>
      </div>


      <div className="card-back">

        <img src={back}/>

        <div className="card-back-info">
          <p>{cvc}</p>
        </div>
      </div>

      <div className="main-bg">
        <img src={background}/>
      </div>

      <div className="main-form-fields">
        
        {submit ? (

          <form onSubmit={submitHandler}>

            <label>CARDHOLDER NAME</label>
            <input
              required
              type="text"
              placeholder="e.g Jane Appleseed"
              onChange={(e) => setName(e.target.value)}
              over={over.toString()}
            />

            <span>Only letters can be used for this field</span>

                <label>CARD NUMBER </label>
           <input
            required
            maxLength={16} 
            onChange={(e) => {
                const inputValue = e.target.value.replace(/\D/g, ''); 
                const formattedValue = inputValue
                .replace(/(\d{4})(?=\d)/g, '$1 ');
                if (inputValue.length <= 16) {
                setNumber(formattedValue);
                } else {
                alert('Maximum length is 163')
                }
            }}
            type="number" 
            pattern="\d{4} \d{4} \d{4} \d{4}" 
            placeholder="e.g. 1234 5678 9123 0000"/>


            <div className="main-formField-date">
              <div className="top">
                <label className="label">EXP. DATE. MM/YY</label>
                <label className="cvc-label label">  CVC  </label>
              </div>

              <div className="bottom">
                <div className="formField-year">
                  <div className="formField-year-wrapper">
                    <input
                    required
                    pattern="[0-9]+" 
                    min={0}
                    maxLength={2} 
                    className="month"
                    type="phone"
                    placeholder="MM"
                    onChange={(e) => setMonth(e.target.value)}
                    over={over.toString()}
                    />

                    <input
                    required
                    pattern="[0-9]+" 
                    maxLength={4} 
                    min={0}
                    className="year"
                    type="phone" 
                    placeholder="YY"
                    onChange={(e) => setYear(e.target.value)}
                    onBlur={overHandler}
                    over={over.toString()}
                    />

                    <span>Can't be blank</span>
                  </div>

                </div>

                <div className="cvcInput">
                  <input
                    required
                    className="cvc"
                    type="tel"
                    name="cvc"
                    pattern="\d*"
                    placeholder="e.g. 123"
                    maxLength={3}
                    min={0}
                    onChange={(e) => setCVC(e.target.value)}
                    onBlur={overHandler}
                    over={over.toString()}
                    />

                  <span>Can't be blank</span>
                </div>
              </div>
            </div>

            <button>Confirm</button>
          </form>
        ) : (

          <div className="completed-page">
            <img src={completed} />

            <h3>Thank You!</h3>
            <span>We' ve added your card details</span>


            <button onClick={submitHandler}>Continue</button>
          </div>

        )}

      </div>
    </div>

  );
};

export default Form;
