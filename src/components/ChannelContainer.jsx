import React from 'react'
import {Channel, useChatContext,MessageSimple} from 'stream-chat-react'

import {ChannelInner, CreateChannel, EditChannel} from './'
  const ChannelContainer = ({isCreating,setIsCreating,isEditing,setIsEditing,createType}) => {
  
  const {activeChannel} = useChatContext()

  if(isCreating){
    return (
      <div className='channel__container'>
        <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
      </div>
    )
  }

  if(isEditing){
    return (
      <div className='channel__container'>
        <EditChannel setIsEditing={setIsEditing}/>
      </div>
    )
  }

  const EmptyState=()=>{
    return (
      <div className='channel-empty__container'>

      <p className='channel-empty__first'>This is the beginning of your chat history.</p>
      <p className='channel-empty__second'>Send messages, links, emojis, gifs, attachments and more!</p>

    </div>
    )
  }

  return (
    <div className='channel__container'>
      <Channel 
      EmptyStateIndicator={EmptyState}
      Message = {(messageProps,index)=> <MessageSimple key={index} {...messageProps} />}
      
      >
        <ChannelInner setIsEditing={setIsEditing} />

      </Channel>
      
    </div>
  )
}

export default ChannelContainer
