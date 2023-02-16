import { ConnectButton } from "@rainbow-me/rainbowkit";
import { router, useRouter } from "next/router";
import { useState } from "react";

export default function Navbar() {
  const [searchWallet, setSearchWallet] = useState("");
  return (
    <nav className="bg-slate-50 sticky top-0 w-full p-2">
      <div className="px-2 flex justify-between items-center ">
        <a
          onClick={() => router.push("/")}
          className="font-extrabold cursor-pointer"
        >
          NFT Marketplace
        </a>

        <div className="relative mx-auto text-gray-600">
          <form
            onSubmit={(e) => {
              return (
                e.preventDefault(),
                router.push({ pathname: "/search", query: { searchWallet } })
              );
            }}
          >
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
              type="search"
              placeholder="Search Wallet"
              value={searchWallet}
              onChange={(e) => {
                setSearchWallet(e.target.value);
              }}
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </form>
        </div>

        <div className="flex items-center gap-6">
          <div>Marketplace</div>
          <div>Create NFT</div>
          <div>Profile</div>
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
