import React, { useEffect, useState } from 'react'
import { Form, Button, Modal, InputGroup } from 'react-bootstrap'
import "./RegisterLoyaltyCardModals.css"
import { registerLoyaltyCard, sendOtpCode } from '../services/loyaltyCardService'
import { toast } from 'react-toastify'

const RegisterLoyaltyCardModals = (props) => {
    const { show, handleClose, setCard, onRegisterSuccess } = props
    const [phoneNumber, setPhoneNumeber] = useState("")
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [otpCode, setOtpCode] = useState();
    const [isValidate, setIsValidate] = useState(false)
    

    useEffect(()=>{
        setIsValidate(false)
    },[])

    const handleSendOtpCode = async () => {
        try {
            const {data} = await sendOtpCode(phoneNumber)
            if(data.result && data.result.code){
                console.log(data.result.code)
                setOtpCode(data.result.code)
                setIsValidate(true)
            }else{
                console.log(data.message)
            }
        } catch (error) {
            console.error({ message: error.message })
        }
    }

    const handleRegister = async () => {
        try {
            const {data} = await registerLoyaltyCard(phoneNumber, otpCode)
            if(data.result){
                toast.success("Register successfully")
                setCard(data.result)
                if(onRegisterSuccess){
                    onRegisterSuccess()
                }
            }else{
                console.log({message: data.message})
            }
        } catch (error) {
            console.error({ message: error.message })

        }
    }

    const handleChange = (element, index) => {
        const value = element.value;
        if (/^\d$/.test(value) || value === '') {
          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);
    
          if (value !== '' && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
          }
        }
      };   


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {!isValidate ?
                <Form className=''>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Phone number"
                                aria-label="Phone number"
                                aria-describedby="basic-addon1"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumeber(e.target.value)}
                            />
                        </InputGroup>
                        </Form>
                        :
                        <Form className='form'>
                            <div className="otp-inputs">
                                {otp.map((value, index) => (
                                    <input
                                        key={index}
                                        id={`otp-input-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={value}
                                        onChange={(e) => handleChange(e.target, index)}
                                        className="otp-input"
                                    />
                                ))}
                            </div>
                        </Form>
                    }
            </Modal.Body>
            <Modal.Footer>
                {!isValidate ?
                    <Button variant="primary" onClick={() => handleSendOtpCode()}>
                        Next
                    </Button>
                    :
                    <Button variant="primary" onClick={() => handleRegister()}>
                        Submit
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default RegisterLoyaltyCardModals