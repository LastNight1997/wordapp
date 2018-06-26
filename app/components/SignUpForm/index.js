import { withFormik } from 'formik';
import { object, string, ref } from 'yup';
import http from 'app/http';
import constants from 'app/constants';
import InnerSignUpForm from './dumb';

const SignUpForm = withFormik({
  mapPropsToValues: ({ email, userName }) => ({ email, userName }),
  validationSchema: object().shape({
    token: string().required('请输入验证码'),
    password: string().required('请输入密码'),
    confirm: string()
      .oneOf([ref('password'), null], '确认与密码不一致')
      .required('请确认密码'),
  }),
  handleSubmit: async (values, { props, setSubmitting, setErrors }) => {
    const {
      email, userName, token, password,
    } = values;
    try {
      await http().post(constants.endPoint.signUp, {
        email,
        name: userName,
        token,
        password,
      });
      props.onSuccess();
    } catch (error) {
      const { response } = error;
      if (response.status === 409) {
        if (response.data.category === 'EMAIL') {
          setErrors({ duplicate: '该邮箱地址已被注册' });
        }
        if (response.data.category === 'USERNAME') {
          setErrors({ duplicate: '用户名已被注册' });
        }
      } else if (response.status === 400 && response.data.category === 'TOKEN') {
        setErrors({ token: '您输入的验证码无效' });
      } else {
        setErrors({ duplicate: '注册失败' });
      }
    }
    setSubmitting(false);
  },
})(InnerSignUpForm);


export default SignUpForm;
