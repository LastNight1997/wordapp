import React from 'react';
import { material } from 'react-native-typography';
import { Form, Item, Label, Input, Button, Text } from 'native-base';
import styles from '../SignInForm/styles';

const InnerSignUpForm = ({
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
      注册验证码已经发送到您的邮箱，请使用验证码完成注册
    </Text>
    <Text style={styles.errorLabel}>{errors.duplicate || ' '}</Text>
    <Item stackedLabel>
      <Label>电子邮箱</Label>
      <Input
        disabled
        value={values.email}
      />
    </Item>
    <Item stackedLabel>
      <Label>用户名</Label>
      <Input
        disabled
        value={values.userName}
      />
    </Item>

    <Item stackedLabel error={touched.token && !!errors.token}>
      <Label>验证码</Label>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        value={values.token}
        onChangeText={text => setFieldValue('token', text)}
        onBlur={() => setFieldTouched('token', true)}
      />
    </Item>
    <Text style={styles.errorLabel}>{touched.token ? errors.token : ' '}</Text>

    <Item stackedLabel error={touched.password && !!errors.password}>
      <Label>密码</Label>
      <Input
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        value={values.password}
        onChangeText={text => setFieldValue('password', text)}
        onBlur={() => setFieldTouched('password', true)}
      />
    </Item>
    <Text style={styles.errorLabel}>{touched.password ? errors.password : ' '}</Text>

    <Item stackedLabel error={touched.confirm && !!errors.confirm}>
      <Label>确认密码</Label>
      <Input
        secureTextEntry
        autoCapitalize="none"
        value={values.confirm}
        onChangeText={text => setFieldValue('confirm', text)}
        onBlur={() => setFieldTouched('confirm', true)}
      />
    </Item>
    <Text style={styles.errorLabel}>{touched.confirm ? errors.confirm : ' '}</Text>

    <Button
      block
      onPress={handleSubmit}
      disabled={isSubmitting || !isValid}
    >
      <Text>注册</Text>
    </Button>
  </Form>
);

export default InnerSignUpForm;
