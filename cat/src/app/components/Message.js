const Message = ({ notification }) => {
    return (
      <>
        <div id="notificationHeader">
          {notification.image && (
            <div id="imageContainer">
              <img src={notification.image} width={100} alt="Notification" />
            </div>
          )}
          <span>{notification.title}</span>
        </div>
        <div id="notificationBody">{notification.body}</div>
      </>
    );
  };
  
  export default Message;
  