//  @flow
import React from 'react';

type Props = {
  repoData: Object,
};

export default function UserDetails(props: Props) {
  // console.log('repodetails props', props);
  if (props.repoData) {
    let {repoData} = props;
    let {id, email, username} = repoData;
    return (
      <div>
        ID:{id}
        <br />
        User Name:{username}
        <br />
        Email: {email}
      </div>
    );
  } else {
    return <div>Detail Section </div>;
  }
}
