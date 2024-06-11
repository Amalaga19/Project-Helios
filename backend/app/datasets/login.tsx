import React from 'react';
import { Card, Input, Button } from '@nextui-org/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import styles from './Login.module.css';
import { useRouter } from 'next/router';
import { useAuth } from './useAuth';
import { EyeFilledIcon } from "../../../frontend/nextui-dashboard/components/login/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../frontend/nextui-dashboard/components/login/EyeSlashFilledIcon";

const LoginPage: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated()) {
    router.push('/dashboard'); // Redirect to dashboard or home page
    return null;
  }

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Required'),
  });

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Image src="/landing.png" alt="Landing Image" layout="fill" className={styles.image} />
        </div>
      </div>
      <Card className={styles.formWrapper}>
        <h1 className={styles.title}>Helios Platform</h1>
        <p className={styles.description}>Log in using your Barter Account</p>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            // Simulate login process
            setTimeout(() => {
              alert(`Login successful: ${values.username}`);
              setSubmitting(false);
              // Set authenticated state to true (simulate login success)
              // setIsAuthenticated(true);
            }, 1000);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.fieldWrapper}>
                <Field name="username">
                  {({ field, meta }: { field: any, meta: any }) => (
                    <Input
                      {...field}
                      required
                      size="md"
                      label="Barter Email"
                      placeholder="Enter your username"
                      variant="bordered"
                      radius="lg"
                      labelPlacement="outside"
                      color = "primary"
                      fullWidth
                      isInvalid={meta.touched && !!meta.error}
                      errorMessage={meta.touched && meta.error ? meta.error : ""}
                      className={styles.inputField} // Add this line
                    />
                  )}
                </Field>
              </div>

              <div className={styles.fieldWrapper}>
                <Field name="password">
                  {({ field, meta }: { field: any, meta: any }) => (
                    <Input
                      {...field}
                      required
                      size="md"
                      label="Password"
                      placeholder="Enter your password"
                      variant="bordered"
                      radius="lg"
                      labelPlacement="outside"
                      color = "primary"
                      fullWidth
                      type={isPasswordVisible ? "text" : "password"}
                      endContent={
                        <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                          {isPasswordVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                        </button>
                      }
                      isInvalid={meta.touched && !!meta.error}
                      errorMessage={meta.touched && meta.error ? meta.error : ""}
                      className={styles.inputField} // Add this line
                    />
                  )}
                </Field>
              </div>

              <Button type="submit" color="primary" disabled={isSubmitting} className={styles.signInButton}>
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
        <p className={styles.forgotPassword}>
          <a href="/forgot-password">Forgot your Password?</a>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
