import { React, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Chip from '@mui/joy/Chip';


function Dashboard(props) {
    const users = useSelector((state) => state.config.users);
    const [totalSubs, setTotalSubs] = useState();
    const [goldSubs, setGoldSubs] = useState();
    const [premiumSubs, setPremiumSubs] = useState();
    const [standardSubs, setStandardSubs] = useState();
    const [inactiveSubs, setInactiveSubs] = useState();

    useEffect(() => {
        let gold = 0;
        let premium = 0;
        let standard = 0;
        let inactive = 0;
        users.forEach((user) => {
            user.subscriptions.forEach((subscription) => {
                if (subscription.tier === 'gold') {
                    gold++;
                }
                if (subscription.tier === 'premium') {
                    premium++;
                }
                if (subscription.tier === 'standard') {
                    standard++;
                }
                if (subscription.tier === 'inactive') {
                    inactive++;
                }
            });
        });
        setGoldSubs(gold);
        setPremiumSubs(premium);
        setStandardSubs(standard);
        setInactiveSubs(inactive);
        setTotalSubs(gold+premium+standard);
    }, [users]);

    return (
        <div className='Page-container'>
            <h1>Dashboard</h1>
            <div className="Dashboard-container">
                <div 
                    className='Dashboard-card'
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}
                >
                    <h3 style={{position: 'absolute', left: '32px', top: '8px'}}>Performance</h3>
                    <div className='Dashboard-card-content'>
                        <h1 style={{margin: '0'}}>{users && users.length}</h1>
                        <p style={{margin: '0'}}>users</p>
                    </div>
                    <div className='Dashboard-card-content'>
                        <h1 style={{margin: '0'}}>{totalSubs}</h1>
                        <p style={{margin: '0'}}>active subscriptions</p>
                    </div>
                    <div className='Dashboard-card-content'>
                        <h1 style={{margin: '0'}}>$500k</h1>
                        <p style={{margin: '0'}}>in revenue</p>
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex', gap: '32px', justifyContent: 'space-between'}}>
                    <div className='Dashboard-card'>
                        <Chip
                            style={{position: 'absolute', top: '16px', left: '16px'}}
                            className='Dashboard-chip'
                            color='warning'
                            variant="solid"
                        >
                            Gold
                        </Chip>
                        <div className='Dashboard-card-content'>
                            <h1 style={{margin: '0'}}>{goldSubs}</h1>
                            <p style={{margin: '0'}}>subscriptions</p>
                        </div>
                    </div>
                    <div className='Dashboard-card'>
                        <Chip
                            style={{position: 'absolute', top: '16px', left: '16px'}}
                            color='info'
                            variant="solid"
                        >
                            Premium
                        </Chip>
                        <div className='Dashboard-card-content'>
                            <h1 style={{margin: '0'}}>{premiumSubs}</h1>
                            <p style={{margin: '0'}}>subscriptions</p>
                        </div>
                    </div>
                    <div className='Dashboard-card'>
                        <Chip
                            style={{position: 'absolute', top: '16px', left: '16px'}}
                            color='primary'
                            variant="solid"
                        >
                            Standard
                        </Chip>
                        <div className='Dashboard-card-content'>
                            <h1 style={{margin: '0'}}>{standardSubs}</h1>
                            <p style={{margin: '0'}}>subscriptions</p>
                        </div>
                    </div>
                    <div className='Dashboard-card'>
                        <Chip
                            style={{position: 'absolute', top: '16px', left: '16px'}}
                            color='neutral'
                            variant="solid"
                        >
                            Inactive
                        </Chip>
                        <div className='Dashboard-card-content'>
                            <h1 style={{margin: '0'}}>{inactiveSubs}</h1>
                            <p style={{margin: '0'}}>subscriptions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;