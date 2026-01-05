import { Link } from "react-router";
function SocialAuthButtons() {
  return (
    <div>
      <div class="mt-4">
        <Link to={"http://localhost:3000/api/auth/google"} class="block">
          <button class="w-full text-center py-2 my-3 border flex items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              class="w-5 h-5 mr-2"
              alt="Google Icon"
            />
            <span class="dark:text-gray-300">Login with Google</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SocialAuthButtons;
