import React, { useEffect, useState } from "react";

import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";
import { realtime } from "../shared/firebase";

import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

const NotiBadge = (props) => {
  const username = useSelector((state) => state.user.user?.username);
  const [is_read, setIsRead] = useState(true);

  const notiCheck = () => {
    history.push("/noti");
    const notiDB = realtime.ref(`noti/${username}`);
    notiDB.update({ read: true });

    props._onClick();
  };

  useEffect(() => {
    const notiDB = realtime.ref(`noti/${username}`);

    notiDB.on("value", (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val()) {
        setIsRead(snapshot.val().read);
      }
    });

    return () => notiDB.off();
  }, []);
  
  return (
    <>
      <Badge
        invisible={is_read}
        color="error"
        onClick={notiCheck}
        variant="dot"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MailIcon />
      </Badge>
    </>
  );
};

NotiBadge.defaultProps = {
  _onClick: () => {},
};

export default NotiBadge;
