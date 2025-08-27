import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './BookingForm.module.css';

const BookingForm = ({ camper }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    bookingDate: Yup.date()
      .min(new Date(), 'Booking date cannot be in the past')
      .required('Booking date is required'),
    comment: Yup.string()
      .max(500, 'Comment must be less than 500 characters')
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log('Booking data:', {
      ...values,
      camperId: camper.id,
      camperName: camper.name
    });
    
    alert('Booking successful! We will contact you soon.');
    resetForm();
  };

  return (
    <div className={styles.bookingForm}>
      <h3 className={styles.formTitle}>Book your campervan now</h3>
      <p className={styles.formSubtitle}>Stay connected! We are always ready to help you.</p>

      <Formik
        initialValues={{
          name: '',
          email: '',
          bookingDate: '',
          comment: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <Field
                type="text"
                id="name"
                name="name"
                className={`${styles.input} ${
                  touched.name && errors.name ? styles.inputError : ''
                }`}
                placeholder="Name*"
              />
              <ErrorMessage name="name" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <Field
                type="email"
                id="email"
                name="email"
                className={`${styles.input} ${
                  touched.email && errors.email ? styles.inputError : ''
                }`}
                placeholder="Email*"
              />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
            <Field
              type="text"
              id="bookingDate"
              name="bookingDate"
              className={`${styles.input} ${
                touched.bookingDate && errors.bookingDate ? styles.inputError : ''
              }`}
              placeholder="Booking date*"
              onFocus={(e) => {
                e.target.type = 'date';
                e.target.focus();
              }}
              onBlur={(e) => {
                if (!e.target.value) {
                  e.target.type = 'text';
                }
              }}
            />
            <ErrorMessage name="bookingDate" component="div" className={styles.error} />
          </div>

            <div className={styles.formGroup}>
              <Field
                as="textarea"
                id="comment"
                name="comment"
                className={`${styles.textarea} ${
                  touched.comment && errors.comment ? styles.inputError : ''
                }`}
                rows="3"
                placeholder="Enter your comments"
              />
              <ErrorMessage name="comment" component="div" className={styles.error} />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;