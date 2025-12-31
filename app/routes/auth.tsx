import type { constants } from "buffer";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Auth" },
  { name: "Description", content: "Log into your Account." },
];

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next ?? "/");
    }
  }, [auth.isAuthenticated, navigate, next]);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center min-h-screen flex items-center justify-center p-6">
      {/* The Outer Glass Container */}
      <section className="gradient-border shadow-2xl transition-all duration-500 hover:scale-[1.01] max-w-2xl w-full">
        <div className="flex flex-col gap-10 bg-white/90 backdrop-blur-md rounded-2xl p-8 md:p-16 shadow-inner">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700 ">
              Welcome to Resumind
            </h1>
            <h2 className="max-w-md opacity-80">
              Unlock your career potential. Please login to access the platform.
            </h2>
          </div>

          {/* Auth Action Area */}
          <div className="flex flex-col items-center justify-center min-h-25">
            {isLoading ? (
              <button className="auth-button opacity-70 cursor-not-allowed flex items-center gap-3 justify-center">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </button>
            ) : (
              <div className="w-full flex justify-center animate-in fade-in zoom-in-95 duration-500">
                {auth.isAuthenticated ? (
                  <button
                    className="auth-button hover:shadow-[0_10px_40px_-10px_rgba(96,107,235,0.5)] transition-all"
                    onClick={auth.signOut}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="auth-button hover:shadow-[0_10px_40px_-10px_rgba(96,107,235,0.5)] transition-all"
                    onClick={auth.signIn}
                  >
                    Log in
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Subtle Footer/Detail */}
          <p className="text-center text-dark-200/50 text-sm font-medium tracking-wide">
            SECURE ENTERPRISE LOGIN
          </p>
        </div>
      </section>
    </main>
  );
};

export default auth;
