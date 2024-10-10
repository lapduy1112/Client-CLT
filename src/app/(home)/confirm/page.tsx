import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const ConfirmPage = () => {
  return (
    <div
      id="root"
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl text-center p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-32 h-32 bg-green-200 rounded-full">
            <VerifiedUserIcon
              className="text-green-600"
              style={{ fontSize: "80px" }}
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank you!</h1>
        <p className="text-gray-600 mb-8">
          We've sent your free report to your inbox so it's easy to access. You
          can find more information on our website and social pages.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Connect With Us
            </h2>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-blue-600 text-3xl">
                <FacebookIcon />
              </a>
              <a href="#" className="text-blue-500 text-3xl">
                <TwitterIcon />
              </a>
              <a href="#" className="text-red-600 text-3xl">
                <InstagramIcon />
              </a>
              <a href="#" className="text-blue-400 text-3xl">
                <LinkedInIcon />
              </a>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Visit Our Website
            </h2>
            <a
              href="/"
              className="inline-block bg-green-500 text-white text-lg font-semibold py-2 px-4 rounded-lg">
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
