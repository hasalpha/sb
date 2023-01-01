/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import ReactAvatar from 'react-avatar';

export const HEX_STRINGS = [
  '#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB', '#64B5F6',
  '#4FC3F7', '#4DD0E1', '#4DB6AC', '#81C784', '#AED581', '#FF8A65', '#D4E157', '#FFD54F',
  '#FFB74D', '#A1887F', '#90A4AE', '#281430', '#6A243E', '#D76C65', '#6E668F',
];

export interface Person {
    name: string;
    id?: string;
    email?:string
}

type PersonAvatarProps = {
  className?: string;
  person: Person;
  size: string;
  style?: React.CSSProperties;
  round?: string|boolean;
};

export const PersonAvatar: React.FC<PersonAvatarProps> = props => {
  const {
    person, size, className, style, round=true
  } = props;
  if (!person) {
    return null;
  }
  const {
    id, name
  } = person;
  if (!name) {
    return null;
  }
  const index = hashCode() % HEX_STRINGS.length;
  const color = HEX_STRINGS[index];
  const escapedTitle = name.replace(/[()]/g, '');
//   const uploadedPhoto = getPhoto(name)?.value?.url;
  return (
    <ReactAvatar
      className={className}
      name={escapedTitle}
      size={size}
      color={color}
      style={{
        ...style,
        minWidth: '42px',
      }}
      maxInitials={2}
    //   src={no_photo ? undefined : uploadedPhoto}
      round={round}
    />
  );
};

export function hashCode() {
	let h = 0;
	// eslint-disable-next-line no-plusplus
	// for (let i = 0; i < text.length; i++) {
	// 	// eslint-disable-next-line no-bitwise
	// 	h = (Math.imul(31, h) + text.charCodeAt(i)) | 0;
	// }
    h= Math.floor(Math.random() * 21);
	return h;
}
// function getPhoto(selectedContact: any) {
//   return selectedContact?.attributes?.find((val:any) => val?.name === 'photo' && val?.is_primary === true);
// }
