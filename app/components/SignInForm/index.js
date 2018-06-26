import { withFormik } from 'formik';
import { object, string } from 'yup';
import constants from 'app/constants';
import http from 'app/http';
import InnerSignInForm from './dumb';

const SignInForm = withFormik({
  mapPropsToValues: ({ afterSignUp }) => ({ afterSignUp }),
  validationSchema: object().shape({
    email: string().email('请输入有效的电子邮箱地址').required('请输入电子邮箱地址'),
    password: string().required('请输入密码'),
  }),
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    const { email, password } = values;
    try {
      const res = await http().post(constants.endPoint.signIn, { email, password });
      const { userName } = res.data;
      const { authorization } = res.headers;
      if (authorization) {
        props.onSuccess(authorization, userName, email);
      }
    } catch (error) {
      if (error.response.status === 403) {
        setErrors({
          password: '输入的邮箱或密码不正确',
        });
      }
    }
    setSubmitting(false);
  },
})(InnerSignInForm);

export default SignInForm;
