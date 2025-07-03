import React from 'react';
import { within, userEvent, expect } from '@storybook/test';
import { fn } from 'storybook/test';
import LoginForm from './LoginForm';

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
  args: {
    onSubmit: fn(),
    onForgotPassword: fn(),
  },
};

export const Default = {};

export const WithRememberChecked = {
  args: {
    remember: true,
  },
};

export const InteractionTest = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByTestId('email-input');
    const passwordInput = canvas.getByTestId('password-input');
    const rememberCheckbox = canvas.getByTestId('remember-checkbox');
    const submitButton = canvas.getByTestId('submit-btn');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(rememberCheckbox);
    await userEvent.click(submitButton);

    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      remember: true,
    });
  },
};