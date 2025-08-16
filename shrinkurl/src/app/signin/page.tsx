// src/app/signin/page.tsx


import React from 'react';
import SignInForm from '../../components/SignInForm';

const SignInPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <SignInForm />
        </div>
    );
};

export default SignInPage;