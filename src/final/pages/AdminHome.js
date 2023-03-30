import { UserAuth } from '../../utils/Auth.js';

export default function AdminHome() {
  const { signOut } = UserAuth();

  const logOut = async (e) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <>
      <button onClick={logOut}>Sign Out</button>
    </>
  );
}
