import Layout from "../layouts/main";
//import { useState, useEffect } from "react";
//import TimerContainer from '../components/time/TimerContainer';

const OTP = () => {
    async function resendOTP() {
        console.log("resendOTP");
    }
    /*
    const [time, setTime] = useState<number>(7);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    
    const timeToDays = time * 60 * 60 * 24 * 1000;

    let countDownDate = new Date().getTime() + timeToDays;

    useEffect(() => {
        var updateTime = setInterval(() => {
          var now = new Date().getTime();

          var difference = countDownDate - now;

          var newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          var newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

          setMinutes(newMinutes);
          setSeconds(newSeconds);


          if (difference <= 0) {
            clearInterval(updateTime);
            setMinutes(0);
            setSeconds(0);
          }
        })

        return () => {
          clearInterval(updateTime);
        }

      }, [time]);

    /*
    async function stepToAnotherInput(){
        console.log("stepToAnotherInput");
    }

      <TimerContainer
                                    minutes={minutes}
                                    seconds={seconds}
                                  />
*/

    return (
        <Layout>
            <div className="sign-up otp">
                <div className="content26">
                    <div className="heading-and-supporting-text3 title">
                        <div className="title">
                            <b className="heading26 text-color text-start">Xác nhận mã OTP</b>
                            <div className="heading27 text-start mt-2">
                                <span>Nhập mã OTP 6 chữ số được gửi tới số điện thoại bạn đăng ký. </span>
                                <br />
                                <span>
                                    Mã OTP chỉ có hiệu lực trong vòng <b>2 phút</b> .
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="verification-code-input-field-parent content26">
                        <div className="verification-code-input-field">
                            <div className="input-with-label6">
                                <div className="input7">
                                    <div className="mega-input-field-base">
                                        <input className="text68 border-none text-center" placeholder="1" />
                                    </div>
                                    <div className="mega-input-field-base1 color-gray-300">
                                        <input
                                            className="text68 border-none text-center color-gray-300"
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="mega-input-field-base1">
                                        <input className="text68 border-none text-center" placeholder="0" />
                                    </div>
                                    <div className="mega-input-field-base1">
                                        <input className="text68 border-none text-center" placeholder="0" />
                                    </div>
                                    <div className="mega-input-field-base1">
                                        <input className="text68 border-none text-center" placeholder="0" />
                                    </div>
                                    <div className="mega-input-field-base1">
                                        <input className="text68 border-none text-center" placeholder="0" />
                                    </div>
                                </div>
                            </div>
                            <div className="hint-text6">This is a hint text to help user.</div>
                        </div>
                        <div className="button-parent">
                            <button className="button49">
                                <div className="text75" onClick={() => resendOTP()}>
                                    Gửi lại mã OTP
                                </div>
                            </button>
                            <div className="heading28 mt-2">01:23</div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OTP;
