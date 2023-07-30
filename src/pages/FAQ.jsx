import React from 'react';
import { useNavigate } from 'react-router-dom';

import Divider from '@mui/joy/Divider';


function FAQ(props) {

    const navigate = useNavigate();

    return (
        <div className='Page-container'>
            <h1>Frequently Asked Quesions</h1>
            <Divider></Divider>
            <h2>I want to cancel my account.</h2>
            <p>{"Before proceeding with the account cancellation, may I kindly ask you to consider the following options:"}</p>
            <p><strong>Personalized Assistance:</strong> Our dedicated customer support team is available to address any concerns or issues you are facing. If there's anything specific that's bothering you, please let us know, and we'll do our utmost to assist you and find a satisfactory resolution.</p>
            <p><strong>Account Adjustment:</strong> If you are encountering any difficulties with your account, such as billing errors or service-related problems, please allow us the chance to rectify the situation. Often, issues can be resolved swiftly with the right intervention. </p>
            <p><strong>Pause Account:</strong> If your reason for wanting to cancel is temporary, consider suspending your account instead. This way, you won't lose any data or settings, and you can reactivate your account when you're ready to use our services again.</p>
            <p><strong>Explore New Features:</strong> Our platform might have undergone updates and improvements since you initially signed up. I encourage you to check out the latest features and enhancements we offer. You might discover that our services are now even better suited to meet your needs.</p>
            <Divider></Divider>
            <h2>I have a question about a recent purchase.</h2>
            <p>Recent purchase information can be found in the mobile app by clicking the account button then clicking on purchase history.</p>
            <p>If the customer can't resolve their question, we can look into their purchase history in more detail.</p>
            <Divider></Divider>
            <h2>I purchased a new vehicle and I want my subscription transferred.</h2>
            <p>We can update the vehicle that a subscription applies to. In order to do this, view the user's account, click the "subscriptions" tab, and edit the subscription to change the subscription's vehicle.</p>
            <Divider></Divider>
            <h2>I am not able to get a wash (usually due to their account being in an overdue status resulting from a failed membership payment).</h2>
            <p>First, verify that the customer has a valid payment method on file. If not, kindly ask them to update their payment info, and try to get a wash again.</p>
            <p>If the customer has a valid payment method on file, contact the car wash owner for further troubleshooting.</p>
        </div>
    );
}

export default FAQ;