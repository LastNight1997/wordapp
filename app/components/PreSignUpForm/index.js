import { withFormik } from 'formik';
import { object, string } from 'yup';
import constants from 'app/constants';
import http from 'app/http';
import InnerPreSignUpForm from './dumb';

const UpperSignUpForm = withFormik({
  mapPropsToValues: ({ email, userName, afterSignUp }) => ({ email, userName, afterSignUp }),
  validationSchema: object().shape({
    email: string().email('请输入有效的电子邮箱地址').required('请输入电子邮箱地址'),
    userName: string().required('请输入用户名'),
  }),
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    const { email, userName } = values;
    try {
      await http().post(constants.endPoint.preSignUp, { email, name: userName });
      props.onSuccess(email, userName);
    } catch (error) {
      setErrors({
        email: '发生未知错误',
      });
    }
    setSubmitting(false);
  },
})(InnerPreSignUpForm);

export default UpperSignUpForm;
