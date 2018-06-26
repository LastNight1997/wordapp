import React from 'react';
import { material } from 'react-native-typography';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import styles from '../SignInForm/styles';

const InnerPreSignUpForm = ({
  values,
  errors,
  touched,
  isValid,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  setFieldTouched,
}) => (
  <Form>
    <Text style={[material.caption, { alignSelf: 'center' }]}>
      {values.afterSignUp ? '您已成功注册，请登录' : ' '}
    </Text>
    <Item stackedLabel error={touched.email && !!errors.email}>
      <Label>电子邮箱</Label>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        value={values.email}
        onChangeText={text => setFieldValue('email', text)}
        onBlur={() => setFieldTouched('email', true)}
      />
    </Item>
    <Text style={styles.errorLabel}>{touched.email ? errors.email : ' '}</Text>
    <Item stackedLabel error={touched.userName && !!errors.userName}>
      <Label>用户名</Label>
      <Input
        autoCorrent={false}
        autoCapitalize="none"
        value={values.userName}
        onChangeText={text => setFieldValue('userName', text)}
        onBlur={() => setFieldTouched('userName', true)}
      />
    </Item>
    <Text style={styles.errorLabel}>{touched.userName ? errors.userName : ' '}</Text>
    <Button
      block
      onPress={handleSubmit}
      style={styles.button}
      disabled={isSubmitting || !isValid}
    >
      <Text>发送注册邮件</Text>
    </Button>
  </Form>
);

export default InnerPreSignUpForm;
