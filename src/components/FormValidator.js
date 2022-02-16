import { useState, useRef } from "react";

function FormValidator() {
  const [isValid, setIsValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState(`Don't Hesitate!`);
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
    password: ""
  });

  const formRef = useRef();
  const message = useRef();
  const password1 = useRef();
  const password2 = useRef();

  const validateForm = () => {
    setIsValid(formRef.current.checkValidity());

    // checking if all fields are filled correctly
    if (!isValid) {
      setValidationMessage("Please fill out all fields.");
      message.current.style.borderColor = "red";
      message.current.style.color = "red";
      return;
    }
    // checking if passwords match
    if (password === confirmPassword) {
      setPasswordMatch(true);
      password1.current.style.borderColor = "green";
      password2.current.style.borderColor = "green";
    } else {
      setPasswordMatch(false);
      password1.current.style.borderColor = "red";
      password2.current.style.borderColor = "red";
      setValidationMessage("Make sure passwords match");
      message.current.style.borderColor = "red";
      message.current.style.color = "red";
      return;
    }

    // checking if password match and fields are filled correctly
    if (isValid && passwordMatch) {
      setValidationMessage("Successfully Registered!");
      message.current.style.borderColor = "green";
      message.current.style.color = "green";
    }
  };

  const storeFormData = () => {
    const form = formRef.current;
    setUser({
      name: form.name,
      phone: form.phone,
      email: form.email,
      website: form.website,
      password: form.password
    });

    console.log(user);
  };

  const processFormData = (e) => {
    e.preventDefault();
    setPassword(e.target[4].value);
    setConfirmPassword(e.target[5].value);

    validateForm();

    if (isValid && passwordMatch) {
      storeFormData();
    }
  };

  return (
    <div className=" w-[480px] h-[630px] bg-white flex flex-col items-center rounded-xl shadow-2xl shadow-black/40">
      <h1 className=" text-4xl font-bold m-4"> Sign Up Today!</h1>
      <form id="form" className="w-[90%]" ref={formRef} onSubmit={processFormData}>
        <div className="form-group">
          {/* Full name */}
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Full Name" name="name" required minLength="3" maxLength="100" />
        </div>
        {/* phone number */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="555-555-5555"
            name="phone"
            required
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
        </div>
        {/* Email address */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="email@address.com" name="email" required />
        </div>
        {/* Website URL */}
        <div className="form-group">
          <label htmlFor="website">Website URL</label>
          <input type="url" id="website" placeholder="http://jondoe.com" name="website" required />
        </div>
        {/* Password */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Create Password (min. 8 characters)"
            title="please include at least 1 uppercase character, 1 lowercase character and 1 number."
            required
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            ref={password1}
          />
        </div>
        {/* Confirm password */}
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            name="password"
            required
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
            ref={password2}
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer text-white bg-black rounded-md h-12 w-full mt-4 text-lg transition-all duration-200 ease-in-out hover:bg-gray-800"
        >
          Register
        </button>
      </form>
      {/* Error/Success message */}
      <div className="m-5 p-5 border border-solid border-black rounded-md w-[90%] flex justify-center" ref={message}>
        <h3 className="text-xl font-bold">{validationMessage}</h3>
      </div>
    </div>
  );
}

export default FormValidator;
