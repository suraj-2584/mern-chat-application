import React ,{useEffect,useState} from 'react'
import {Avatar,useChat,useChatContext} from 'stream-chat-react'

import { InviteIcon } from '../assets'

const ListContainer = ({children}) =>{
    return (
        <div className='user-list__container'>
            <div className='user-list__header'>
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}
const UserItem = ({user,setSelectedUsers}) =>{
    const [selected,setSelected]  = useState(false)
    const handleClick = ()=>{
        if(!selected){
            setSelectedUsers((prevUsers)=>[...prevUsers,user.id])
        }
        else{
            setSelectedUsers((prevUsers)=> prevUsers.filter((prevUser)=>prevUser!=user.userID))
        }
        setSelected((prevSelected)=> !prevSelected)
    }
    return (
        <div className='user-item__wrapper' onClick={handleClick}>
            <div className='user-item__name-wrapper'>
                <Avatar image={user.image} name={user.fullName || user.id} size={32}/>
                <p className='user-item__name'>{user.fullName || user.id}</p>
            </div>
            {selected?<InviteIcon/>:<div className='user-item__invite-empty'></div>}
        </div>
    )
}
const UserList = ({setSelectedUsers}) => {

  const {client} = useChatContext()
  const [loading,setLoading] = useState(false)
  const [users,setUsers ] = useState([])
  const [isListEmpty,setIsListEmpty] = useState(false)
  const [error,setIsError] =useState(false)
  useEffect(() => {
    const getUsers= async ()=>{
        if(loading) return ;
        setLoading(true)

        try{
            const response = await client.queryUsers(
                {id:{$ne: client.userID}},
                {id:1},
                {limit:10}
            )
            console.log(response.users);
            if(response.users.length){
                setUsers(response.users)
            }
            else{
                setIsListEmpty(true)
            }
        }
        catch(error){
            setIsError(true)
        }
        setLoading(false)
    }

    if(client) getUsers()


  },[])

  if(error){
    return (
        <ListContainer>
            <div className='user-list__message'>
                Error retreiving users... Please refresh and try again
            </div>
        </ListContainer>
    )
  }

  if(isListEmpty){
    return (
        <ListContainer>
            <div className='user-list__message'>
                No users found.
            </div>
        </ListContainer>
    )
  }

  return (
    <div>
      <ListContainer>
        {loading?<div className='user-list__message'>
            Loading users...
        </div>:(
            users?.map((user,i)=>(
                <UserItem index={i} Key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
            ))
        )}
      </ListContainer>
    </div>
  )
}

export default UserList
