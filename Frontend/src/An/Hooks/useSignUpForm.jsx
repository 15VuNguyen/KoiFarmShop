import { useState } from "react";

const useSignUpForm = (initialState) => {
    const [state, setState] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (evt) => {
        const value = evt.target.value;
        setState(prevState => ({
            ...prevState,
            [evt.target.name]: value
        }));

        // Clear error when input changes
        setErrors(prevErrors => ({
            ...prevErrors,
            [evt.target.name]: ""
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!state.name.trim()) {
            newErrors.name = "Tên là bắt buộc";
        }
        if (!state.email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(state.email)) {
            newErrors.email = "Email không hợp lệ";
        }
        if (!state.password.trim()) {
            newErrors.password = "Mật khẩu là bắt buộc";
        }
        if (state.password !== state.confirm_password) {
            newErrors.confirm_password = "Mật khẩu không khớp";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (onSubmit, e) => {
        e.preventDefault();
        if (validate()) {
            const isSuccess = await onSubmit(state); 
            if (isSuccess) {
                setState(initialState); 
            }
        }
    };

    return {
        state,
        errors,
        handleChange,
        handleSubmit
    };
};

export default useSignUpForm;
