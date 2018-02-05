//  @flow
import React from 'react';

type Props = {
  repoData: Object,
  isSelected: boolean,
};
const commonStyle = {
  // margin: 0,
  // padding: 3,
  listStyle: 'none',
  borderRadius: '5px',
  padding: '10px',
  margin: '5px 0px 5px 0px',
};
const unselectedStyle = {
  ...commonStyle,
  backgroundColor: 'transparent',
  color: 'black',
};
const selectedStyle = {
  ...commonStyle,
  backgroundColor: 'gainsboro',
  color: 'white',
};

export default function RepoList(props: Props) {
  // console.log('repolist props ', props);

  let {repoData, isSelected} = props;
  let style = isSelected ? selectedStyle : unselectedStyle;
  return <li style={style}>{repoData.name}</li>;
}
