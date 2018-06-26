import React from 'react';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import { material } from 'react-native-typography';
import styles from './styles';

const InnerSignInForm = ({
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
    <Item stackedLabel error={touched.password && !!errors.password}>
      <Label>密码</Label>
      <Input
        secureTextEntry
        autoCapitalize="none"
        value={values.password}
        onChangeText={text => setFieldValue('password', text)}
        onBlur={() => setFieldTouched('password', true)}
      />
    </Item>
    <Text style={styles.errorLabel}>{touched.password ? errors.password : ' '}</Text>
    <Button
      block
      onPress={handleSubmit}
      style={styles.button}
      disabled={isSubmitting || !isValid}
    >
      <Text>登录</Text>
    </Button>
  </Form>
);

export default InnerSignInForm;
