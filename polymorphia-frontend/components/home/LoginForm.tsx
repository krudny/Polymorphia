"use client"

import React, { useState } from 'react';
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import NavigationArrow from "@/components/slider/NavigationArrow";
import LoginFormProps from "@/interfaces/home/LoginFormInterface";

export default function LoginForm({ onBack }: LoginFormProps) {
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
      <div className=" relative flex justify-center items-center w-full max-w-xl">
        <NavigationArrow direction="left" onClick={onBack} className="cursor-pointer"/>
        <div className="w-full max-w-xs text-center text-[#262626] mt-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                  type="email"
                  id="email"
                  className="w-full text-center text-4xl py-3 border-b-2 border-[#262626] focus:outline-none"
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
                  className="w-full text-center text-4xl py-3 border-b-2 border-[#262626] focus:outline-none"
                  placeholder="Twoje hasło"
                  value={password}
                  onChange={handlePasswordChange}
                  required
              />
            </div>

            <ButtonWithBorder text="Zaloguj się" className="mt-12"/>
          </form>
          <div className="mt-4 text-center text-xl hover:cursor-pointer">
            <p>Zapomniałeś hasła?</p>
          </div>
        </div>
      </div>
  );
}