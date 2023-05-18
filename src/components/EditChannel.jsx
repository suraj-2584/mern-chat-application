import React ,{useState} from 'react'
import {useChatContext} from 'stream-chat-react'

import {UserList} from './'
import { CloseCreateChannel } from '../assets'

const ChannelNameInput = ({channelName='',setChannelName})=>{
  const handleChange = (event) =>{
    event.preventDefault()
    setChannelName(event.target.value)
  }
  return (
    <div className='channel-name-input__wrapper'>
      <p>Name</p>
      <input value={channelName} onChange={handleChange}/>
      <p>Add Members</p>

    </div>
  )
}

const EditChannel = ({setIsEditing}) => {

  const {channel}= useChatContext()
  const [channelName,setChannelName]= useState(channel.data.name)
  const [selectedUsers,setSelectedUsers]= useState([])

  const updateChannel =async(event)=>{
    event.preventDefault();

    if(channelName!=channel.data.name && channelName!=channel.data.id){
      await channel.update({name:channelName},{text:`Channel Name changed to ${channelName}`})
    }
    if(selectedUsers.length > 0){
      await channel.addMembers(selectedUsers)
    }
    setChannelName('')
    setIsEditing(false)
    setSelectedUsers([])
  }
  return (
    <div className='edit-channel__container'>

      <div className='edit-channel__header'>
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      <UserList setSelectedUsers={setSelectedUsers}/>

      <div className='edit-channel__button-wrapper' onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  )
}

export default EditChannel
