import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/DeleteTwoTone';
import AddIcon from '@mui/icons-material/AddCircleTwoTone';
import AccountIcon from '@mui/icons-material/AccountBoxRounded';
import Chip from '@mui/joy/Chip';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import _ from 'lodash';
import {setUsers} from './../redux/Config/config.actions';

function Users(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.config.users);

    const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState();
    const [userToDeleteIndex, setUserToDeleteIndex] = useState();

    const [searchString, setSearchString] = useState();

    useEffect(() => {
        console.log(searchString);
    }, [searchString]);

    const handleViewUser = (user, index) => {
        navigate(`/users/${index}`);
    }

    const handleOpenDeleteUserDialog = (user, index) => {
        setUserToDelete(user);
        setUserToDeleteIndex(index);
        setDeleteUserDialogOpen(true);
    }

    const handleCloseDeleteUserDialog = (user, index) => {
        setUserToDelete(null);
        setUserToDeleteIndex(null);
        setDeleteUserDialogOpen(false);
    }

    const deleteUser = () => {
        let tempUsers = _.cloneDeep(users);
        tempUsers.splice(userToDeleteIndex, 1);
        dispatch(setUsers(tempUsers));
        handleCloseDeleteUserDialog();
    }

    const renderMembership = (user) => {
        let topSubscription = 'inactive';
        let color = '';
        let subscriptions = [];
        if (user.subscriptions) {
            user.subscriptions.forEach((subscription) => {
                subscriptions.push(subscription.tier);
            });
        }
        if (subscriptions.includes('gold')) {
            topSubscription = 'gold';
            color = 'warning';
        } else if (subscriptions.includes('premium')) {
            topSubscription = 'premium';
            color = 'info';
        } else if (subscriptions.includes('standard')) {
            topSubscription = 'standard';
            color = 'primary';
        } else {
            topSubscription = 'inactive';
            color = 'neutral';
        }

        if (subscriptions.length === 1) {
            return (
                <Chip
                    sx={{zIndex: 0}}
                    color={color}
                    variant="solid"
                >
                    {topSubscription}
                </Chip>
            );
        } else {
            return (
                <div style={{display: 'flex', gap: '4px'}}>
                    <Chip
                        color={color}
                        variant="solid"
                    >
                        {topSubscription}
                    </Chip>
                    <Chip
                        color='neutral'
                        variant="solid"
                    >
                        {`+${subscriptions.length-1}`}
                    </Chip>
                </div>
            )
        }
    }

    return (
        <div className='Page-container'>
            <h1>Users</h1>
            <div className='Search-bar'>
                <Input
                    sx={{width: '100%'}}
                    placeholder="Search for a user"
                    type="search"
                    freeSolo
                    disableClearable
                    options={users.map((option) => option.name)}
                    onChange={(event, value) => {setSearchString(event.target.value)}}
                />
            </div>
            <table style={{width: '100%'}}>
                <thead>
                    <tr style={{backgroundColor: '#D9D9D9', outline: '4px solid #D9D9D9', zIndex: '100 !important'}}>
                        <th>Name</th>
                        <th>Membership</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th style={{display: 'flex', justifyContent: 'end'}}>
                            <div className='addIconButton'>
                                Add
                                <AddIcon
                                    sx={{color: 'white'}}        
                                    style={{
                                        borderRadius: '100px',
                                        width: '24px',
                                        height: '24px'
                                }}/>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => {
                        let comparatorString = user.name + user.email + user.phone;
                        if (comparatorString.toLowerCase().includes(searchString ? searchString.toLowerCase() : '')) {                        
                            return (
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{renderMembership(user)}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <div style={{display: 'flex', justifyContent: 'end', gap: '8px'}}>
                                            <div 
                                                className='editIconButton'
                                                onClick={() => handleViewUser(user, i)}
                                            >
                                                <AccountIcon 
                                                    style={{
                                                        borderRadius: '100px',
                                                        width: '24px',
                                                        height: '24px'
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className='deleteIconButton'
                                                onClick={() => handleOpenDeleteUserDialog(user, i)}
                                            >
                                                <DeleteIcon
                                                    sx={{color: 'white'}}        
                                                    style={{
                                                        borderRadius: '100px',
                                                        width: '24px',
                                                        height: '24px'
                                                    }}/>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        } else {
                            return null;
                        }
                    })}
                </tbody>
            </table>
            {deleteUserDialogOpen &&
                <Modal open={deleteUserDialogOpen} onClose={() => handleCloseDeleteUserDialog()}>
                    <ModalDialog
                        aria-labelledby="basic-modal-dialog-title"
                        aria-describedby="basic-modal-dialog-description"
                        sx={{ width: 600, padding: '32px', boxSizing: 'border-box' }}
                    >
                        <h1>Delete User</h1>
                        <p>Are you sure you want to delete <strong>{userToDelete.name}</strong>?</p>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '24px'}}>
                            <div
                                className='cancelIconButton'
                                style={{marginLeft: '8px', fontWeight: '800' }}
                                onClick={() => handleCloseDeleteUserDialog()}
                            >
                                cancel
                            </div>
                            <div
                                className='addIconButton'
                                style={{marginLeft: '8px', fontWeight: '800' }}
                                onClick={() => deleteUser()}
                            >
                                Delete
                            </div>
                        </div>
                        
                    </ModalDialog>
                </Modal>
            }
        </div>
    );
}

export default Users;