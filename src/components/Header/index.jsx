import { useDispatch, useSelector } from "react-redux";
import { IMAGES } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { URLS } from "../../constants/urls";
import BlueButton from "../../shared/Buttons/BlueButton";
import { logout } from "../../redux/slices/users.slice";
import NavigationLinks from "../NavigationLinks";

const Header = () => {
  const isLoggedin = useSelector((state) => state.users.isLoggedin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(URLS.LOGIN);
  };

  return (
    <>
      <header className="shadow-lg">
        <div className="container mx-auto">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <img src={IMAGES.logo} alt="" className="h-[40px] w-[40px]" />
              <h1 className="text-2xl font-bold">OCTOM</h1>
            </div>

            <NavigationLinks />

            <div className="flex items-center gap-3">
              {isLoggedin ? (
                <>
                  <Link onClick={handleLogout}>
                    <BlueButton title={"Log Out"} />
                  </Link>
                </>
              ) : (
                <>
                  <Link to={URLS.LOGIN}>
                    <BlueButton title={"Log In"} />
                  </Link>

                  <Link to={URLS.REGISTER}>
                    <BlueButton title={"Register"} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
