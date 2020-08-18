export const getProfile = () => {
  const uid = localStorage.getItem('rems_user_id');
  const profile = JSON.parse(localStorage.getItem('rems_user_profile'));
  return { uid, ...profile }
}
