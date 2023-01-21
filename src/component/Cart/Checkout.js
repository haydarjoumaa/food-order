import classes from "./checkout.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
const Checkout = (props) => {
  const formik = useFormik({
    initialValues: {
      Name: "",
      street: "",
      email: "",
      postalnumber: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("this field is required"),
      street: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("this field is required"),
      postalnumber: Yup.number()
        .required("this field is required")
        .positive("must be positive number")
        .max(100, "less than 100"),
      email: Yup.string()
        .email("Invalid email address")
        .required("this field is required"),
    }),
    onSubmit: (values) => {
      props.onsubmit(values);
    },
  });
  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="Name">Your Name</label>
        <input
          type="text"
          id="Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Name}
        />
        {formik.touched.Name && formik.errors.Name ? (
          <div style={{ color: "red" }}>{formik.errors.Name}</div>
        ) : null}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.street}
        />
        {formik.touched.street && formik.errors.street ? (
          <div style={{ color: "red" }}>{formik.errors.street}</div>
        ) : null}
      </div>
      <div className={classes.control}>
        <label htmlFor="postalnumber">Postal Code</label>
        <input
          type="text"
          id="postalnumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.postalnumber}
        />
        {formik.touched.postalnumber && formik.errors.postalnumber ? (
          <div style={{ color: "red" }}>{formik.errors.postalnumber}</div>
        ) : null}
      </div>
      <div className={classes.control}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        ) : null}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
