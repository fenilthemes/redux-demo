import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import * as Yup from "yup";

const defaultParams = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
};

const NormalAddEdit = () => {

    const [params, setParams] = useState(defaultParams);
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
    });

    const formHandler = (values) => {
        // If there's an ID, it's an edit; otherwise, it's an add operation
        if (params.id) {
            // Perform edit operation
            const editedData = JSON.parse(localStorage.getItem('employees')).map(emp => {
                if (emp.id === params.id) {
                    return { ...emp, ...values };
                }
                return emp;
            });
            localStorage.setItem('employees', JSON.stringify(editedData));
        } else {
            // Perform add operation
            const newEmployee = { id: Date.now().toString(), ...values };
            const data = JSON.parse(localStorage.getItem('employees')) || [];
            data.push(newEmployee);
            localStorage.setItem('employees', JSON.stringify(data));
        }
        // Redirect to normal page after add/edit
        router.push('/normal');
    };

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

export default NormalAddEdit;
