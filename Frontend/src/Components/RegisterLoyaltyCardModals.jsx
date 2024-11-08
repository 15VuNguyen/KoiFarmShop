import React, { useState } from 'react'
import { Form, Button, Modal, InputGroup } from 'react-bootstrap'
import "./RegisterLoyaltyCardModals.css"
import { sendOtpCode } from '../services/loyaltyCardService'

const RegisterLoyaltyCardModals = (props) => {
    const { show, handleClose } = props
    const [phoneNumber, setPhoneNumeber] = useState("")
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [otpCode, setOtpCode] = useState();
    const [isValidate, setIsValidate] = useState(false)

    const handleSendOtpCode = async () => {
        try {
            const {data} = await sendOtpCode(phoneNumber)
            if(data){
                console.log("code: ", data)
                setOtpCode(data.result.code)
            }
        } catch (error) {
            console.error({ message: error.message })
        }
    }

    const handleRegister = async () => {
        try {

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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(otp.join(''));
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