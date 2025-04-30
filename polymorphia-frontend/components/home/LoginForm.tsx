"use client"

import React, { useState } from 'react';
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import NavigationArrow from "@/components/slider/NavigationArrow";
import LoginFormProps from "@/interfaces/home/LoginFormInterface";

export default function LoginForm({ onBackAction }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Hasło:', password);
  };

  return (
      <div className="login-wrapper">
        <NavigationArrow direction="left" onClick={onBackAction} className="cursor-pointer left-0"/>
        <div>
          <form onSubmit={handleSubmit} className="login-form">
            <div>
              <input
                  type="email"
                  id="email"
                  placeholder="Twój email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  autoComplete="off"
              />
            </div>
            <div>
              <input
                  type="password"
                  id="password"
                  placeholder="Twoje hasło"
                  value={password}
                  onChange={handlePasswordChange}
                  required
              />
            </div>
            <ButtonWithBorder text="Zaloguj się" className="mt-12"/>
          </form>
          <div className="forgot-password">
            <p>Zapomniałeś hasła?</p>
          </div>
        </div>
      </div>
  );
}