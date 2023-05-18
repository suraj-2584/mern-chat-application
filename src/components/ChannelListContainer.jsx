import React, {useState} from 'react'
import {ChannelList,useChatContext} from 'stream-chat-react'
import Cookies from 'universal-cookie'

import {ChannelSearch, TeamChannelList,TeamChannelPreview} from './'
import LogoutIcon from '../assets/logout.png'
import CodeIcon from '../assets/code.png'
const cookies= new Cookies()

const SideBar=({logout})=>(
  
    <div className='channel-list__sidebar'>

      <div className='channel-list__sidebar__icon1'>
        <div className='icon1__inner'>
          <img src={CodeIcon} alt="Code" width='30'></img>
        </div>
      </div>

      <div className='channel-list__sidebar__icon2'>
        <div className='icon1__inner' onClick={logout}>
            <img src={LogoutIcon} alt="Code" width='30'></img>
        </div>
      </div>

    </div>
)

const CompanyHeader=()=>(
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>Coders Arena</p>
  </div>
)
const customChannelTeamFilter = (channels)=>{
  return channels.filter((channel)=> channel.type=='team')
}

const customChannelMessagingFilter = (channels)=>{
  return channels.filter((channel)=>channel.type=='messaging')
}
const ChannelListContent = ({isCreating,setIsCreating,setCreateType,setIsEditing}) => {
  const {client} = useChatContext()
  const filters={
    members: {
      $in:[client.userID]
    }
  }
  const logout = ()=>{
    cookies.remove('token')
    cookies.remove('userId')
    cookies.remove('userName')
    cookies.remove('fullName')
    cookies.remove('avatarUrl')
    cookies.remove('hashedPassword')
    cookies.remove('phoneNumber')
    window.location.reload()
  }
  return (
    <>
      <SideBar logout={logout}/>
      <div className='channel-list__list__wrapper'>
        <CompanyHeader/>
        <ChannelSearch/>
        <ChannelList
          filters={filters} 
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps)=>(
            <TeamChannelList
              {...listProps}
              type='team'
              isCreating={isCreating} 
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
            />
          )}

          Preview={
            (previewProps)=>(
              <TeamChannelPreview
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
                {...previewProps}
                type='team'
              />
            )
          }
        
        
        />

        <ChannelList
          filters={filters} 
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps)=>(
            <TeamChannelList
              {...listProps}
              type='messaging'
              isCreating={isCreating} 
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
            />
          )}

          Preview={
            (previewProps)=>(
              <TeamChannelPreview
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
                {...previewProps}
                type='messaging'
              />
            )
          }
        
        
        />
      </div>
    </>
  )
}

const ChannelListContainer =({setCreateType,setIsCreating,setIsEditing}) =>{
 
  return <>
    <div className='channel-list__container'>
     <ChannelListContent
        setIsCreating={setIsCreating}
        setIsEditing={setIsEditing}
        setCreateType={setCreateType}
     />
    </div>

  </>
}

export default ChannelListContainer
