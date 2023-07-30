import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/EditTwoTone';
import DeleteIcon from '@mui/icons-material/DeleteTwoTone';
import Chip from '@mui/joy/Chip';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import Card from '@mui/joy/Card';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import _ from 'lodash';
import {setUsers} from './../redux/Config/config.actions';

function UserInfo(props) {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.config.users);
    const [index, setIndex] = useState(0);

    const [user, setUser] = useState();
    const [userIndex, setUserIndex] = useState();
    const routeParams = useParams();

    const [editSubscriptionDialogOpen, setEditSubscriptionDialogOpen] = useState(false);
    const [subscriptionToEdit, setSubscriptionToEdit] = useState();
    const [subscriptionIndexToEdit, setSubscriptionIndexToEdit] = useState();

    const [editEnabled, setEditEnabled] = useState(false);

    useEffect(() => {
        setUser(users[routeParams.userId]);
        setUserIndex(routeParams.userId);
        console.log(users);
    }, [users]);

    const handleAddSubscription = () => {
        let tempSubscriptionToEdit = {
            tier: '',
            vehicle: {
                make: '',
                model: '',
                year: '',
                color: ''
            }
        };
        setSubscriptionToEdit(tempSubscriptionToEdit);
        setSubscriptionIndexToEdit(user.subscriptions.length);
        setEditSubscriptionDialogOpen(true);
    }
    
    const handleDeleteSubscription = (i) => {
        let tempUsers = _.cloneDeep(users);
        tempUsers[userIndex].subscriptions.splice(i, 1);
        dispatch(setUsers(tempUsers));
        handleCloseSubscriptionEditDialog();
    }

    const handleChangeSubscription = (e, key) => {
        let tempSubscriptionToEdit = _.cloneDeep(subscriptionToEdit);
        if (key === 'tier') {
            tempSubscriptionToEdit[key] = e;
        } else {
            tempSubscriptionToEdit.vehicle[key] = e.target.value;
        }
        console.log(tempSubscriptionToEdit);
        setSubscriptionToEdit(tempSubscriptionToEdit);
    }

    const handleChangeAccount = (e, key) => {
        let tempUser = _.cloneDeep(user);
        tempUser[key] = e.target.value;
        setUser(tempUser);
    }

    const handleChangePaymentInfo = (e, key) => {
        let tempUser = _.cloneDeep(user);
        tempUser.card[key] = e.target.value;
        setUser(tempUser);
    }

    const handleSaveAccountChanges = () => {
        let tempUsers = _.cloneDeep(users);
        tempUsers[userIndex] = _.cloneDeep(user);
        dispatch(setUsers(tempUsers));
        setEditEnabled(false);
    }

    const handleSaveSubscription = () => {
        let tempUsers = _.cloneDeep(users);
        tempUsers[userIndex].subscriptions[subscriptionIndexToEdit] = _.cloneDeep(subscriptionToEdit);
        dispatch(setUsers(tempUsers));
        handleCloseSubscriptionEditDialog();
    }

    const handleCloseSubscriptionEditDialog = () => {
        setEditSubscriptionDialogOpen(false);
        setSubscriptionToEdit(null);
        setSubscriptionIndexToEdit(null);
    }

    const handleOpenEditSubscriptionDialog = (subscription, index) => {
        setSubscriptionToEdit(subscription);
        setSubscriptionIndexToEdit(index);
        setEditSubscriptionDialogOpen(true);
    }

    const renderMembership = (subscription) => {
        let color = '';

        if (subscription.tier === 'gold') {
            color = 'warning';
        } else if (subscription.tier === 'premium') {
            color = 'info';
        } else if (subscription.tier === 'standard') {
            color = 'primary';
        } else {
            color = 'neutral';
        }

        return (
            <Chip
                color={color}
                variant="solid"
            >
                {subscription.tier}
            </Chip>
        );
    };

    const renderAccount =  () => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '440px', position: 'relative'}}>
                    {!editEnabled ? 
                        <div 
                            className='editIconButton'
                            style={{position: 'absolute', top: '10px', right: '0'}}
                            onClick={() => setEditEnabled(true)}
                        >
                            <EditIcon 
                                style={{
                                    borderRadius: '100px',
                                    width: '24px',
                                    height: '24px'
                                }}
                            />
                        </div> :
                        <div
                            className='addIconButton'
                            style={{marginLeft: '8px', fontWeight: '800', position: 'absolute', top: '10px', right: '0'}}
                            onClick={() => handleSaveAccountChanges()}
                        >
                            {editEnabled ? 'save' : 'edit'}
                        </div>
                    }
                    <h3>Basic Info</h3>
                    <Divider style={{marginBottom: '16px'}}/>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                disabled={!editEnabled}
                                value={user.name}
                                onChange={(e) => handleChangeAccount(e, 'name')}
                                autoFocus
                                required 
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                disabled={!editEnabled}
                                value={user.email}
                                onChange={(e) => handleChangeAccount(e, 'email')}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Phone</FormLabel>
                            <Input
                                disabled={!editEnabled}
                                value={user.phone}
                                onChange={(e) => handleChangeAccount(e, 'phone')}
                                required
                            />
                        </FormControl>
                    </Stack>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '440px'}}>
                    <h3>Payment Info</h3>
                    <Divider style={{marginBottom: '16px'}}/>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Card Number</FormLabel>
                            <Input
                                disabled={!editEnabled}
                                value={user.card.number}
                                onChange={(e) => handleChangePaymentInfo(e, 'number')}
                                autoFocus
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Expiration</FormLabel>
                            <Input
                                disabled={!editEnabled}
                                value={user.card.expiration}
                                onChange={(e) => handleChangePaymentInfo(e, 'expiration')}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>CVV</FormLabel>
                            <Input
                                disabled={!editEnabled}
                                value={user.card.cvv}
                                onChange={(e) => handleChangePaymentInfo(e, 'cvv')}
                                required
                            />
                        </FormControl>
                    </Stack>
                </div>
            </div>
        )
    };

    const renderSubscriptions =  () => {
        return (
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px', boxSizing: 'border-box'}}>
                {user.subscriptions.map((subscription, i) => {
                    return(
                        <Card sx={{color: '#636363', width: '600px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                                    <h3 style={{ fontWeight: 'bold', marginTop: '4px'}}>{`${subscription.vehicle.year} ${subscription.vehicle.make} ${subscription.vehicle.model} (${subscription.vehicle.color})`}</h3>
                                    {renderMembership(subscription)}
                                </div>
                                <div style={{display: 'flex', gap: '8px'}}>
                                    <div
                                        className='deleteIconButton'
                                        onClick={() => handleDeleteSubscription(i)}
                                    >
                                        <DeleteIcon
                                            sx={{color: 'white'}}        
                                            style={{
                                                borderRadius: '100px',
                                                width: '24px',
                                                height: '24px'
                                            }}/>
                                    </div>
                                    <div 
                                        className='editIconButton'
                                        onClick={() => handleOpenEditSubscriptionDialog(subscription, i)}
                                    >
                                        <EditIcon 
                                            style={{
                                                borderRadius: '100px',
                                                width: '24px',
                                                height: '24px'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
                <div
                    className='addIconButton'
                    style={{marginLeft: '8px', fontWeight: '800', width: '200px' }}
                    onClick={() => handleAddSubscription()}
                >
                    Add Subscription
                </div>
            </div>
        )
    };

    const renderPurchaseHistory =  () => {
        return (
            <table style={{width: '100%'}}>
                <thead>
                    <tr style={{backgroundColor: '#D9D9D9', outline: '4px solid #D9D9D9'}}>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {user.purchaseHistory && user.purchaseHistory.map((purchase, i) => {
                        return (
                            <tr>
                                <td>{purchase.date}</td>
                                <td>{purchase.purchase}</td>
                                <td>{`$${purchase.total.toFixed(2)}`}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    };

    return (
        <div className='Page-container'>
            {user &&
                <div style={{width: '100%'}}>
                    <h1>{`User: ${user.name}`}</h1>
                    <Tabs
                        aria-label="Soft tabs"
                        value={index}
                        onChange={(event, value) => setIndex(value)}
                        sx={{ borderRadius: 'lg', width: '400px' }}
                    >
                        <TabList variant="soft">
                        <Tab
                            variant={index === 0 ? 'solid' : 'plain'}
                            color={index === 0 ? 'primary' : 'neutral'}
                        >
                            <p style={{margin: '0', fontWeight: 'bold', color: (index === 0 ? '#FFFFFF' : '#636363')}}>Account</p>
                        </Tab>
                        <Tab
                            variant={index === 1 ? 'solid' : 'plain'}
                            color={index === 1 ? 'primary' : 'neutral'}
                        >
                            <p style={{margin: '0', fontWeight: 'bold', color: (index === 1 ? '#FFFFFF' : '#636363')}}>Subscriptions</p>
                        </Tab>
                        <Tab
                            variant={index === 2 ? 'solid' : 'plain'}
                            color={index === 2 ? 'primary' : 'neutral'}
                        >
                            <p style={{margin: '0', fontWeight: 'bold', color: (index === 2 ? '#FFFFFF' : '#636363')}}>Purchase History</p>
                        </Tab>
                        </TabList>
                    </Tabs>
                    {index === 0 && renderAccount()}
                    {index === 1 && renderSubscriptions()}
                    {index === 2 && renderPurchaseHistory()}
                </div>
            }
            {editSubscriptionDialogOpen &&
                <Modal open={editSubscriptionDialogOpen} onClose={() => setEditSubscriptionDialogOpen(false)}>
                    <ModalDialog
                        aria-labelledby="basic-modal-dialog-title"
                        aria-describedby="basic-modal-dialog-description"
                        sx={{ width: 600, padding: '32px', boxSizing: 'border-box' }}
                    >
                        <h1>{subscriptionIndexToEdit === user.subscriptions.length ? 'Add Subscription' : 'Edit Subscription'}</h1>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Make</FormLabel>
                                <Input
                                    value={subscriptionToEdit.vehicle.make}
                                    onChange={(e) => handleChangeSubscription(e, 'make')}
                                    autoFocus
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Model</FormLabel>
                                <Input
                                    value={subscriptionToEdit.vehicle.model}
                                    onChange={(e) => handleChangeSubscription(e, 'model')}
                                    autoFocus
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Year</FormLabel>
                                <Input
                                    type='int'
                                    value={subscriptionToEdit.vehicle.year}
                                    onChange={(e) => handleChangeSubscription(e, 'year')}
                                    autoFocus
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Color</FormLabel>
                                <Input
                                    value={subscriptionToEdit.vehicle.color}
                                    onChange={(e) => handleChangeSubscription(e, 'color')}
                                    autoFocus
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Tier</FormLabel>
                                <Select
                                    value={subscriptionToEdit.tier}
                                    onChange={(e, value) => handleChangeSubscription(value, 'tier')}
                                >
                                    <Option value="standard">standard</Option>
                                    <Option value="premium">premium</Option>
                                    <Option value="gold">gold</Option>
                                    <Option value="inactive">inactive</Option>
                                </Select>
                            </FormControl>
                        </Stack>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '24px'}}>
                            <div
                                className='cancelIconButton'
                                style={{marginLeft: '8px', fontWeight: '800' }}
                                onClick={() => handleCloseSubscriptionEditDialog()}
                            >
                                cancel
                            </div>
                            <div
                                className='addIconButton'
                                style={{marginLeft: '8px', fontWeight: '800' }}
                                onClick={() => handleSaveSubscription()}
                            >
                                Save
                            </div>
                        </div>
                        
                    </ModalDialog>
                </Modal>
            }
        </div>
    );
}

export default UserInfo;