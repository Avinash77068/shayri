// src/components/SignUp/SignUp.tsx
import { useState } from "react";
import { SignUpFormData, SignUpErrors } from "../../../@typeScript/SignUp";
import api from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../store/slice/Loader";
import { setIsOpenDropDown } from "../../../store/slice/slice";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
    category: "",
    bioMessage: "",
  });
  const [errors, setErrors] = useState<SignUpErrors>({});
  const loader = useSelector((state: any) => state.thirdState.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const e: SignUpErrors = {};
    if (!formData.username.trim()) e.username = "Username is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/.test(formData.email)) e.email = "Invalid email format";
    if (!formData.password.trim()) e.password = "Password is required";
    else if (formData.password.length < 6) e.password = "Password must be at least 6 characters";
    if (!formData.category) e.category = "Please select an option";
    if (!formData.bioMessage?.trim()) e.bioMessage = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(setLoader(true));
    api.post("/user", formData).then(() => {
      navigate("/alluser");
      dispatch(setIsOpenDropDown(false));
      dispatch(setLoader(false));
    });
  };

  return <SignUpForm formData={formData} errors={errors} loader={loader} handleChange={handleChange} handleSubmit={handleSubmit} />;
}
