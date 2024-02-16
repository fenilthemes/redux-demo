import { addData, updateData } from "@/store/dataSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const defaultParams = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
};

const Addedit = () => {
  const [params, setParams] = useState(defaultParams);
  const router = useRouter();
  const dispatch = useDispatch();

  const { data } = router.query;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formHandler = (values) => {
    if (data) {
      dispatch(updateData({ ...values, id: params.id }));
      router.push('/');
    } else {
      dispatch(addData(values));
      router.push('/');
    }
  };

  useEffect(() => {
    if (data) {
      // If data is provided in the query, fetch it from local storage based on the ID
      const storedData = JSON.parse(localStorage.getItem('data'));
      console.log(storedData,"storedDatastoredData")
      const foundData = storedData?.find(item => item.id === data);
      if (foundData) {
        setParams(foundData);
      }
    }
  }, [data]);

  return (
    <div>
      <Formik
        initialValues={params}
        onSubmit={formHandler}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="Jane" />
            <ErrorMessage name="firstName" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Doe" />
            <ErrorMessage name="lastName" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />
            <ErrorMessage name="email" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
      
    </div>
  );
};

export default Addedit;
