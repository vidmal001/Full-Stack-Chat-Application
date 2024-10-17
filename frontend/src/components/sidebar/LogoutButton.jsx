import { BiLogOut } from "react-icons/bi";

const LogoutButton = () => {
  return (
    // mt-auto will push the button to the bottom
    <div className="mt-auto">
      <BiLogOut
        className="w-6 h-6 text-white cursor-pointer"
      />
    </div>
  );
};
export default LogoutButton;
